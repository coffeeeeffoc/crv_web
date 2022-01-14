/* eslint-disable no-template-curly-in-string */
import { useMemo, useCallback } from 'react';
import { parseEditableColumns } from './utils';
import { components } from './EditableComponents';

interface useEditRecordDataProps<DataType = any> {
  // 操作字段对应的dataIndex
  operationKey?: string;
  onChange: (val: DataType) => void;
  value: DataType[];
  initialData?: DataType;
  onAdd?: (text: any, record: any, index: any) => any | Promise<DataType>;
  onEdit?: (text: string, record: DataType, index?: number) => void;
  basicColumns: any[] | ((param: any) => any[]);
  editControl?: any;
};

const addRowIndex = (value?: any[]) => value?.map?.((item, index) => ({ ...item, _rowIndex: index })) ?? [];
const removeRowIndex = (value?: any[]) => value?.map?.(({ _rowIndex, ...item }, index) => item) ?? [];

export const useEditRecordData = ({
  operationKey = '__operation__', // 操作字段对应的dataIndex
  onChange,
  value,
  initialData,
  onAdd,
  onEdit,
  basicColumns,
  editControl,
}: useEditRecordDataProps) => {
  const dataSource = useMemo(() => addRowIndex(value), [value]);
  const onHandleChange = useCallback((val: any) => onChange(removeRowIndex(val)), [onChange]);
  const onAddRow = useCallback(async (text: any, record: any, index: number) => {
    const onAddResult = await onAdd?.(text, record, index);
    const res = dataSource.slice();
    res.splice((typeof index === 'number' ? index : res.length - 1) + 1, 0, { ...initialData, ...onAddResult });
    onHandleChange(res);
  }, [dataSource, onHandleChange, initialData, onAdd]);
  const onDelete = useCallback((text, record, index) => {
    // eslint-disable-next-line no-unused-vars
    onHandleChange(dataSource.filter(({ _rowIndex: rowIndex }) => rowIndex !== index));
  }, [dataSource, onHandleChange]);

  // 此处默认只情况只需第一个参数，把需要修改的多个字段的值作为对象传递进来
  // 为应对basicColumns为function的情况，render中多传第二个参数record以定位所修改的记录
  const onHandleSave = useCallback(({ _rowIndex: rowIndexTmp, ...rest }, record) => {
    onHandleChange(dataSource.map(({ _rowIndex: rowIndex, ...item }) => {
      const paramRowIndex = rowIndexTmp ?? record?._rowIndex;
      return paramRowIndex === rowIndex ? { ...item, ...rest } : item;
    }));
  }, [dataSource, onHandleChange]);

  const columns = useMemo(() => {
    const _basicColumns = typeof basicColumns === 'function' ? basicColumns({ onHandleSave }) : basicColumns;
    const _columns = parseEditableColumns(_basicColumns.map(item => ({ ...item, onHandleSave, editControl })));
    return _columns;
  }, [editControl, onHandleSave, basicColumns]);
  return {
    dataSource,
    onAddRow,
    onDelete,
    columns,
    onHandleSave,
  };
};

export const useEditable = ({
  ...props
}: any) => {
  return {
    components,
    size: 'small',
    bordered: true,
    rowKey: '_rowIndex',
  };
};
