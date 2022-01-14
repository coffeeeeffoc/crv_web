import { Button, Popover } from 'antd';
import styles from './index.less';
import SelectModel from '@@/SelectModel';
import { post } from '@utils/browser/request';
import { useContext, useState } from 'react';
import {
  ModelContext,
  // ConfigEditTypeContext,
} from '@/context';
import { useAppSelector } from '@/redux/hooks';
import message from '@utils/browser/message';
import { pickProps } from '@utils/browser/utils';
// const requestSuffixConfig: any = {
//   edit: 'update',
//   create: 'create',
// };

export default () => {
  const [saveLoading, setSaveLoading] = useState(false);
  // const configEditType = useContext(ConfigEditTypeContext);
  const { modelId, formId, form, increaseVersion } = useContext(ModelContext);
  const areaAdditions = useAppSelector(state => state.canvas.areaAdditions);
  const layoutConfigSetting = useAppSelector(state => state.layoutConfigSetting);
  const areas = useAppSelector(state => state.canvas.areas);
  const onBack = () => {
    top?.Mainframe?.removeTabSelf();
  };
  const onSave = async () => {
    let success = true;
    setSaveLoading(true);
    await post('/crvserviceconfig/form/update', {
      model: {
        id: modelId,
        forms: [{
          ...pickProps(form, 'version name statement'.split(' ')),
          id: formId,
          config: {
            areas,
            areaAdditions,
            layoutConfigSetting: {
              additions: layoutConfigSetting.additions,
            },
          },
        }],
      },
    }).then(res => {
      success = res?.data?.status === 200;
      const fn = success ? message.success : message.error;
      const defaultMsg = `保存${success ? '成功' : '失败'}`;
      // 成功，则版本号自增
      success && increaseVersion?.();
      fn(res?.data?.message ?? defaultMsg);
    }).catch(e => {
      message.error('保存失败');
    }).finally(() => {
      setSaveLoading(false);
    });
    setTimeout(() => {
      // 保存成功，暂时不直接返回。需用户手动点击返回按钮
      // success && onBack();
    }, 0);
  };
  return (
    <div className={styles.actionButtons} >
      {/* <Button type='primary' >选择布局模板</Button>
      <Button type='primary' >保存当前布局</Button> */}
      <Popover trigger='click' content={<SelectModel/>} >
        <Button type='primary' >选择其他模型表单</Button>
      </Popover>
      <Button type='primary' loading={saveLoading} onClick={onSave} >保存</Button>
      <Button type='primary' onClick={onBack} >返回</Button>
    </div>
  );
};
