import { Tree } from 'antd'
import { useEffect, useRef, useCallback, useState } from 'react';

const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        disabled: true,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            disableCheckbox: true,
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          }
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          {
            title: (
              <span
                style={{
                  color: '#1890ff',
                }}
              >
                sss
              </span>
            ),
            key: '0-0-1-0',
          }
        ],
      }
    ],
  }
];

const Demo = () => {
  const onSelect = (selectedKeys: any, info: any) => {
    console.log('selected', selectedKeys, info);
  };

  const onCheck = (checkedKeys: any, info: any) => {
    console.log('onCheck', checkedKeys, info);
  };
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(['0-0-0', '0-0-1', '0-0'])

  const treeRef: any = useRef(null);
  const callback = useCallback((e) => {
    let target = e.target;
    while (target && !target?.classList?.value?.split(' ')?.includes('ant-tree-switcher')) {
      target = target.parentNode;
    }
    if (!target) {
      return;
    }
    const dom = target;
    const aa = dom.nextElementSibling?.nextElementSibling?.firstElementChild?.firstElementChild;
    const { key, hasChildren } = aa.dataset;
    console.log('123', e.target, aa, key, hasChildren);
    setExpandedKeys(arr =>
      arr.includes(key) ? arr.filter(item => item !== key) : arr.concat([key])
    );
    e.preventDefault();
    e.stopPropagation();
  }, []);
  useEffect(() => {
    const switchers = treeRef?.current?.querySelectorAll('.ant-tree-switcher');
    console.log('qqq', switchers);
    if (switchers) {
      switchers.forEach((dom: any) => {
        dom.onclick = (e: any) => e.stopPropagation();
        dom.ondblclick = callback;
      });
      return () => {
        switchers.forEach((dom: any) => {
          dom.onclick = null;
          dom.ondblclick = null;
        });
      };
    }
  }, [])
  return (
    <div ref={treeRef} onDoubleClick={callback}>
      <Tree
        expandedKeys={expandedKeys}
        checkable
        // defaultExpandedKeys={['0-0-0', '0-0-1']}
        defaultSelectedKeys={['0-0-0', '0-0-1']}
        defaultCheckedKeys={['0-0-0', '0-0-1']}
        onSelect={onSelect}
        onCheck={onCheck}
        treeData={treeData}
        titleRender={(nodeData: any) => {
          return <div data-key={nodeData.key}>{nodeData.title}</div>
        }}
      />
    </div>
  );
};

export default Demo
