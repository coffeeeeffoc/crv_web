
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { canvasActions } from '@/redux/actions';
import { useDrop } from 'react-dnd';
import { useMemo, useContext, useCallback } from 'react';
import { checkNoConflict } from '@@/Panels/DragControl';
import type { dragType } from '@@/Panels/DragControl';
import { generateStringId } from '@utils/browser/generateId';
import { exchangeAreaAdditions, createNewArea } from '@@/Canvas/GridCell';
import {
  getAreaById,
} from '@/utils/area';
import { produce } from 'immer';
import { batch } from 'react-redux';
import { message } from '@utils/browser/message';
import { defaultOperationBarProps } from '@@/Panels/PropertyDetail/properties/OperationBar';
import { ModelContext } from '@/context';
import { getDefaultWidgetByFieldType } from '@@/Elements/Widgets';
import { areaExchangeType } from '@@/Canvas/AreaInfo';
import { uselessFields, supportFieldTypes } from '@utils/browser/business/fields';

export const useDropControls = ({
  area,
  implicitGrid,
  setMultiState,
  setArea,
  // explicitDropArea是在AreaInfo组件中，明确放置目标区域的位置
  explicitDropArea,
}: any) => {
  const dispatch = useAppDispatch();
  const areas = useAppSelector(state => state.canvas.areas);
  const setAreaAdditions = (v: any) => dispatch(canvasActions.setAreaAdditions(v));
  const { model } = useContext(ModelContext);
  // 根据字段获取该字段的配置信息
  const getFieldConfig = useCallback((field: string) =>
    model?.fields?.find((item: any) => item.id === field),
  [model?.fields]
  );

  const areaAdditions = useAppSelector(state => state.canvas.areaAdditions);
  // 检查字段是否重复
  const checkFieldConflict = useCallback((field: string) => {
    const res = Object.values(areaAdditions).some((item: any) => item.field?.field === field);
    if (res) {
      const fieldName = getFieldConfig(field)?.name;
      message.warning(`已存在相同字段：\${${field}}[${fieldName}]`);
      return false;
    }
    return true;
  }, [areaAdditions, getFieldConfig]);
  const dropActiveAreaRedux = useAppSelector(state => state.canvas.dropActiveArea);
  const dropActiveArea = explicitDropArea || dropActiveAreaRedux;
  const currentAddition = useMemo(
    () => dropActiveArea && typeof dropActiveArea.id === 'string' && areaAdditions[dropActiveArea.id],
    [areaAdditions, dropActiveArea]
  );
  // 已经被拖拽入当前单元格的类型
  const existType = useMemo(
    () => currentAddition ? Object.keys(currentAddition) : [],
    [currentAddition]
  ) as dragType[];
  const [{ dropActive }, drop] = useDrop(() => ({
    accept: ['field', 'widget', 'operation', 'operationBar', areaExchangeType],
    drop: (item: any, monitor) => {
      // 如果已经放置，则不再执行放置动作
      if (monitor.didDrop()) {
        return;
      }
      if (item.type === 'field') {
        const checkResult = checkFieldConflict(item.field);
        if (!checkResult) {
          return;
        }
      }
      if (dropActiveArea) {
        const needCreateArea = typeof dropActiveArea.id === 'object';
        let value: any; // 存入redux中的值
        let key = item.type; // 放置内容的类型
        let extraFn: Function; // 额外的操作
        switch (item.type) {
          case 'operationBar':
            value = {
              id: generateStringId(),
              props: defaultOperationBarProps,
            };
            break;
          case 'operation':
            key = 'operationBar';
            if (currentAddition?.operationBar?.operations?.findIndex((i: any) => i.id === item.operation.id) > -1) {
              // eslint-disable-next-line @typescript-eslint/no-floating-promises
              message.warning('已存在相同的操作');
              return;
            }
            value = {
              ...(currentAddition?.operationBar ?? {
                id: generateStringId(),
                props: defaultOperationBarProps,
              }),
              operations: [...(currentAddition?.operationBar?.operations ?? []), { id: item.operation.id }],
            };
            break;
          case 'field': {
            const { fieldType } = getFieldConfig(item.field);
            value = {
              field: item.field,
            };
            // 提示部分字段暂时不支持表单配置，但
            if (uselessFields.includes(item.field)) {
              message.warning(`字段:[${item.field}]暂不支持在表单中展示。`);
              return;
            }
            if (!supportFieldTypes.includes(fieldType)) {
              message.warning(`字段类型:[${fieldType}]暂不支持，暂时用TEXT类型控件显示之。`);
            }
            if (!currentAddition?.widget) {
              extraFn = (id: any) => {
                setMultiState({
                  selectionArea: null,
                });
                setAreaAdditions({
                  id: id,
                  key: 'widget',
                  value: {
                    id: getDefaultWidgetByFieldType(getFieldConfig(item.field)?.fieldType),
                  },
                });
              };
            }
            break;
          }
          case 'widget':
            value = {
              id: item.id,
            };
            break;
          case areaExchangeType:
            {
              const areaId = item.areaId;
              // // 当已有子区域时不处理，会在AreaAdditions组件中onDrop处理
              if (!needCreateArea) {
                setMultiState({
                  selectionArea: null,
                  areaAdditions: exchangeAreaAdditions({
                    areaAdditions,
                    sourceId: areaId,
                    targetId: dropActiveArea.id,
                  }),
                });
              } else {
                const newDropActiveArea = createNewArea({
                  id: dropActiveArea.id,
                  area,
                  implicitGrid,
                });
                const newAreaAdditions = exchangeAreaAdditions({
                  areaAdditions,
                  sourceId: areaId,
                  targetId: newDropActiveArea.id,
                });
                const newAreas = produce(areas, draft => {
                  const newArea = getAreaById(draft, area.id);
                  const childIndex = newArea.children.findIndex(({ id }: any) => id === areaId);
                  if (childIndex > -1) {
                    newArea.children.splice(childIndex, 1);
                  }
                  newArea.children.push(newDropActiveArea);
                });
                // 把所拖拽区域的内容放置到新区域，并把原区域删除
                setMultiState({
                  selectionArea: null,
                  areaAdditions: newAreaAdditions,
                  areas: newAreas,
                });
              }
              return;
            };
          default:
            value = null;
            break;
        }
        batch(() => {
          const { id } = dropActiveArea;
          let newDropActiveArea = dropActiveArea;
          if (typeof id === 'object') {
            const newArea = createNewArea({
              id,
              area,
              implicitGrid,
            });
            newDropActiveArea = newArea;
            // 拖拽放置添加新的
            setArea(newArea);
          }
          setAreaAdditions({
            id: newDropActiveArea.id,
            key,
            value,
          });
          extraFn?.(newDropActiveArea.id);
        });
      }
    },
    canDrop: (item, monitor) => {
      return checkNoConflict(item.type, existType);
      // return area?.id !== dropActiveArea?.id && checkNoConflict(item.type, existType);
    },
    collect: (monitor) => ({
      dropActive: monitor.isOver(),
    }),
    // VIP：此处非常重要,useDrop的第二个参数一定要精确到每一个使用的变量，否则拖拽过程中会发生莫名其妙的异常
  }), [dropActiveArea, area, existType, currentAddition, checkFieldConflict, getFieldConfig, areaAdditions, areas]);

  return {
    drop,
    dropActive,
  };
};
