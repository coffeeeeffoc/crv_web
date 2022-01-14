import { importFile, exportFile } from '@crv/utils/src/browser/importExportExcel';
import message from '@crv/utils/src/browser/message';
import { Button } from 'antd';

export const ExcelImportExport = ({
  setData,
  importExport: {
    allowExcelImportExport,
    exportName,
    onCheckImport,
  } = {} as any,
  columns,
  dataSource,
}: any) => {
  const noOperationColumns: any[] = columns.filter(({ dataIndex }: any) => dataIndex !== 'operation');
  const noOperationColumnKeys = noOperationColumns.map(({ dataIndex }) => dataIndex);

  if (!allowExcelImportExport) {
    return null;
  }

  return (
    <>
      <Button onClick={() => {
        importFile(sheetsJson => {
          // 取第一个sheet的数据
          const arr = sheetsJson[Object.keys(sheetsJson)[0]];
          let targetArr = arr;
          // 当第一行为表头header时：(否则，第一行就是第一行数据记录)
          if (arr[0]?.every?.(key => noOperationColumns.find(({ title, dataIndex }) => [title, dataIndex].includes(key)))) {
            targetArr = arr.slice(1);
          }
          const result = targetArr.map((item: any) => noOperationColumns.reduce((res, { title, dataIndex }) => {
            res[dataIndex] = item[title] || item[dataIndex];
            return res;
          }, {}));
          setData(result);
          if (onCheckImport ? onCheckImport(result) : true) {
            message.success('导入成功');
          }
        });
      }} >导入</Button>
      <Button onClick={() => {
        const header = noOperationColumns.map(({ title, dataIndex }) => typeof title === 'string' ? title : dataIndex);
        const exportDataSource = dataSource.map((item: any) => noOperationColumnKeys.map(key => item[key]));
        exportFile({
          data: [
            header,
            ...exportDataSource
          ],
          exportName,
        });
        message.success('导出成功');
      }} >导出</Button>
    </>
  );
};
