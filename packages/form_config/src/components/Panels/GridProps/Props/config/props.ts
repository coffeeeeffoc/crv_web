import {
  AllPropKeys,
} from './constant';
import type {
  LanguageType,
  Language,
} from '@utils/browser/languages';

interface containerCss {
  'display': 'grid' | 'inline-grid';
  'grid'?: string;
  'grid-template-columns'?: string;
  'grid-template-rows'?: string;
  'grid-auto-flow'?: string;
  'grid-gap': string;
  'justify-items': string;
  'justify-content': string;
  'align-items': string;
  'align-content': string;
  'rows': string;
};
interface itemCss {
  xxx?: string;
// TODO: to list all item css.
};
export interface Css {
  container: containerCss;
  item?: itemCss;
}
type onPropsChange = (
  val: string | number,
  values: {[key in AllPropKeys]: any},
  css: Css,
) => void;;
interface GroupItemValueBasicProps {
  disable?: (val: string | number, values: {[key in AllPropKeys]: any}) => boolean;
  onFocus?: () => void;
  onChange: onPropsChange;
};
export interface GroupItemValueInputProps extends GroupItemValueBasicProps {
  type: 'input';
};
export interface GroupItemValueInputNumberProps extends GroupItemValueBasicProps {
  type: 'inputNumber';
};

type GroupItemValueOptionProps = string | {
  icon?: string;
  name: string;
};
export interface GroupItemValueSelectProps extends GroupItemValueBasicProps {
  type: 'select';
  options: GroupItemValueOptionProps[];
};

export type GroupItemValueProps = GroupItemValueInputProps | GroupItemValueInputNumberProps | GroupItemValueSelectProps;

export interface GroupItemProps {
  icon?: string;
  itemLabel: LanguageType;
  id: string;
  value: GroupItemValueProps | GroupItemValueProps[];
};

export interface GroupProps {
  id?: string;
  groupTitle?: Language;
  group: GroupItemProps[];
};
