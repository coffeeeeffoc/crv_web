import { forwardRef } from 'react';
import { hasOwn, getDescendantProp, setDescendantProp } from '@crv/utils/src/browser/utils';

// node绑定到多个ref（ref可能为function或者{current}对象）
export const composeRef = (node: any, ...refs: any[]) => {
  refs.forEach(ref => {
    if (ref) {
      if (typeof ref === 'object' && hasOwn(ref, 'current')) {
        ref.current = node;
      } else if (typeof ref === 'function') {
        ref(node);
      }
    }
  });
};

// 创建一个【可类似管道依次调用，且能传递ref】的组件
export const createPipeComponent = (
  // parseProps为undefined时，直接传递props
  // eslint-disable-next-line @typescript-eslint/default-param-last
  parseProps: Function = (props: any, ref: any) => props,
  defaultComponent: any,
  content: (node: React.ReactElement, props?: any) => React.ReactElement = node => node,
) =>
  forwardRef(({ PipeComponent = defaultComponent, ...props }: any, ref) => {
    return content(
      <PipeComponent
        // 默认的ref函数；parseProps的结果可以指定新的ref。
        ref={(node: any) => composeRef(node, ref)}
        {...parseProps(props, ref)}
      />,
      props,
    );
  });

// 多个可任意组装组件依次嵌套调用，且依次传递ref
export const composeWrapper = (...args: any[]) => {
  return args.reduce((Inner, Wrapper) => {
    return forwardRef((props, ref) => {
      return (
        <Wrapper {...props} ref={ref} PipeComponent={Inner} />
      );
    });
  });
};

// 根据obj2中存在的值，依次收集到obj1中
export const setCollectedComponents = (obj1: any, obj2: any, path: string) => {
  const res1 = getDescendantProp(obj1, path, { finalResult: true });
  const res2 = getDescendantProp(obj2, path, { finalResult: true });
  if (res2) {
    if (Array.isArray(res1)) {
      res1.push(res2);
    } else if (typeof res1 === 'string') {
      setDescendantProp(obj1, path, [res1, res2]);
    }
  }
};

// 基本的components的路径
const BASIC_COMPONENTS_PATH = [
  'table',
  'body.wrapper',
  'body.row',
  'body.cell',
  'header.wrapper',
  'header.row',
  'header.cell',
];

// 收集每个配置激活的功能对应的components
export const collectComponents = (collectedComponents: any, components: any) => {
  if (components) {
    BASIC_COMPONENTS_PATH.forEach(path => setCollectedComponents(collectedComponents, components, path));
  }
};

// 把收集的组件中的数组部分，分别用composeWrapper管道合并之
export const generateComponents = (collectedComponents: any) => {
  BASIC_COMPONENTS_PATH.forEach(path => {
    const res = getDescendantProp(collectedComponents, path, { finalResult: true });
    if (Array.isArray(res)) {
      setDescendantProp(collectedComponents, path, composeWrapper(...res));
    };
  });
  return collectedComponents;
};

type ConfigHook = [boolean | undefined, Function];

// antd Table组件默认的components
export const antdTableDefaultComponents = {
  table: 'table',
  body: {
    wrapper: 'tbody',
    row: 'tr',
    cell: 'td',
  },
  header: {
    wrapper: 'thead',
    row: 'tr',
    cell: 'th',
  },
};

/**
 * @description根据配置项以及对应的hook，依次进行管道合并操作。得到最终结果
 * @param props 原始属性
 * @param configHooks 二维数组，每个一维数组元素的：
 *  第一个元素，表示是否激活此对应的hook结果
 *  第二个元素，表示执行对应的hook，得到的结果根据是否激活来决定是否抛弃或合并
 * @returns newProps 最终属性
 */
export const composeConfigHooks = (defaultComponents: any, props: any, ...configHooks: ConfigHook[]) => {
  const { components, ...restProps } = props;
  let newProps: any = restProps;
  const originalComponents = defaultComponents;
  const collectedComponents: any = originalComponents;
  for (let i = 0; i < configHooks.length; i++) {
    const [enable, useHook] = configHooks[i];
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { components, ...hookResult } = useHook(newProps);
    if (enable) {
      newProps = { ...newProps, ...hookResult };
      if (components) {
        collectComponents(collectedComponents, components);
      }
    }
  }
  return {
    ...newProps,
    ...(collectedComponents && {
      components: generateComponents(collectedComponents),
    }),
  };
};
