import PropItem, { isMinMax } from './PropItem';
import { unitsInitValue, noValueUnit, minMaxUnit, DEFAULT_MIN_MAX_VALUE } from './generateGroups';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { capitalize } from '@utils/browser/string';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { canvasActions } from '@/redux/actions';
import { replaceTheArea, getAreaById } from '@/utils/area';
import { validGridUnits, minMaxUnits } from '@/utils/units';

const DEFAULT_ITEM = '1fr';

interface GridTemplateProps {
  type: 'col' | 'row';
  // 默认添加项
  defaultItem?: string;
};

export default function GridTemplate ({
  type,
  defaultItem = DEFAULT_ITEM,
}: GridTemplateProps) {
  const currentAreaId = useAppSelector(state => state.canvas.currentAreaId);
  const areas = useAppSelector(state => state.canvas.areas);
  const currentArea = getAreaById(areas, currentAreaId);
  const area = currentArea ?? areas;
  const dispatch = useAppDispatch();
  const items: string[] = area.grid?.[type].sizes ?? [];
  const setValue = (newItems: string[]) => {
    const newArea = {
      ...area,
      grid: {
        ...area.grid,
        [type]: {
          ...area.grid?.[type],
          sizes: newItems,
        },
      },
    };
    dispatch(canvasActions.setMultiState({
      areas: replaceTheArea(areas, newArea),
      currentAreaId: newArea.id,
    }));
  };
  const onAdd = () => {
    setValue(items.concat(defaultItem));
  };
  const onDelete = (index: any) => {
    setValue(items.filter((item, idx) => idx !== index));
  };
  return (
    <PropItem
      field={`gridTemplate${capitalize(type)}`}
      itemLabel={`gridTemplate${capitalize(type)}`}
      customContent={(label, value, unit) => (
        <>
          {label}
          <div style={{ gridColumn: 'value / -1', justifySelf: 'center' }}>
            <Button size='small' type='primary' onClick={onAdd} >
              <PlusOutlined/>
            </Button>
          </div>
          {items.map((item, index) => (
            <PropItem
              key={index}
              value={item}
              field={String(index)}
              units={validGridUnits}
              minmaxUnit={minMaxUnits}
              inputDisabledFn={(val: any, unit: any, fieldsValue: any) => {
                return noValueUnit.includes(unit) || isMinMax(unit) || unit === 'minmax';
              }}
              initValue={unitsInitValue}
              formatValue={({ val, unit }: any) =>
                noValueUnit.includes(unit) ? unit : minMaxUnit.includes(unit) ? DEFAULT_MIN_MAX_VALUE : `${val}${unit}`
              }
              setFieldsValue={(obj: Object) => {
                setValue(items.map((item, idx) => idx === index ? (obj as any)[index] : item));
              }}
              customContent={(label, value, unit) => (
                <>
                  <div style={{ gridColumn: 'heading / heading', justifySelf: 'center' }}>
                    <Button size='small' type='primary' onClick={() => onDelete(index)} >
                      <DeleteOutlined />
                    </Button>
                  </div>
                  {value}
                  {unit}
                </>
              )}
            />
          ))}
        </>
      )}
    />
  );
};
