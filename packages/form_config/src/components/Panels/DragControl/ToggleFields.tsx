import { Drag } from '@@/DragDrop';
import { Field } from './Field';
import Searchable from './Searchable';
import { useState } from 'react';
import {
  Switch,
} from 'antd';

const defaultGeneratedFields = 'version create_user create_time last_update_user last_update_time'.split(' ');
const ToggleFields = ({
  fields,
  areaAdditions,
}: {
  fields: any[];
  areaAdditions: any;
}) => {
  const [defaultFieldsVisible, setDefaultFieldsVisible] = useState(false);
  const [usedFieldsVisible, setUsedFieldsVisible] = useState(false);
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
              checked={defaultFieldsVisible}
              onChange={setDefaultFieldsVisible}
              checkedChildren='显示默认生成的字段'
              unCheckedChildren='隐藏默认生成的字段'
            />
            <Switch
              checked={usedFieldsVisible}
              onChange={setUsedFieldsVisible}
              checkedChildren='显示已使用的字段'
              unCheckedChildren='隐藏已使用的字段'
            />
          </div>
        )}
        filter={(val: any) => fields
          .filter(item => defaultFieldsVisible ? true : !defaultGeneratedFields.includes(item.id))
          .filter(item => val
            ? String(item.id).includes(val) || String(item.name ?? '').includes(val)
            : true
          )
          .map((item) => {
            const isDefaultField = defaultGeneratedFields.includes(item.id);
            // 隐藏默认生成的字段
            if (isDefaultField && !defaultFieldsVisible) {
              return null;
            }
            // 隐藏已使用的字段
            const isUsed = Object.values(areaAdditions).findIndex((val: any) => val.field?.field === item.id) !== -1;
            if (isUsed && !usedFieldsVisible) {
              return null;
            }
            return (
              <Drag
                key={item.id}
                type='field'
                data={{
                  field: item.id,
                }}
              >
                <Field {...{
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

export default ToggleFields;
