import { useState, useEffect, useCallback } from 'react';
import {
  Table, Switch, message,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import styles from './EditTable.less';
import convert2TableData from './convert2TableData';
import preHandleDesc from './preHandleDesc';
import {
  addElement, usePrevious, isEmpty, compareDiff, getNewAddKeys, loopExecuteDescFunc,
} from './utils';
import { ConditionalPopOver, Tooltip } from './compUtils';
import { ALL_TYPES } from '../common';

const EditableFormRow = (props) => <tr {...props} />;

const EditableFormCell = (props) => <td {...props} />;

const getFirstDesc = (obj) => {
  const { valueType } = obj;
  if (typeof valueType === 'object') {
    const firstValueType = Object.keys(valueType)[0];
    return {
      valueType: firstValueType,
      ...valueType[firstValueType],
    };
  }
  return obj;
};

const defaultHeaderControl = {
  english: false,
  batch: true,
  headerTitle: [],
  showLanguageSwitch: true,
  showBatchSwitch: true,
  showDeleteIcon: true,
  showAddIcon: true,
  showSwitchTypeIcon: true,
};

const EditTable = (props) => {
  const {
    jsonData, jsonDesc: desc, setFunc, getSelfModelFields, getOtherParam = () => {},
    getRefModelFields, customComponents, headerConfig,
  } = props;
  const headerControl = {
    ...defaultHeaderControl, ...headerConfig,
  };
  const selfModelFields = getSelfModelFields();
  const refModelFields = getRefModelFields();
  const otherParam = getOtherParam();
  // jsonDesc不存在时，提示报错
  useEffect(() => {
    if (!desc) return message.error('没有json配置描述文件，暂不支持无配置描述文件的场景。');
  }, [desc]);
  // 对描述文件配置的函数，解析执行，变成对应的值
  const preHandle = (des) => preHandleDesc(des, { selfModelFields, refModelFields, otherParam });
  const firstDesc = preHandle(getFirstDesc(desc));
  const [jsonDesc, setJsonDesc] = useState(firstDesc);
  const {
    allowAdd: _allowAdd, valueType, location, objectKeys, trigger,
  } = jsonDesc;
  const allowAdd = valueType === 'Array' ? true : _allowAdd;
  const defaultData = {
    Object: {},
    Array: [],
  };
  const [data, setData] = useState(jsonData || defaultData[valueType]);
  const [footer, setFooter] = useState(null);
  const [english, setEnglish] = useState(headerControl.english);// 是否显示属性中文名
  const [batch, setBatch] = useState(headerControl.batch);// 是否批量添加属性
  const [changedKey, setChangedKey] = useState('');
  const [newAddKeys, setNewAddKeys] = useState([]);
  // setData和setChangedKey合并起来，是为了让函数少执行一次
  const setDataSetChangedKey = (args0, args1) => {
    setData(args0);
    args1 && setChangedKey(args1);
  };
  const [newData = [], errMsg = [], getDescByKey] = convert2TableData({
    otherParam,
    data,
    jsonDesc,
    onChange: setDataSetChangedKey,
    customComponents,
    english,
    batch,
    setChangedKey,
    setNewAddKeys,
  });
  const [expandedRowKeys, setExpandedRowKeys] = useState(() => {
    // 设置expandedRowKeys的初始值
    const parentNodeKeys = [];
    const loop = (obj) => {
      if (obj.children) {
        parentNodeKeys.push(obj.key);
        obj.children.map(loop);
      }
    };
    newData.map(loop);
    return parentNodeKeys;
  });

  const prevData = usePrevious(data);

  useEffect(() => {
    trigger && setChangedKey('.');
  }, [trigger]);
  useEffect(() => {
    if (errMsg.length) {
      setData((oldData) => {
        // 当数据的某些属性与配置不符时，忽略属性，并根据属性的路径从显示数据中删除
        const ignoreByKey = (keyPath) => {
          const path = keyPath.split('.').filter(Boolean);
          let target = oldData;
          for (let i = 0; i < path.length - 1; i++) {
            const item = path[i];
            if (typeof target === 'object') {
              target = target[item];
            } else {
              return;
            }
          }
          typeof target === 'object' && delete target[path[path.length - 1]];
        };
        errMsg.map(ignoreByKey);
        return oldData;
      });
      message.warn(`数据的下列属性与配置格式不符，已忽略：${errMsg.join(' | ')}`);
    }
  }, [errMsg, trigger]);

  // 根据路径，展开对应的属性及其下级所有属性
  const expandByKey = useCallback((keyPath) => {
    const result = [];
    const allKeys = [];
    let startExpandFlag = keyPath === '';
    const expand = (target) => {
      allKeys.push(target.key);
      if (target.children) {
        startExpandFlag = startExpandFlag || (target && target.key === keyPath);
        if (startExpandFlag) {
          result.push(target.key);
        }
        target.children.map((item) => expand(item));
      }
    };
    newData.map(expand);
    if (!startExpandFlag) return;// 如果没展开任何项，则认为这是刚修改的数据，对应的键还没生成，这次不处理，等待下次data变化后有该键了再处理
    setExpandedRowKeys((prevExpandedRowKeys) => [...new Set(result.concat(prevExpandedRowKeys))]
      .filter((item) => allKeys.includes(item)));
  }, [newData]);
  // 新增属性要展开
  useEffect(() => {
    newAddKeys.map(expandByKey);
  }, [expandByKey, newAddKeys]);
  // 触发联动时，全局比较判断哪些属性发生变化，再展开
  useEffect(() => {
    if (changedKey) {
      const thisDesc = getDescByKey(changedKey);
      const WillTrigger = !!(thisDesc && thisDesc.trigger);
      const triggerChangeKeys = (WillTrigger && compareDiff(data, prevData)) || [];

      triggerChangeKeys.concat(changedKey).map(expandByKey);
    }
  }, [changedKey, data, expandByKey, getDescByKey, prevData]);

  useEffect(() => {
    newAddKeys.length && setNewAddKeys([]);
    changedKey && setChangedKey('');
  }, [newAddKeys.length, changedKey]);
  // 校验json数据data是否格式无误
  const validate = () => {
    const emptyKey = [];
    const emptyValue = [];
    try {
      JSON.stringify(data);
    } catch (e) {
      message.error('json格式有误，请修改配置');
    }
    const valid = (obj, pos = '') => {
      const config = {
        object: () => {
          if (isEmpty(obj)) {
            emptyValue.push(pos);
            return false;
          }
          return Object.keys(obj).every((k) => {
            const newPos = `${pos}.${k}`;
            if (k === ' ') {
              emptyKey.push(newPos);
              return false;
            }
            return valid(obj[k], newPos);
          });
        },
        string: () => true,
        number: () => true,
        boolean: () => true,
      };
      return config[typeof (obj)]();
    };
    const result = valid(data);
    const arr = [];
    emptyKey.length && arr.push(`数据的下列属性不能为空，请设置：${emptyKey.join('|')}.`);
    emptyValue.length && arr.push(`数据的下列值不能为空，请设置：${emptyValue.join('|')}.`);
    !result && arr.length && message.error(`${arr.join('\r\n')}`);
    return result;
  };

  // 设置回调，供上层组件获取json
  setFunc(() => validate() && data);
  const descFnParams = {
    otherParam,
    selfModelFields,
    refModelFields,
  };
  const addProps = (selectedKey) => {
    let lastNewAddKeys;
    setDataSetChangedKey((dt) => {
      const noFuncDesc = loopExecuteDescFunc(jsonDesc, descFnParams);
      const res = addElement(noFuncDesc, batch, selectedKey, true);
      // const res = addElement(jsonDesc, batch, selectedKey, true);
      const result = Array.isArray(dt) ? [...dt, ...res] : { ...dt, ...res };
      const newAddKeysRes = getNewAddKeys(dt, result, '.');
      lastNewAddKeys = newAddKeysRes;
      return result;
    }, '.');
    setNewAddKeys(lastNewAddKeys?.map((item) => `.${item}`) ?? []);
  };
  const options = valueType === 'Object' && objectKeys && (
    typeof objectKeys === 'function' ? objectKeys(descFnParams) : objectKeys
  ).filter((item) => !Object.keys(data).includes(item)).map((item) => (location[`.${item}`] ? { key: item, value: location[`.${item}`].title } : item));
  const tableColumn = [
    {
      dataIndex: 'name',
      ellipsis: true,
      onCell: (record) => ({
        ...record,
      }),
      title: () => (
        <>
          <span className={styles.headerTitle}>{headerControl.headerTitle[0]}</span>
          {headerControl.showSwitchTypeIcon && (
            <ConditionalPopOver
              show={typeof (desc.valueType) === 'object'}
              popEnabled
              options={Object.keys(desc.valueType).map((item) => ({
                key: item,
                value: desc.valueTypeTransfer?.[item] || ALL_TYPES[item],
              }))}
              iconType='bars'
              buttonCallback={(selected) => {
                setDataSetChangedKey(defaultData[selected], '.');
                if (selected === 'Object') setChangedKey('');
                setJsonDesc(preHandle({
                  valueType: selected,
                  ...desc.valueType[selected],
                }));
              }}
            />
          )}
        </>
      ),
      width: '50%',
    },
    {
      title: () => (
        <>
          <span className={styles.headerTitle}>{headerControl.headerTitle[1]}</span>
          {headerControl.showLanguageSwitch && (
            <Tooltip title='切换显示文字'>
              <Switch
                style={{ width: 100 }}
                checked={english}
                onChange={setEnglish}
                checkedChildren='显示英文'
                unCheckedChildren='显示中文'
              />
            </Tooltip>
          )}
          {headerControl.showBatchSwitch && (
            <Tooltip title='切换新增属性方式'>
              <Switch
                style={{ width: 120 }}
                checked={batch}
                onChange={setBatch}
                checkedChildren='添加批量属性'
                unCheckedChildren='添加单个属性'
              />
            </Tooltip>
          )}
          {headerControl.showDeleteIcon && JSON.stringify(data).length > 2 && (
          <Tooltip title='重置数据'>
            <DeleteOutlined
              style={{ margin: '0 5px' }}
              onClick={() => {
                setFooter('');
                setDataSetChangedKey(defaultData[valueType]);
              }}
            />
          </Tooltip>
          )}
          {headerControl.showAddIcon && (
            <ConditionalPopOver
              show={allowAdd ? true : options.length > 0}
              alwaysShowChildren={!!allowAdd}
              popEnabled={!batch}
              options={options}
              callback={() => addProps()}
              buttonCallback={addProps}
            />
          )}
        </>
      ),
      dataIndex: 'value',
      width: '50%',
      onCell: (record) => ({
        ...record,
      }),
    },
  ];
  return (
    <Table
      style={{
        width: '100%',
        minWidth: 600,
      }}
      className={styles.editTable}
      bordered
      rowKey={(record) => record.key}
      align='left'
      pagination={false}
      columns={tableColumn}
      scroll={{ y: 400 }}
      dataSource={newData}
      defaultExpandAllRows
      expandedRowKeys={expandedRowKeys}
      onExpandedRowsChange={setExpandedRowKeys}
      footer={() => <p style={{ whiteSpace: 'pre-line' }}>{footer}</p>}
      onRow={(record) => ({ onClick: () => setFooter(record.description) })}
      components={{
        body: {
          row: EditableFormRow,
          cell: EditableFormCell,
        },
      }}
    />
  );
};

export default EditTable;
