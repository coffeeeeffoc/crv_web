import { Input, Select } from 'antd';
import styles from './TypeSwitchableControl.less';
import type { BasicFormItemProps } from '@/types';
import classNames from 'classnames';
import { hasOwn, parseEventParam } from '@utils/browser/utils';
import { parseDynamicContent } from '@utils/browser/dynamicValue';

const { Option } = Select;

export enum ControlTypes {
  input = 'input',
  textarea = 'textarea',
};

interface TypeSwitchableControlProps extends BasicFormItemProps<any> {
  config?: any;
  children?: React.ReactElement | null;
  // config?: {
  //   [key in ControlTypes]: Function;
  //   // [key: string]: {
  //   //   controlType?: ControlTypes;
  //   // };
  // };
};

export default function TypeSwitchableControl ({
  config,
  value,
  onChange,
  children,
}: TypeSwitchableControlProps) {
  const configTypes = config ? Object.keys(config) : [];
  const controlProps = {
    className: styles.typeSwitch__control,
    value: parseDynamicContent(value),
    onChange: (val: any) => {
      onChange({
        _$type: selectType,
        _$content: parseEventParam(val),
      });
    },
  };
  const newConfig = children
    ? {
        default: ['默认', (
          <children.type
            key='default'
            {...children.props}
            className={classNames(children.props.className, controlProps.className)}
            {...(!hasOwn(children.props, 'value') && { value: controlProps.value })}
            {...(!hasOwn(children.props, 'onChange') && { onChange: controlProps.onChange })}
          />
        )],
        ...config,
      }
    : config;
  const types = children ? ['default', ...configTypes] : configTypes;
  const selectType = value?._$type ?? types[0];
  const [, Control, optionProps] = newConfig?.[selectType] || ['', Input];
  const isDefault = selectType === 'default' && children;
  const control = isDefault ? Control : <Control {...controlProps} {...optionProps} />;
  return types.length > 0
    ? (
        <div className={styles.typeSwitch} >
          {/* {control} */}
          <control.type {...control.props} value={controlProps.value} />
          <Select
            value={selectType}
            onChange={(val: any) => {
              onChange({
                _$type: val,
                _$content: undefined,
              });
            }}
            className={styles.typeSwitch__types}
          >
            {
              types.map(type => {
                return <Option key={type} value={type} >{newConfig[type][0]}</Option>;
              })
            }
          </Select>
        </div>
      )
    : <Input />;
};
