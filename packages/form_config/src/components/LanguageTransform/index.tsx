import { languageTransform } from '@utils/browser/languages';
import { useAppSelector } from '@/redux/hooks';

export default ({
  lang,
}: any) => {
  const language = useAppSelector(state => state.layoutConfigSetting.language);
  return languageTransform(lang, language);
};
