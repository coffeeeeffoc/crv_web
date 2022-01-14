import {
  Switch,
  SwitchProps,
} from 'antd';

interface SwitchInFormProps extends SwitchProps {
  value?: boolean;
};

export default function SwitchInForm ({
  checkedChildren,
  unCheckedChildren,
  value,
  onChange,
  ...rest
}: SwitchInFormProps) {
  return (
    <Switch {...{
      checkedChildren,
      unCheckedChildren,
      checked: value,
      onChange,
      ...rest,
    }} />
  );
}
