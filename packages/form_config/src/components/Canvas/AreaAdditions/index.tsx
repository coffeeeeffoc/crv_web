import styles from './index.less';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { getWidgetById } from '@@/Elements/Widgets';
import { OperationBar, Field } from '@@/Elements';
import { canvasActions } from '@/redux/actions';
import { produce } from 'immer';
import { DisplayTypeContext, ViewFormContext, EditTypeContext, AreaContext } from '@/context';
import classNames from 'classnames';
import Removable from './Removable';
import { recursiveParseDynamicValue, getDynamicFields } from '@utils/browser/dynamicValue';
import { convertFieldWidgetStyle } from '@/components/LayoutConfigSetting/FieldWidgetAlign';
import { getDescendantProp } from '@utils/browser/utils';
import { useContext, useEffect, useMemo } from 'react';
import { ViewForm } from '@@/View';
import { SpaceAlignType } from '@/types/layout';
import { useForceUpdate } from '@rc/hooks/basic';
import { useFieldConfig } from '../../../hooks/business/useConfig';

const ellipsis: React.CSSProperties = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
};

const Space = (props: any) => {
  return (
    <div
      className={props.className}
      style={{
        pointerEvents: 'none',
        gap: props.gap,
        ...(props.direction === 'vertical' && {
          flexDirection: 'column',
        }),
        ...props.style,
      }}
    >
      {props.children?.map((item: any, index: number) => item && (
        <div
          key={props.childrenKeys?.[index]}
          style={{ ...props.childrenStyles?.[index] }}
        >{item}</div>
      ))}
    </div>
  );
};

enum spaceAlign {
  start = 'start',
  end = 'end',
  center = 'center',
  baseline = 'baseline',
}
enum spaceDirection {
  horizontal = 'horizontal',
  vertical = 'vertical',
}
// type Size = 'small' | 'middle' | 'large' | number;

export interface spaceProps {
  align?: spaceAlign;
  direction: spaceDirection;
  // size: Size | Size[];
  size: number;
};
export default function AreaAdditions ({
  area,
}: any) {
  const displayType = useContext(DisplayTypeContext);
  const { form, collectDependence } = useContext(ViewFormContext);
  const forceUpdate = useForceUpdate();
  const editType = useContext(EditTypeContext);
  const originalCurrentAddition = useAppSelector(state => state.canvas.areaAdditions[area.id]);
  const currentAddition = useMemo(() => {
    // 注：此处params的多个参数，就是传递给动态函数的参数；params[0]也就是第一个参数，是传递给表达式使用的参数
    return recursiveParseDynamicValue(originalCurrentAddition, {
      params: [form.getFieldsValue(), {
        editType,
      }],
    });
  }, [form, editType, originalCurrentAddition]);
  const dependencies = useMemo(() => getDynamicFields(originalCurrentAddition), [originalCurrentAddition]);
  const field = currentAddition?.field?.field;
  const fieldConfig = useFieldConfig(field);
  useEffect(() => {
    if (field) {
      collectDependence({
        field,
        forceRender: forceUpdate,
        dependencies,
        formula: currentAddition.field?.props?.formula,
        fieldConfig,
      });
    }
  }, [dependencies, collectDependence, field, forceUpdate, fieldConfig, currentAddition?.field?.props?.formula]);
  const fieldWidgetAlign = recursiveParseDynamicValue(useAppSelector(state => state.layoutConfigSetting.additions.fieldWidgetAlign));
  const fieldWidgetStyle = convertFieldWidgetStyle(fieldWidgetAlign);
  const dispatch = useAppDispatch();
  const setAreaAdditions = (payload: any) => dispatch(canvasActions.setAreaAdditions({
    id: area.id,
    ...payload,
  }));
  const spaceSetting = currentAddition?.operationBar?.props?.space;
  const spaceSettingProps = spaceSetting
    ? Object.keys(spaceSetting).reduce((res: any, k) => {
      if (spaceSetting[k] !== undefined) {
        res[k] = spaceSetting[k];
      }
      return res;
    }, {})
    : {};
  return (
    currentAddition
      ? (
          <AreaContext.Provider value={area} >
            <div
              className={classNames(styles.additions, displayType)}
            >
              <Space
                {...fieldWidgetStyle.SpaceProps}
                {...spaceSettingProps}
                style={{
                  ...(fieldWidgetStyle.SpaceProps.direction === SpaceAlignType.vertical && currentAddition.field && {
                    height: '100%',
                  }),
                  ...spaceSettingProps.style,
                }}
                className={styles.wrapper}
                childrenStyles={[
                  {
                    ...fieldWidgetStyle.SpaceItemStyle?.[0],
                    ...(fieldWidgetStyle.SpaceProps.direction === SpaceAlignType.vertical && currentAddition.field && {
                      height: 30,
                    }),
                  },
                  {
                    pointerEvents: 'all',
                    ...fieldWidgetStyle.SpaceItemStyle?.[1],
                    ...(fieldWidgetStyle.SpaceProps.direction === SpaceAlignType.vertical && currentAddition.field && {
                      // height: 32,
                    }),
                  },
                  { width: '100%' }
                ]}
                childrenKeys={['field', 'widget', 'operationBar']}
              >
                {currentAddition.field && (
                  <label style={{
                    pointerEvents: 'all',
                    display: 'inline-block',
                    width: '100%',
                    ...ellipsis,
                    ...currentAddition.field?.props?.style,
                  }} ><Field field={currentAddition.field?.field} />:</label>
                )}
                {currentAddition.widget && (
                  <div>
                    <ViewForm.Item
                      name={currentAddition.field?.field}
                    >
                      {(() => {
                        const Control = getWidgetById(currentAddition.widget.id);
                        return Control
                          ? <Control
                              form={form}
                              widgetDetail={currentAddition.widget}
                              field={currentAddition.field?.field}
                              style={{
                                pointerEvents: 'all',
                              }}
                            />
                          : null;
                      })()}
                    </ViewForm.Item>
                  </div>
                )}
                {currentAddition.operationBar && (
                  <OperationBar
                    {...currentAddition.operationBar}
                    // {...((displayType === EnumDisplayType.config) && {
                    {...({
                      renderOperations: (operations: any[], operationControls: any[]) => (
                        <Space
                          className={styles.wrapper}
                          style={{
                            ...getDescendantProp(currentAddition?.operationBar, 'props.space', { finalResult: true }),
                          }}
                          childrenKeys={operations.map(item => item.id)}
                        >
                          {operationControls.map((operation, index) => (
                            <Removable
                              key={operation.key}
                              onRemove={() => {
                                setAreaAdditions({
                                  key: 'operationBar',
                                  value: {
                                    ...currentAddition.operationBar,
                                    operations: produce(operations, draft => { draft.splice(index, 1); }),
                                  },
                                });
                              }}
                            >
                              {operation}
                            </Removable>
                          ))}
                        </Space>
                      )
                    })}
                  />
                )}
              </Space>
            </div>
          </AreaContext.Provider>
        )
      : null
  );
};
