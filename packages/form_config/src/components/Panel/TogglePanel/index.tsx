import { useState } from 'react';
import styles from './index.less';
import resizableStyles from '@crv/rc/src/CustomTable/basic/ResizableHeaderCell/ResizableHeaderCell.less';
import classNames from 'classnames';
import { Resizable } from 'react-resizable';

export interface TogglePanelProps {
  align: 'left' | 'right';
  children: React.ReactNode;
};

const INITIAL_WIDTH = 350;

const TogglePanel = ({
  align,
  children,
}: TogglePanelProps) => {
  const [width, setWidth] = useState(INITIAL_WIDTH);
  const containerStyle = {
    width,
  };
  return (
    <Resizable
      className={resizableStyles.resizable}
      width={width}
      height={0}
      axis='x'
      onResize={(event, { element, size, handle }: any) => {
        setWidth(size.width);
      }}
      resizeHandles={[align === 'left' ? 'se' : 'sw']}
    >
      <div
        className={ classNames(
          styles.container,
          align,
        ) }
        style={ containerStyle }
      >
        <div className='content-container'>
          {children}
        </div>
      </div>
    </Resizable>
  );
};

export default TogglePanel;
