import { Button } from 'antd';
import { pickProps } from '@utils/browser/utils';
import Action from '@utils/browser/actions';
import { useHistory } from 'react-router-dom';
import { useContext, useMemo } from 'react';
import { ModelContext, ViewFormContext, DisplayTypeContext, InitialPageDataContext } from '@/context';
import { removeUselessField } from '@utils/browser/business/fields';
import { EnumDisplayType, EnumFieldType } from '@/types';
import { useDragDropOperation, useSelectButton } from './hooks';
import { produce } from 'immer';

enum OperationPropKeys {
  style = 'style',
  disabled = 'disabled',
  visible = 'visible',
  buttonProps = 'buttonProps',
};

interface OperationProps {
  id: string;
  // 操作按钮的序号
  index: number;
  props?: {
    [key in OperationPropKeys]: any;
  };
  operationSteps: any[];
};

// 发请求时，移除公式字段，不允许发请求
const removeFormulaFieldsFromForm = ({
  model,
  formValues,
}: any) => {
  // TODO:嵌套的形式待支持
  return produce(formValues, (draft: any) => {
    model?.fields?.filter((field: any) => field.fieldType === EnumFieldType.FORMULA)
      ?.forEach(({ id }: any) => {
        // 设置为undefined，则相当于在json中删除（因为被忽略）
        draft[id] = undefined;
      });
  });
};

export default function Operation ({
  id,
  index,
  props,
  operationSteps,
}: OperationProps) {
  const history = useHistory();
  const displayType = useContext(DisplayTypeContext);
  // 仅当展示界面，才支持点击事件
  const isView = displayType === EnumDisplayType.view;
  const isConfig = displayType === EnumDisplayType.config;
  const actionInstance = useMemo(() => new Action(), []);
  const { form } = useContext(ViewFormContext);
  const modelContext = useContext(ModelContext);
  const initialPageData = useContext(InitialPageDataContext);
  const { model, modelId } = modelContext;
  const operationDetail = model?.operations?.find((item: any) => item.id === id);
  const basicProps = pickProps(props, ['buttonProps.type', 'buttonProps.danger', 'disabled', 'style']);
  // 处理拖拽操作
  const { ref, isDragging } = useDragDropOperation({ id, index });
  // 处理按钮选中
  const { selectedStyle, onSelect } = useSelectButton({ id });
  const onClick = (e: React.SyntheticEvent) => {
    const formValues = form.getFieldsValue();
    const noFormulaFormValues = removeFormulaFieldsFromForm({
      model,
      formValues,
    });
    // 移除字段中的非必要属性
    const finalData = removeUselessField({
      ...(!initialPageData.isBatch && initialPageData.data?.[0]),
      ...noFormulaFormValues,
    });
    console.log('finalData--', noFormulaFormValues, finalData);
    // 阻止冒泡的外层的点击事件
    e.stopPropagation();
    if (isView) {
      actionInstance.run({
        actions: operationDetail?.operationSteps ?? [],
        context: {
          modelId,
          history,
          modelContext,
        },
        data: [finalData],
      });
    } else if (isConfig) {
      onSelect();
    }
  };
  return (
    <Button
      {...(!isView && {
        ref,
      })}
      title={operationDetail?.statement}
      data-id={id}
      data-index={index}
      data-model-id={modelId}
      id={`${modelId}.${id}`}
      {...basicProps}
      // 不设置的时候，默认采用primary
      type={basicProps?.type ?? 'primary'}
      style={{
        opacity: isDragging ? 0.3 : 1,
        pointerEvents: 'all',
        ...basicProps?.style,
        // 选中当前按钮（右侧需要显示按钮的属性）时的样式
        ...selectedStyle,
      }}
      onClick={onClick}
    >{operationDetail?.name}</Button>
  );
};
