/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { useMemo, useContext, useState, useRef, useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { gridAreaStyles, getDisplayStyles } from '@/utils/area';
import { findImplicitGrid, explicitGridAreaToGridRegion } from '@/utils/grid';
import AreaAdditions from '@@/Canvas/AreaAdditions';
import { DisplayTypeContext, ModelContext } from '@/context';
import { EnumDisplayType, EnumEditType } from '@/types';
import { Card, Input } from 'antd';
import styles from './index.less';
import ViewForm from './ViewForm';

const Area = ({
  area,
  gridArea,
}: any) => {
  const areas = useAppSelector(state => state.canvas.areas);
  // const currentAddition = areaAdditions[area.id];
  const explicitAreas = useMemo(() => {
    if (area.display === 'grid') {
      return findImplicitGrid(area);
    } else {
      return { gridAreas: [], implicitGrid: {} };
    }
  }, [area]);
  const implicitGrid = useMemo(() => explicitAreas.implicitGrid, [explicitAreas]);
  const areasToShow: any[] = area.children;
  const gridRegions = useMemo(() => explicitAreas.gridAreas.map(explicitGridAreaToGridRegion), [explicitAreas]);
  return (
    <section
      style={{
        width: '100%',
        // height: '100%',
        overflow: 'hidden',
        ...gridAreaStyles(area, gridArea, areas),
        ...getDisplayStyles(area),
      }}
    >
      {
        areasToShow.length > 0
          ? areasToShow.map((a, index) => (
            <Area key={`area-${a.id}`} {...{
              zIndex: ('cols' in implicitGrid) && ((gridRegions[index].row.start - 1) * implicitGrid.cols + gridRegions[index].col.start),
              area: a,
              gridArea: explicitAreas.gridAreas[index],
            }} />
          ))
          : <AreaAdditions area={area} />
    }
    </section>
  );
};

interface ViewProps {
  displayType: EnumDisplayType;
  title?: React.ReactNode;
};
interface ViewWrapperProps extends ViewProps {
  children: React.ReactNode;
};

const editTypeTitleConfig: {
  [key in EnumEditType]: string;
} = {
  list: '列表',
  create: '创建',
  edit: '编辑',
  detail: '详情',
  batch: '批量',
  copy: '复制',
};

const EditableInput = ({
  Comp = 'span',
  editable,
  onChange,
  children,
  style,
}: any) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<Input>(null);
  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);
  return (
    (editable && editing)
      ? <Input
          size='small'
          ref={inputRef}
          defaultValue={children}
          style={{
            ...style,
            width: 'auto',
          }}
          onChange={e => {
            onChange?.(e.target.value);
          }}
          onBlur={e => {
            setEditing(false);
          }}
        />
      : <Comp
          onClick={() => {
            setEditing(true);
          }}
          style={{
            ...style,
            display: 'inline-block',
            ...(editable && !children && {
              minWidth: 150,
              content: '请输入所修改的表单名',
            }),
            height: 21,
          }}
        >{children}</Comp>
  );
};

const FormCardTitle = ({
  displayType,
}: any) => {
  const { form, editType, onModelFormChange } = useContext(ModelContext);
  const isConfig = displayType === EnumDisplayType.config;
  return (
    <span
      style={{
        display: 'flex',
      }}
    >
      <EditableInput
        editable={isConfig}
        onChange={(val: any) => onModelFormChange?.({ name: val })}
      >{form?.name}</EditableInput>
      &nbsp;/&nbsp;
      <EditableInput
        editable={isConfig}
        onChange={(val: any) => onModelFormChange?.({ statement: val })}
        style={{
          flex: 'auto',
        }}
      >{isConfig ? form?.statement : editTypeTitleConfig[editType]}</EditableInput>
    </span>
  );
};

export const ViewContainer = ({
  displayType,
  children,
}: ViewWrapperProps) => {
  return (
    <DisplayTypeContext.Provider value={displayType} >
      <Card
        bordered={false}
        title={<FormCardTitle displayType={displayType} />}
        className={styles.formCard}
      >
        <ViewForm>
          {children}
        </ViewForm>
      </Card>
    </DisplayTypeContext.Provider>
  );
};

export default function View ({
  displayType,
  title,
}: ViewProps) {
  const areas = useAppSelector(state => state.canvas.areas);
  return (
    <ViewContainer {...{
      displayType,
      title,
    }} >
      <Area
        area={areas}
      />
    </ViewContainer>
  );
};

export { ViewForm };
