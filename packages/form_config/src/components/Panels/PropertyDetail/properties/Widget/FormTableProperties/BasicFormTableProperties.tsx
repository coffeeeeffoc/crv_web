import {
  useState,
} from 'react';
import { BasicTable, useEditRecordData } from '@rc/CustomTable';
import { SPECIAL_FIELDS_REG } from './propertiesConfig';
import { EditControl } from './EditControl';
import { useDebounce } from '@utils/browser/hooks';

const customConfig = {
  editable: true,
  showCheckbox: false,
  rowDraggable: false,
  headerColDraggable: false,
  headerColResizable: false,
  allowSelectColumns: false,
  showPagination: false,
  maxHeight: 350,
};
export default ({
  propertiesConfig,
  value,
  onChange,
  maxHeight,
}: any) => {
  const onChangeDebounce = useDebounce((val: any[]) => {
    const newValue = val.reduce((res, item) => ({
      ...res,
      ...(item.key.match(SPECIAL_FIELDS_REG)
        ? item.value
        : {
            [item.key]: item.value,
          }
      ),
    }), {});
    console.log('newValue--4', newValue);
    onChange?.(newValue);
  }, 100);
  const [data, setData] = useState(() => Object.keys(propertiesConfig).map(key => {
    const target = propertiesConfig[key];
    return { key, value: value?.[key] ?? target.initialValue };
  }));
  const basicColumns = [
    {
      dataIndex: 'key',
      title: '属性',
      width: 150,
      render: (text: any, record: any, index: any) => {
        const { title = text, description } = propertiesConfig[text] ?? {};
        return <span title={`${title ?? ''}\n${description ?? ''}`}>{title}</span>;
      },
    },
    {
      dataIndex: 'value',
      title: '值',
      width: 120,
      editable: true,
      onCell: () => ({
        usePersistentWidget: true,
        customConfig: {
          propertiesConfig,
        },
      }),
    },
  ];
  const {
    dataSource,
    columns,
  } = useEditRecordData({
    onChange: (val: any[]) => {
      onChangeDebounce(val);
      setData(val);
    },
    value: data,
    basicColumns,
    editControl: EditControl,
  });
  const recordValue = dataSource.reduce((res, item) => ({
    ...res,
    [item.key]: item.value,
  }), {});
  return (
    <BasicTable {...{
      customConfig: {
        ...customConfig,
        ...(maxHeight && { maxHeight }),
      },
      columns,
      dataSource: dataSource.filter((item) => {
        return !propertiesConfig[item.key]?.hiddenCondition?.(recordValue);
      }),
    }}/>
  );
};
