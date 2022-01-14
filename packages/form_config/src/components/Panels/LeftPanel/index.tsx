import { Tabs } from 'antd';
import { TogglePanel } from '@@/Panel';
import { lazy } from 'react';
import ReactSuspense from '@@/ReactSuspense';

const DragControl = lazy(() => import('@@/Panels/DragControl'));
const GridProps = lazy(() => import('@@/Panels/GridProps'));
const { TabPane } = Tabs;

export default () => {
  return (
    <TogglePanel
      align='left'
    >
      <Tabs>
        <TabPane
          key='operation'
          tab='拖拽控件'
        >
          <ReactSuspense>
            <DragControl/>
          </ReactSuspense>
        </TabPane>
        <TabPane
          key='gridProps'
          tab='grid属性'
          >
            <ReactSuspense>
              <GridProps/>
            </ReactSuspense>
        </TabPane>
      </Tabs>
    </TogglePanel>
  );
};
