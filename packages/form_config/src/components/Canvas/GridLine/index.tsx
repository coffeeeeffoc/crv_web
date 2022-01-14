/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { asValidLineNumber } from '@/utils/grid';
import { getGridArea } from '../GridTrack';
import classNames from 'classnames';
import styles from './index.less';

export default ({
  implicitGrid,
  type,
  pos,
  area,
  gap = '0px',
}: any) => {
  const newPos = Math.max(pos - 1, type === 'row' ? implicitGrid.ri : implicitGrid.ci);
  const gridArea = getGridArea({ pos: newPos, type, implicitGrid });
  const firstExplicit = pos === 1;
  const lastExplicit = pos === area.grid[type].lineNames.length;

  // TODO: refactor implicitGrid -> { col: { size, i }, row: { size, i } }
  const firstImplicit = pos === (type === 'row' ? implicitGrid.ri : implicitGrid.ci);
  const lastImplicit = pos ===
    (type === 'row' ? implicitGrid.rows : implicitGrid.cols) +
      (type === 'row' ? implicitGrid.ri : implicitGrid.ci);
  const lineNumberStyle = type === 'row'
    ? {
        left: '1px',
        bottom: (firstImplicit || lastImplicit) ? '' : `calc(-7px - 0.5 * ${gap}`,
      }
    : {
        top: '1px',
        right: (firstImplicit || lastImplicit) ? '' : `calc(-6.5px - 0.5 * ${gap}`,
      };
  return (
    <section
      style={{ gridArea }}
      className={classNames(
        styles.gridLine,
        type,
        {
          firstExplicit,
          lastExplicit,
          firstImplicit,
          lastImplicit,
        }
      )}
    >
      <div
        className={classNames(
          styles.lineNumber
        )}
        style={lineNumberStyle}
      >
        {asValidLineNumber(pos, type, implicitGrid)}
      </div>
      {/* TODO */}
    </section>
  );
};
