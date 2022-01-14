// import { Drag } from '@@/DragDrop';
import { useContext } from 'react';
import {
  // Button,
  Collapse,
} from 'antd';
import styles from './index.less';
// import { allWidgets } from '@@/Elements/Widgets';
import ToggleFields from './ToggleFields';
import ToggleOperations from './ToggleOperations';
// import { languageTransform } from '@utils/browser/languages';
import { ModelContext } from '@/context';
import classNames from 'classnames';
import { useAppSelector } from '@/redux/hooks';

const { Panel } = Collapse;

// 所有的拖拽类型
export type dragType = 'operationBar' | 'operation' | 'field' | 'widget' | 'areaExchange';

// 检查拖拽时已有类型和当前类型是否冲突，不冲突时才可以拖拽
export const checkNoConflict = (type: dragType, existTypes: dragType[] = []): boolean => {
  const noConflict = {
    operationBar: () => existTypes.length === 0,
    operation: () => existTypes.length === 0 || (existTypes.length === 1 && existTypes[0] === 'operationBar'),
    field: () => existTypes.every(item => ['widget', 'field'].includes(item)),
    widget: () => existTypes.every(item => ['widget', 'field'].includes(item)),
    areaExchange: () => true,
  };
  return noConflict[type]?.() ?? true;
};
interface ModelType {
  operations: any[];
  fields: any[];
};

export default () => {
  const { operations = [], fields = [] }: ModelType = useContext(ModelContext).model ?? {};
  const areaAdditions = useAppSelector(state => state.canvas.areaAdditions);
  return (
    <Collapse
      defaultActiveKey={'layout fields operation widget'.split(' ')}
      className={styles.collapse}
    >
      {/* <Panel header='布局框架' key='layout' >
        <Drag
          type='grid'
          preview='/assets/dragPreview/grid.svg'
          title='grid'
        >
          <Button>{languageTransform({
            zh: '网格布局',
            en: 'grid',
          })}</Button>
        </Drag>
        <Drag
          type='flex'
          title='flex'
        >
          <Button>{languageTransform({
            zh: '弹性布局',
            en: 'flex',
          })}</Button>
        </Drag>
      </Panel> */}
      {/* <Panel header='操作行' key='layout' >
        <Drag
          type='operationBar'
          preview='/assets/dragPreview/operationBar.svg'
          title='操作行'
        >
          <Button>Operation Bar</Button>
        </Drag>
      </Panel> */}
      <Panel header='操作' key='operation' className={classNames('constantHeight', styles.searchable)} >
        <ToggleOperations operations={operations} areaAdditions={areaAdditions} />
      </Panel>
      <Panel header='字段' key='fields' className={classNames('constantHeight', styles.searchable)} >
        <ToggleFields fields={fields} areaAdditions={areaAdditions} />
      </Panel>
      <Panel header='控件' key='widget' >
        <div>功能暂未开放</div>
        {/* {allWidgets.map(({ id, name }) => (
          <Drag
            key={id}
            type='widget'
            data={{
              id,
              name,
            }}
          >
            <Button style={{ margin: '5px 10px' }} >{name}</Button>
          </Drag>
        ))} */}
      </Panel>
    </Collapse>
  );
};
