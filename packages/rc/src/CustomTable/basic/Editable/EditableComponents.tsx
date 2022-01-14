import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { Input, Form } from 'antd';
import { createPipeComponent } from '../compose';
import classNames from 'classnames';

const DefaultInput = Input;

export const EditableContext = createContext<any>(null);

export const Editable = ({
  children
}: any) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} component={false} onValuesChange={(changedValues, allValues) => {
      console.log('onHandleSave-3', changedValues, allValues);
    }} >
      <EditableContext.Provider value={form}>
        {children}
      </EditableContext.Provider>
    </Form>
  );
};

const EditableBodyRow = createPipeComponent(
  undefined,
  'tr',
  node => <Editable>{node}</Editable>
);

const EditableCell = createPipeComponent(
  ({
    title,
    editable: isEditable,
    children,
    dataIndex,
    record,
    editControl: EditControl = DefaultInput,
    customConfig,
    onHandleSave,
    usePersistentWidget,
    ...restProps
  }: any) => {
    const [editing, setEditing] = useState(false);
    const editable = typeof isEditable === 'function' ? isEditable(record[dataIndex], record) : isEditable;
    const inputRef = useRef<HTMLElement>(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      console.log('selectView--');
    }, []);
    useEffect(() => {
      if (editing) {
        inputRef.current?.focus?.();
      }
    }, [editing]);
    const toggleEdit = useCallback(() => {
      setEditing(!editing);
    }, [editing]);
    const onClickEdit = useCallback((e) => {
      toggleEdit();
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    }, [form, toggleEdit, dataIndex, record]);

    const save = useCallback(async () => {
      try {
        // getFieldsValue参数为true时返回所有字段值，参数为空时默认返回现存字段值（编辑状态时，只有当前正在编辑的字段为现存字段）
        // 不知道为啥，await form.getFieldsValue(true)这句话第一次执行获取的值不准确，后续执行获取的值更准确
        await form.getFieldsValue(true);
        const values = await form.getFieldsValue(true);
        toggleEdit();
        onHandleSave?.({
          ...record,
          ...values,
        });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    }, [form, toggleEdit, onHandleSave, record]);

    let childNode = children;
    if (editable) {
      const editControl = (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          key={dataIndex}
        >
          <EditControl {...{
            editing,
            ref: inputRef,
            record,
            dataIndex,
            onPressEnter: save,
            onBlur: save,
            form,
            customConfig: customConfig,
            className: 'wholeCell',
            // 使用持久控件，表示控件内部来维护编辑和非编辑状态
            ...(usePersistentWidget && {
              onClick: onClickEdit,
            }),
          }} />
        </Form.Item>
      );
      childNode = (usePersistentWidget || editing)
        ? editControl
        : (
            <div
              className='wholeCell'
              onClick={onClickEdit}
            >
              {editControl}
            </div>
          );
    }

    return {
      ...restProps,
      key: dataIndex,
      className: classNames({ editable }, { editing }, restProps.className),
      children: childNode,
    };
  },
  'td',
);

export const components = {
  body: {
    row: EditableBodyRow,
    cell: EditableCell,
  },
};
