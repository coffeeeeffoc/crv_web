import Operation from '../Operation';
import classNames from 'classnames';
import styles from './index.less';

interface OperationBarProps {
  id: string;
  props?: {
    style?: React.CSSProperties;
    [key: string]: any;
  };
  operations: any[];
  renderOperations?: (operations: any[], content: React.ReactNode) => React.ReactNode;
}
export default function OperationBar ({
  id,
  props = {},
  operations = [],
  renderOperations = (operations, content) => content,
}: OperationBarProps) {
  return (
    <div
      className={classNames(styles.operationBar, props.className)}
      style={props.style}
    >
      {
        renderOperations(operations, operations.map((item, index) => <Operation key={item.id} {...item} index={index} />))
      }
    </div>
  );
};
