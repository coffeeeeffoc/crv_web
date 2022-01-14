export interface BasicFormItemProps<T = any> {
  value: T;
  onChange: (val: T) => void;
};
