import { useState, useEffect } from 'react';
import {
  Select, Input, Popover, message, Button,
} from 'antd';
import { MinusOutlined, PlusOutlined, EditOutlined, BarsOutlined } from '@ant-design/icons';
import {
  addElement, matchValueType, typeMatchValueType, addTargetData, setTargetData,
  deleteTargetDataByKey, changeKeyOfTargetData, getType, usePrevious,
  callTrigger, getValueByKey, getNewAddKeys,
} from './utils';
import styles from './compUtils.less';

const { Option } = Select;

const setOption = (item, key = 'key') => (typeof (item) === 'object' ? item[key] : item);

export const Tooltip = ({
  title, children = { props: {} },
}) => (
  <span
    title={title}
    style={children.props.style}
    className={children.props.className}
  >
    {children}
  </span>
);

/**
 *
 * @description 在某个组件下面添加新组件
 */
export const AddExtra = ({ extra, children }) => (
  <>
    {children}
    {extra}
  </>
);

export const SetShowName = ({
  setDataSetChangedKey,
  setChangedKey,
  json,
  deletable,
  english,
  switchableTypes,
  switchableValueTypeDesc,
  removeIcon,
  keySelectOptions,
  thisKey,
  wholePath,
  title,
  description,
  trigger,
  executeFuncParam,
  parentDesc,
}) => (
  <AddExtra extra={(
    <>
      {(deletable || removeIcon) && (
      <Tooltip title='移除属性'>
        <MinusOutlined
          onClick={(e) => {
            e.stopPropagation();
            setDataSetChangedKey((data) => {
              const newData = deleteTargetDataByKey({ wholePath, data }, { key: thisKey });
              return callTrigger({
                trigger,
                type: 'deleteKey',
                args: {
                  ...executeFuncParam,
                  data: newData,
                  key: thisKey,
                  value: getValueByKey(newData, wholePath),
                },
              });
            });
          }}
          className={styles.keyControl}
        />
      </Tooltip>
      )}
      <ConditionalPopOver
        show={switchableTypes && switchableTypes.length}
        defaultOption={getType(json)}
        popEnabled
        options={switchableTypes}
        title='切换类型'
        iconType='bars'
        buttonCallback={(selected) => setDataSetChangedKey((data) => {
          const desc = switchableValueTypeDesc
            .filter((item) => typeMatchValueType(selected, item.valueType))[0];
          const res = addElement(desc);
          const newData = setTargetData({ wholePath, data }, { data: res });
          return callTrigger({
            trigger,
            type: 'valueTypeChange',
            args: {
              ...executeFuncParam,
              data: newData,
              key: thisKey,
              value: getValueByKey(newData, wholePath),
            },
          });
        }, wholePath)}
      />
    </>
)}
  >
    {
    keySelectOptions
      ? (
      <Select
        dropdownMatchSelectWidth={false}
        showSearch
        maxTagCount={1}
        title={description}
        className={styles.keySelect}
        value={thisKey}
        onChange={(val) => setDataSetChangedKey((data) => {
          const newKey = wholePath.replace(/\.[^.]+$/, `.${val}`);
          const newData = changeKeyOfTargetData({ wholePath, data }, { key: val });
          setChangedKey(newKey);
          return callTrigger({
            trigger,
            type: 'keyChange',
            args: {
              ...executeFuncParam,
              data: newData,
              key: val,
              value: getValueByKey(newData, newKey),
            },
          });
        })}
      >
        {keySelectOptions.map((item) => <Option key={setOption(item, 'key')} value={setOption(item, 'key')}>{setOption(item, english ? 'key' : 'value')}</Option>)}
      </Select>
        )
      : <span title={description}>{(english || parentDesc?.parent?.jsonDesc?.valueType === 'Array') ? thisKey : title || thisKey}</span>
  }
  </AddExtra>
);

export const SetShowValue = ({
  english, editable, json, valueType, controlType,
  selectModeTags, selectOptions, thisKey, customComponents,
  disabled, setData, wholePath, trigger, executeFuncParam,
}) => {
  const json2Str = [undefined, null].includes(json) ? json : String(json);
  const jsonValue = selectModeTags ? (json2Str ? [json2Str] : []) : json2Str;
  const prevVal = usePrevious(json);
  // 为Number类型时，输入字符串的情况下，onchange的参数是''空字符串，所以需要设置成当前的值，不改变。Boolean时暂时也这么考虑。
  const setVal = (val) => (['Boolean', 'Number'].includes(valueType) ? matchValueType(string2Value(val), valueType) ? string2Value(val) : prevVal : val);

  const string2Value = (val) => {
    const judge = {
      Boolean: () => eval(val),
      Number: () => Number(val),
    };
    return judge[valueType]();
  };

  const handleValueChange = (value) => setData((data) => callTrigger({
    trigger,
    type: 'valueChange',
    args: {
      ...executeFuncParam,
      data: setTargetData({ wholePath, data }, { data: value }),
      key: thisKey,
      value,
    },
  }));
  let comp = json;
  if (editable) {
    const Component = customComponents && customComponents[controlType];

    switch (controlType) {
      case 'select':
        comp = (
          <Select
            dropdownMatchSelectWidth={false}
            showSearch
            maxTagCount={1}
            style={{ width: '100%', height: '100%' }}
            disabled={disabled}
            value={jsonValue}
            mode={selectModeTags && 'tags'}
            onChange={(val) => {
              let value = selectModeTags ? val[val.length - 1] : val;
              value = setVal(value);
              handleValueChange(value);
            }}
          >
            {selectOptions && selectOptions.map((item) => <Option key={String(setOption(item, 'key'))} value={String(setOption(item, 'key'))}>{String(setOption(item, english ? 'key' : 'value'))}</Option>)}
          </Select>
        );
        break;
      case 'input':
        comp = (
          <Input
            type={valueType === 'Number' ? 'number' : valueType === 'textarea' ? 'textarea' : 'text'}
            style={{ width: '100%' }}
            disabled={disabled}
            value={json}
            onChange={(e) => {
              const val = e.target.value;
              const value = setVal(val);
              handleValueChange(value);
            }}
          />
        );
        break;
      default:
        if (Component) {
          comp = <Component />;
        }
        break;
    }
  } else {
    comp = selectOptions?.find(({ key }) => key === json)?.value ?? json;
  }

  return comp;
};

export const SetArrayControlValue = ({
  setData, childrenProps, wholePath, multiSelect, tagsMode, exuceteDesc, json,
}) => {
  const options = Array.isArray(childrenProps) ? childrenProps.map((item) => item.valueType) : [];
  const set = (desc) => setData((data) => {
    const res = addElement(desc);
    const result = addTargetData({ wholePath, data }, { data: res });
    return result;
  });
  if (multiSelect) {
    if (Array.isArray(childrenProps)) {
      message.warn('multiSelect为true时，childrenProps暂不支持数组形式的配置，描述文件配置有问题');
    } else {
      const [{ selectOptions = [1, 2, 3], valueType }] = exuceteDesc(childrenProps, `${wholePath}.0`);
      return (
        <Select
          value={json ?? []}
          mode={tagsMode ? 'tags' : 'multiple'}
          style={{ width: '100%', height: '100%' }}
          onChange={(...args) => {
            const config = {
              String,
              Number,
              Boolean: eval,
            };
            const constructor = config[valueType] || String;
            setData((data) => setTargetData(
              { wholePath, data }, { data: args[0].map(constructor) },
            ));
          }}
        >
          {selectOptions.map((item) => <Option key={setOption(item, 'key')} title={setOption(item, 'value')} value={setOption(item, 'key')}>{setOption(item, 'value')}</Option>)}
        </Select>
      );
    }
  }
  return (
    <ConditionalPopOver
      show
      popEnabled={Array.isArray(childrenProps)}
      options={options}
      iconType='plus'
      callback={() => {
        if (!Array.isArray(childrenProps)) {
          set(childrenProps);
        }
      }}
      buttonCallback={(selected) => {
        set(childrenProps.filter((item) => typeMatchValueType(selected, item.valueType))[0]);
      }}
    />
  );
};

export const SetObjectControlValue = ({
  english, batch, json, allowAdd, setData,
  locationAlias = '*', jsonDesc, location, objectKeys,
  wholePath, trigger, executeFuncParam, setNewAddKeys,
}) => {
  const allOptionArr = (objectKeys && objectKeys.length) ? objectKeys : (location[`.${locationAlias}`] && location[`.${locationAlias}`].keySelectOptions) || [];
  const options = allOptionArr.filter((item) => !Object.keys(json).includes(item)).map((item) => {
    const isObject = typeof item === 'object';
    const key = isObject ? item.key : item;
    return location[`.${key}`] ? { key, value: english ? key : location[`.${key}`].title || (isObject ? item.value : key) } : english ? key : item;
  }) || [];
  const addProps = (selectedKey) => {
    // 存在新属性时，提示修改，不允许添加。
    if (!selectedKey && Object.prototype.hasOwnProperty.call(json, ' ')) {
      message.info('存在新增属性的空键值还未正确设置，请设置后再添加新属性');
      return;
    }
    let changedNewAddKeys;
    setData((data) => {
      const res = addElement(jsonDesc, batch, selectedKey, true);
      const newData = addTargetData({ wholePath, data }, { data: res });
      const newAddKeys = getNewAddKeys(data, newData, wholePath);
      const excuteArr = selectedKey ? [selectedKey] : newAddKeys;
      changedNewAddKeys = newAddKeys;
      // selectedKey && setNewAddKeys(newAddKeys.map(item => `${wholePath}.${item}`));

      // 一次性添加了多个key的时候，个key和value都要对应执行一次联动
      return excuteArr.reduce((obj, item) => callTrigger({
        trigger,
        type: 'addKey',
        args: {
          ...executeFuncParam,
          data: obj,
          key: item,
          value: getValueByKey(obj, `${wholePath}.${item}`),
        },
      }), newData);
    });
    selectedKey && setNewAddKeys(() => changedNewAddKeys.map((item) => `${wholePath}.${item}`));
  };
  return (
    <ConditionalPopOver
      show={options.length > 0}
      alwaysShowChildren={!!allowAdd}
      popEnabled={!batch}
      options={options}
      callback={(e) => {
        e.stopPropagation();
        addProps();
      }}
      buttonCallback={(selected) => {
        addProps(selected);
      }}
    />
  );
};

const IconConfig = {
  bars: BarsOutlined,
  plus: PlusOutlined,
  minus: MinusOutlined,
  edit: EditOutlined,
}
export const ConditionalPopOver = ({
  title, show, options, defaultOption, alwaysShowChildren = false,
  popEnabled, callback, buttonCallback, iconType,
}) => {
  const [visible, setVisible] = useState(false);
  const hasOptions = options.length > 0;
  const onlyShowChildren = popEnabled && hasOptions;
  const isDefaultOptionValid = options && options.findIndex((item) => (typeof (defaultOption) === 'object' ? item.key : item) === defaultOption) > -1;
  const selectOption = isDefaultOptionValid ? defaultOption : (options && setOption(options[0], 'key'));
  const [selected, setSelected] = useState(selectOption);
  const Icon = IconConfig[iconType] ?? 'span';
  const children = (
    <Tooltip title={title || '新增属性'}>
      <Icon
        className={styles.valueControl}
        type={iconType || 'plus'}
        onClick={(e) => {
          e.stopPropagation();
          setVisible((v) => !v);
          show && !onlyShowChildren && callback && callback(e);
        }}
      />
    </Tooltip>
  );

  useEffect(() => setSelected(selectOption), [visible]);
  useEffect(() => setVisible(false), [onlyShowChildren]);

  return show
    ? onlyShowChildren
      ? (
    <Popover
      visible={visible}
      trigger='click'
      onVisibleChange={setVisible}
      content={(
        <>
          <Select
            maxTagCount={1}
            showSearch
            value={selected}
            style={{ minWidth: 150 }}
            onChange={setSelected}
            dropdownMatchSelectWidth={false}
          >
            {options.map((item) => <Option key={setOption(item, 'key')} title={setOption(item, 'value')} value={setOption(item, 'key')}>{setOption(item, 'value')}</Option>)}
          </Select>
          <Button onClick={() => {
            buttonCallback(selected);
            setVisible(false);
          }}
          >
            确认
          </Button>
        </>
      )}
    >
      {alwaysShowChildren ? children : hasOptions && children}
    </Popover>
        )
      : children
    : null;
};
