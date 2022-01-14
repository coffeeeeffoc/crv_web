import styles from './index.less';
import LayoutConfigSetting from '@@/LayoutConfigSetting';
import ConfigPageButtons from '@@/ConfigPageButtons';
import {
  LeftPanel,
  RightPanel,
} from '@@/Panels';
import Canvas from '@@/Canvas';
import { useAppSelector } from '@/redux/hooks';

export default () => {
  const { leftPanel, rightPanel } = useAppSelector(state => state.layoutConfigSetting.panel);
  return (
    <div className={styles.layout} >
      <div className={styles.controlZone} >
        <LayoutConfigSetting/>
        <ConfigPageButtons/>
      </div>
      <div
        className='container'
        style={{
          display: 'flex',
        }}
      >
        {leftPanel.layout.open && <LeftPanel />}
        <section
          style={{
            overflow: 'auto',
            padding: 1,
            flex: 'auto',
            display: 'flex',
          }}
        >
          <Canvas />
        </section>
        {rightPanel.layout.open && <RightPanel />}
      </div>
    </div>
  );
};
