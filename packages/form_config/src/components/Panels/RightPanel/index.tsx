import { Tabs } from 'antd';
import { lazy } from 'react';
import { TogglePanel } from '@@/Panel';
import ReactSuspense from '@@/ReactSuspense';

const PropertyDetail = lazy(() => import('@@/Panels/PropertyDetail'));
const CssCode = lazy(() => import('@@/Panels/CssCode'));
const GridLayoutJson = lazy(() => import('@@/Panels/GridLayoutJson'));
const { TabPane } = Tabs;

export default () => {
  return (
    <TogglePanel
      align='right'
    >
      <Tabs>
        <TabPane
          key='propertyDetail'
          tab='属性详情'
        >
          <ReactSuspense>
            <PropertyDetail />
          </ReactSuspense>
        </TabPane>
        <TabPane
          key='cssCode'
          tab='css代码'
        >
          <ReactSuspense>
            <CssCode />
          </ReactSuspense>
        </TabPane>
        <TabPane
          key='gridJson'
          tab='grid json'
        >
          <ReactSuspense>
            <GridLayoutJson />
          </ReactSuspense>
        </TabPane>
      </Tabs>
    </TogglePanel>
  );
};
