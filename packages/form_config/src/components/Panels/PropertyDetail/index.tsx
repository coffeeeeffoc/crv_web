import config from './config';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { canvasActions } from '@/redux/actions';
import { Collapse } from 'antd';
import styles from './index.less';
import { getAreaById } from '@/utils/area';
import { getCurrentAdditionByOperationId } from '@/utils/areaAdditions';

const { Panel } = Collapse;

export default function PropertyDetail () {
  const currentAreaId = useAppSelector(state => state.canvas.currentAreaId);
  const currentOperationId = useAppSelector(state => state.canvas.currentOperationId);
  const dispatch = useAppDispatch();
  const areas = useAppSelector(state => state.canvas.areas);
  const area = getAreaById(areas, currentAreaId) ?? areas;
  const areaAdditions: any = useAppSelector(state => state.canvas.areaAdditions);
  const currentAddition: any = areaAdditions[area.id];
  const types = currentAddition
    ? Object.keys(currentAddition) // 当选中的是一个区域时，显示该区域内字段、控件、操作行（包括操作行和内部包含的所有操作）等属性
    : currentOperationId
      ? ['operation'] // 当选中的是一个操作，且没选中区域（也就是currentAreaId为空，等价于currentAddition为空）时，显示所选操作的属性
      : []; // 默认不显示属性

  const key = `${area.id}_${types.join('-')}`;
  return (
    <Collapse key={key} defaultActiveKey={types} className={styles.propertyDetail} >
      {
        types.map(type => {
          const [panelName = '', Component] = config[type] ?? [];
          const isOnlyOperationProps = type === 'operation';
          const { areaId, currentAddition: currentAdditionOperation } = getCurrentAdditionByOperationId(areaAdditions, currentOperationId);
          return (
            <Panel
              key={type}
              header={panelName}
            >
              <Component
                {
                ...(
                  isOnlyOperationProps
                    // 针对单个操作的属性的设置
                    ? {
                        key: currentOperationId,
                        value: currentAdditionOperation?.operationBar?.operations?.find(({ id }: any) => id === currentOperationId)?.props,
                        onChangeProps: (val: any) => {
                          dispatch(canvasActions.setAreaAdditions({
                            id: areaId,
                            key: 'operationBar',
                            value: {
                              ...currentAdditionOperation.operationBar,
                              operations: currentAdditionOperation.operationBar?.operations?.map((operation: any) => {
                                if (operation.id === currentOperationId) {
                                  return {
                                    ...operation,
                                    props: val,
                                  };
                                }
                                return operation;
                              }) ?? [],
                            },
                          }));
                        },
                      }
                    // 默认处理currentAddition的某个类型(field,widget)的props
                    : {
                        key: type,
                        ...currentAddition[type],
                        value: currentAddition[type].props,
                        onChangeAddition: (val: any) => {
                          dispatch(canvasActions.setAreaAdditions({
                            id: area.id,
                            key: type,
                            value: {
                              ...currentAddition.operationBar,
                              ...val,
                            },
                          }));
                        },
                        onChangeProps: (val: any) => {
                          dispatch(canvasActions.setAreaAdditionProps({
                            id: area.id,
                            key: type,
                            props: val,
                          }));
                        },
                      }
                )}
              />
            </Panel>
          );
        })
      }
    </Collapse>
  );
};
