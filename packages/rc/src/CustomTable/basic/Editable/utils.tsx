export const parseEditableColumns = (columns: any[]) => columns.map((col) => {
  const { editable, dataIndex, title, onHandleSave, editControl } = col;
  return !editable
    ? col
    : {
        ...col,
        onCell: (record: any) => ({
          ...col?.onCell?.(record),
          record,
          editable,
          dataIndex,
          title,
          onHandleSave,
          editControl,
        }),
      };
});
