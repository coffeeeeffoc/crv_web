import { Collapse } from 'antd';
import styles from './BasicPanel.less';
import classNames from 'classnames';

const { Panel } = Collapse;

interface BasicPanelGroupType {
  id: string;
  title: string | React.ReactNode;
  items: React.ReactNode;
};

interface BasicPanelProps {
  groups: BasicPanelGroupType[];
  className?: string;
};

export default ({
  groups,
  className,
}: BasicPanelProps) => {
  return (
    <Collapse
      defaultActiveKey={groups.map(({ id }) => id)}
      className={classNames(styles.collapse, className)}
    >
      {
        groups.map(({ id, title, items }) => (
          <Panel header={title} key={id} >{items}</Panel>
        ))
      }
    </Collapse>
  );
};
