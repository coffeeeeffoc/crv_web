import GridLine from '../GridLine';
import GridIntersection from '../GridIntersection';
import { linesFor } from '@/utils/area';
import { useMemo } from 'react';

export default ({
  area,
  implicitGrid,
  computedStyles,
  computedGap,
  grayed,
  onOverCell,
}: any) => {
  const gridLines = [...linesFor({ type: 'row', implicitGrid }), ...linesFor({ type: 'col', implicitGrid })];
  const gridIntersections = useMemo(() => {
    if (area.grid) {
      const rowEnd = area.grid.row.sizes.length;
      const colEnd = area.grid.col.sizes.length;
      const intersections = [];
      for (let row = 2; row <= rowEnd; row++) {
        for (let col = 2; col <= colEnd; col++) {
          intersections.push({ row, col });
        }
      }
      return intersections;
    }
    return [];
  }, [area.grid]);
  return (
    <>
      {gridLines.map(line => (
        <GridLine
          key={`line-${line.type}-${line.pos}`}
          {...{
            area,
            type: line.type,
            pos: line.pos,
            gap: computedGap[line.type],
            implicitGrid,
            grayed,
            onOverCell,
          }}
        />
      ))}
      {gridIntersections.map(intersection => (
        <GridIntersection
          key={`intersection-${intersection.row}-${intersection.col}`}
          {...{
            area,
            row: intersection.row,
            col: intersection.col,
            rowGap: computedGap.row,
            colGap: computedGap.col,
            implicitGrid,
          }}
        />
      ))}
    </>
  );
};
