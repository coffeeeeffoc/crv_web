import {
  forwardRef,
  useState,
  useContext,
  useEffect,
} from 'react';
import {
  Button,
} from 'antd';
import DraggableTransfer from '@rc/DraggableTransfer';
import BasicModal from '@rc/BasicModal';
import { BasicFormTablePropertiesContext } from '.';
import { ModelContext } from '@/context';
import Loading from '@rc/Loading';
import { useFetchViewConfig } from '@rc/RefWidget/hooks';

const useViewConfig = () => {
  const { modelId, model } = useContext(ModelContext);
  const { configState, setPartialConfigState } = useContext(BasicFormTablePropertiesContext);
  const { isLoading, data: viewConfig } = useFetchViewConfig({ modelId, viewId: configState?.viewId });
  useEffect(() => {
    model && setPartialConfigState?.({ model });
  }, [setPartialConfigState, model]);
  useEffect(() => {
    viewConfig && setPartialConfigState?.({ viewConfig });
  }, [setPartialConfigState, viewConfig]);
  return {
    isLoading,
    model,
    viewConfig,
  };
};

export default forwardRef<any, any>(({
  value, onChange,
}, ref) => {
  const [visible, setVisible] = useState(false);
  const [val, setVal] = useState(value);
  const { isLoading, model, viewConfig } = useViewConfig();
  // TODO:此处处理viewConfig,并映射转换为真正的数据格式
  console.log('点击选择并设置字段', viewConfig, model);
  return (
    <div onClick={e => e.stopPropagation()}>
      <Button block type='primary' onClick={(e) => {
        setVisible((v: any) => !v);
      }} >字段设置</Button>
      <BasicModal
        visible={visible}
        width={800}
        style={{
          height: 500,
        }}
        maskClosable
        title='选择字段'
        onOk={() => {
          onChange?.(val);
          setVisible(false);
        }}
        onCancel={() => setVisible(false)}
      >
        {isLoading
          ? <Loading/>
          : (
              <DraggableTransfer {...{
                titles: ['待选择列', '已选择列'],
                value: val,
                onChange: setVal,
                formatName: (record: any) => `${record.name ?? ''}(${record.key ?? ''})`,
                formatTitle: (record: any) => `${record.name ?? ''}(${record.key ?? ''})`,
                dataSource: model?.fields?.map?.((item: any) => ({ ...item, key: item.id })) ?? [
                  { key: 1, name: 1 },
                  { key: 2, name: 2 },
                  { key: 3, name: 3 },
                  { key: 4, name: 4 },
                ],
              }} />
            )
        }
      </BasicModal>
    </div>
  );
});
