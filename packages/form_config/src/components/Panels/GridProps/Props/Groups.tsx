import type { GroupsProps } from './generateGroups';
import { generateGroups } from './generateGroups';
import styles from './Groups.less';
import BasicPanel from '@@/Panels/BasicPanel';

export default ({
  isGridNull,
  fieldsValue,
  setFieldsValue,
}: GroupsProps) => {
  const groups: any[] = generateGroups({
    isGridNull,
    fieldsValue,
    setFieldsValue,
  });
  return (
    <BasicPanel groups={groups} className={styles.groups} />
  );
};
