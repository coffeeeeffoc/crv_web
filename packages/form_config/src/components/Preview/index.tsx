import View from '@@/View';
import { EnumDisplayType } from '@/types';

export default function FormPreview () {
  return (
    <View displayType={EnumDisplayType.preview} />
  );
};
