import { Tree, Collapse } from 'antd';
import type { TreeNodeNormal } from 'antd/lib/tree/Tree';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import type { AreaState } from '@/types';
import styles from './index.less';
import classNames from 'classnames';
import { getAreaById } from '@/utils/area';
import { canvasActions } from '@/redux/actions';
import Props from './Props';

const { Panel } = Collapse;

const areas2TreeData = (area: AreaState, areaAdditions: any): TreeNodeNormal => {
  const { field } = areaAdditions[area.id] ?? {};
  return {
    key: area.id,
    title: <span title={area.id} >{field?.field ?? area.id}</span>,
    children: area.children?.map(item => areas2TreeData(item, areaAdditions)),
  };
};

export default () => {
  const areas = useAppSelector(state => state.canvas.areas);
  const areaAdditions = useAppSelector(state => state.canvas.areaAdditions);
  const dispatch = useAppDispatch();
  const areasTreeData = [areas2TreeData(areas, areaAdditions)];
  return (
    <Collapse
      defaultActiveKey={'areaTree gridProps'.split(' ')}
      className={classNames('constantHeight', styles.gridProps)}
    >
      <Panel
        header='区域层级结构'
        key='areaTree'
        className={classNames('constantHeight', styles.tree)}
      >
        <Tree
          treeData={areasTreeData}
          onSelect={(selectedKeys, { selected, selectedNodes, node, event }) => {
            dispatch(canvasActions.setMultiState({
              currentAreaId: (selected ? getAreaById(areas, selectedKeys[0]) : areas).id,
            }));
          }}
        />
      </Panel>
      <Panel
        header='grid布局属性'
        key='gridProps'
        className={styles.props}
      >
        <Props />
      </Panel>
    </Collapse>
    // <div className={styles.gridProps} >
    //   <div className={styles.tree} >
    //     <Tree
    //       treeData={areasTreeData}
    //     />
    //   </div>
    //   <div className={styles.props} >
    //     grid props.
    //   </div>
    // </div>
  );
};
