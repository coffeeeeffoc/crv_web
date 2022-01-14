import {
  forwardRef,
  useState,
} from 'react';
import {
  Button,
} from 'antd';
import BasicFormTableProperties from './BasicFormTableProperties';
import { useDiffCallback } from '@rc/hooks/basic/usePrevious';
import BasicModal from '@rc/BasicModal';

export default forwardRef<any, any>(({
  value, onChange, collapseSettings, onBlur,
}, ref) => {
  const [visible, setVisible] = useState(false);
  const [val, setVal] = useState(value);
  useDiffCallback(visible, () => {
    visible && setVal(value);
  });
  return (
    <div onClick={e => e.stopPropagation()}>
      <Button block type='primary' onClick={(e) => {
        setVisible((v: any) => !v);
      }} >高级表格设置</Button>
      <BasicModal
        visible={visible}
        width={800}
        style={{
          height: 500,
        }}
        destroyOnClose
        maskClosable
        title='高级设置'
        onOk={() => {
          // 传递给表单
          onChange?.(val);
          // 此处控件没有onBlur事件，需手动调用onBlur函数，用以保存table的数据
          onBlur();
          setVisible(false);
        }}
        onCancel={() => setVisible(false)}
      >
        <BasicFormTableProperties {...{
          propertiesConfig: collapseSettings,
          value: val,
          onChange: setVal,
        }} />
      </BasicModal>
    </div>
  );
});
