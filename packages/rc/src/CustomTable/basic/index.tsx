import { Table } from 'antd';
// import { CustomTableConfig } from './types';
import { useExtension } from './hooks';
import styles from './index.less';
import { defaultConfig, mergeData, DEFAULT_COLUMN_WIDTH, TABLE_TR_HEIGHT } from './config';
import classNames from 'classnames';
console.log('styles11', styles);
export * from './Draggable';
export * from './Editable';
export * from './ExcelImportExport';
export * from './ResizableHeaderCell';
export * from './hooks';
export * from './config';
export * from './types';

// 配置项的配置路径为 packages\form_config\src\components\Panels\PropertyDetail\properties\Widget\formTableCustomConfig.ts
export default ({
  customConfig,
  convertProps,
  ...props
}: any) => {
  const config = mergeData(customConfig, defaultConfig);
  const newProps = useExtension(config, props);
  const extensionProps = {
    ...props,
    size: 'small',
    bordered: true,
    ...newProps,
    pagination: config.showPagination
      ? {
          ...newProps.pagination,
          pageSizeOptions: config.pageSizeOptions,
          showQuickJumper: !!config.showQuickJumper,
          showSizeChanger: !!config.showSizeChanger,
          ...(config.showTotal && {
            showTotal: (total: number, range: [number, number]) => config.showTotal
              .replace(/\$\{range0\}/, range[0])
              .replace(/\$\{range1\}/, range[1])
              .replace(/\$\{total\}/, total),
          }),
        }
      : false,
    className: classNames(styles.table, props.className, newProps.className),
  };
  const tempProps = {
    ...extensionProps,
    scroll: {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      x: extensionProps.columns.reduce((sum: number, item: any) => sum + (item.width ?? DEFAULT_COLUMN_WIDTH), 0),
      ...(config.maxHeight && (TABLE_TR_HEIGHT * extensionProps.dataSource.length > config.maxHeight) && {
        y: config.maxHeight,
      }),
    },
    // 删除最后一列的宽度
    columns: (extensionProps.columns as any[])
      .map((item, index, arr) => {
        if (index === arr.length - 1) {
          const { width, ...rest } = item;
          return rest;
        }
        return item;
      }),
  };
  const finalProps = typeof convertProps === 'function' ? convertProps(tempProps) : tempProps;
  console.log('finalProps', finalProps);
  return (
    <Table
      {...finalProps}
    />
  );
};
