import {
  SetShowName, SetShowValue, SetArrayControlValue, SetObjectControlValue,
} from './compUtils';
import {
  getType, isEmpty, matchValueType, executeDescFunc,
} from './utils';
import { ALL_TYPES } from '../common';

const setPosition = (alias, str) => (position) => {
  const aliasStr = `.${alias}`;
  const arr = position.split(aliasStr);
  return arr.length > 1 ? `${arr.slice(0, arr.length - 1).join(aliasStr)}.${str}` : position;
};
/**
 * @returns
 * @description json格式数据转换为Table的data
 * @param outerJsonData 初始json数据
 * @param jsonDesc json描述文件
 */
const convert2TableData = ({
  data: outerJsonData, jsonDesc: outerJsonDesc, customComponents, otherParam,
  onChange: setDataSetChangedKey, setChangedKey, setNewAddKeys, english, batch,
}) => {
  const errMsg = [];// 存储错误的属性，为了提示用户某些属性配置错误
  const descByKey = {};// 存储对象，可以根据key返回相应的描述文件
  const exuceteDesc = executeDescFunc(outerJsonData, setDataSetChangedKey, otherParam);
  const convert = (args) => {
    const {
      json, position = '.', setPos, removeIcon, parentDesc,
    } = args;
    const { jsonDesc: desc } = args;
    if (!desc) return;
    const wholePath = setPos ? setPos(position) : position;
    const noDotWholePath = wholePath === '.' ? '' : wholePath;
    const thisKey = wholePath.match(/\.([^.]*)$/)[1] || '';
    const [jsonDesc, executeFuncParam] = exuceteDesc(desc, wholePath);
    // const executeFuncParam = {
    //   data: outerJsonData,
    //   getStepByKey: findTargetDataStep,
    //   wholePath,
    //   stepData: findTargetDataStep({ wholePath, data: outerJsonData }),
    //   setData: setDataSetChangedKey,
    // };
    // jsonDesc = _.cloneDeep(jsonDesc);
    // Object.keys(jsonDesc).forEach((k) => {
    //   typeof (jsonDesc[k]) === 'function' && (jsonDesc[k] = jsonDesc[k](executeFuncParam));
    // });

    const {
      valueType, editable, deletable, controlType,
      objectKeys, selectModeTags, selectOptions,
      location, description, allowAdd, locationAlias,
      keySelectOptions, trigger, title, disabled,
      switchableTypes = [], switchableValueTypeDesc,
      childrenProps, multiSelect, valueTypeTransfer,
      selectMode,
    } = jsonDesc;

    const setData = (arg) => setDataSetChangedKey(arg, wholePath);
    const showValue = (
      <SetShowValue {...{
        english,
        editable,
        json,
        valueType,
        controlType,
        selectModeTags,
        selectOptions,
        thisKey,
        customComponents,
        // handleValueChange,
        disabled,
        setData,
        wholePath,
        trigger,
        executeFuncParam,
      }}
      />
    );
    const arrayControlValue = (
      <SetArrayControlValue {...{
        json,
        jsonDesc,
        setData,
        childrenProps,
        wholePath,
        outerJsonData,
        trigger,
        executeFuncParam,
        setNewAddKeys,
        multiSelect,
        exuceteDesc,
      }}
      />
    );
    const objectControlValue = (
      <SetObjectControlValue {...{
        english,
        jsonDesc,
        json,
        batch,
        allowAdd,
        setData,
        locationAlias,
        location,
        objectKeys,
        wholePath,
        outerJsonData,
        trigger,
        executeFuncParam,
        setNewAddKeys,
      }}
      />
    );
    const showName = (
      <SetShowName {...{
        json,
        allowAdd,
        deletable,
        english,
        switchableTypes: switchableTypes.map((item) => ({
          key: item,
          value: valueTypeTransfer?.[item] || ALL_TYPES[item],
        })),
        switchableValueTypeDesc,
        removeIcon,
        keySelectOptions,
        thisKey,
        setDataSetChangedKey,
        setChangedKey,
        wholePath,
        title,
        description,
        trigger,
        executeFuncParam,
        parentDesc,
        selectMode,
      }}
      />
    );

    if (typeof valueType === 'object') {
      const types = Object.keys(valueType);
      const currentValueType = types.filter((type) => getType(json) === type)[0] || types[0];
      const { valueType: xxx, ..._rest } = jsonDesc;
      return convert({
        ...args,
        jsonDesc: {
          ..._rest,
          valueType: currentValueType,
          ...valueType[currentValueType],
          switchableTypes: types,
          switchableValueTypeDesc: Object.keys(valueType).map((key) => ({
            valueType: key,
            ...valueType[key],
          })),
        },
      });
    }

    if (valueType === 'Object') {
      let children;

      if (json && Object.keys(json).length) {
        const jsonAllKeys = Object.keys(json);
        // 过滤 有些数据中某些属性与描述文件不符，系以前配置错误的数据，需要无视该属性显示，并予以用户相应的提示
        const arr = jsonAllKeys.filter((key) => {
          let result;
          // 当键为空格时，认为是正常的，允许存在本键
          if (key === ' ') return true;

          if (locationAlias) {
            const { keySelectOptions: keySelectOptionsTmp } = location[`.${locationAlias}`];
            result = keySelectOptionsTmp ? keySelectOptionsTmp.findIndex((item) => key === String(typeof item === 'object' ? item.key : item)) > -1 : true;
          } else if (objectKeys && Array.isArray(objectKeys)) {
            // json[key为undefined时，即设置值为空，只是清空值，肯定不是出错
            result = (objectKeys.includes(key) && location[`.${key}`] && matchValueType(json[key], location[`.${key}`].valueType)) || isEmpty(json[key]);
          }
          !result && errMsg.push(`${noDotWholePath}.${key}`);
          return result;
        });
        if (arr && arr.length) {
          children = arr.map((key) => convert({
            json: json[key],
            jsonDesc: location[`.${locationAlias || key}`],
            position: `${noDotWholePath}.${key}`,
            callback: objectKeys,
            parentDesc: { parent: args },
            removeIcon: !!allowAdd,
          }));
        }
      }
      descByKey[wholePath] = jsonDesc;
      return {
        key: wholePath,
        name: showName,
        value: objectControlValue,
        children,
        description,
      };
    } if (valueType === 'Array') {
      const children = !multiSelect && json && json.map((item, index) => {
        if (Array.isArray(childrenProps)) {
          return convert({
            json: json[index],
            jsonDesc: {
              ...childrenProps.filter((child) => matchValueType(item, child.valueType))[0],
              // ...childrenProps.filter(child => child.valueType === getType(item))[0],
              switchableTypes: childrenProps.map((prop) => prop.valueType),
              switchableValueTypeDesc: childrenProps,
            },
            position: `${noDotWholePath}.${locationAlias}`,
            keyOrIndex: index,
            setPos: setPosition(locationAlias, index),
            parentDesc: { parent: args },
            removeIcon: true, // 数组默认允许删除
          });
        }
        return convert({
          json: json[index],
          jsonDesc: childrenProps,
          position: `${noDotWholePath}.${locationAlias}`,
          keyOrIndex: index,
          setPos: setPosition(locationAlias, index),
          parentDesc: { parent: args },
          removeIcon: true, // 数组默认允许删除
        });
      });
      descByKey[wholePath] = jsonDesc;
      return {
        key: wholePath,
        name: showName,
        value: arrayControlValue,
        children,
        description,
      };
    } if ('String Boolean Number'.split(' ').includes(valueType)) {
      descByKey[wholePath] = jsonDesc;
      return {
        key: wholePath,
        name: showName,
        value: showValue,
        description,
      };
    }
  };
  const result = convert({ json: outerJsonData, jsonDesc: outerJsonDesc });
  return [result.children, errMsg, (key) => descByKey[key]];
};

export default convert2TableData;
