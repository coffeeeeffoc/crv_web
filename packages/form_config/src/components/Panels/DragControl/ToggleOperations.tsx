import { Drag } from '@@/DragDrop';
import { Operation } from './Operation';
import Searchable from './Searchable';
import { useState } from 'react';
import {
  Switch,
} from 'antd';

const ToggleOperations = ({
  operations,
  areaAdditions,
}: {
  operations: any[];
  areaAdditions: any;
}) => {
  const [usedOperationsVisible, setUsedOperationsVisible] = useState(false);
  return (
    <>
      <Searchable
        placeholder={'搜索字段id或name'}
        contentInnerStyle={{
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
        }}
        convertSearchHeader={(content: any) => (
          <div style={{
            display: 'flex',
            gap: 5,
            flexDirection: 'column',
          }}>
            <content.type {...{
              ...content.props,
              style: {
                ...content.props?.style,
                flex: 'auto',
              },
            }} />
            <Switch
              checked={usedOperationsVisible}
              onChange={setUsedOperationsVisible}
              checkedChildren='显示已使用的操作'
              unCheckedChildren='隐藏已使用的操作'
            />
          </div>
        )}
        filter={(val: any) => operations
          .filter(item => val
            ? String(item.id).includes(val) || String(item.name ?? '').includes(val)
            : true
          )
          .map((item) => {
            const isUsed = Object.values(areaAdditions).findIndex((val: any) => {
              const operations = val.operationBar?.operations;
              return operations && operations.findIndex(({ id }: any) => id === item.id) > -1;
            }) !== -1;
            // 隐藏已使用的操作
            if (isUsed && !usedOperationsVisible) {
              return null;
            }
            return (
              <Drag
                key={item.id}
                type='operation'
                data={{
                  operation: item,
                }}
              >
                <Operation {...{
                  ...item,
                  ...(isUsed && {
                    style: {
                      backgroundColor: 'grey',
                    },
                  }),
                }} />
              </Drag>
            );
          })}
        />
    </>
  );
};

export default ToggleOperations;
