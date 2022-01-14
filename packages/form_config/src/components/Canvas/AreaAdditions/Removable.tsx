import styles from './index.less';
import { CloseOutlined } from '@ant-design/icons';
import { DisplayTypeContext } from '@/context';
import { EnumDisplayType } from '@/types';

export default function Removable ({
  children,
  onRemove,
}: any) {
  return (
    <DisplayTypeContext.Consumer>
      {
        displayType => displayType === EnumDisplayType.config
          ? (
              <div className={styles.removable} >
                {children}
                <CloseOutlined className={styles.close} onClick={onRemove} />
              </div>
            )
          : children
      }
    </DisplayTypeContext.Consumer>
  );
};
