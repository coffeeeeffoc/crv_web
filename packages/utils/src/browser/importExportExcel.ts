import XLSX from 'xlsx';
import { saveAs } from 'file-saver';

type importCallback = (data: multiSheetDataType) => void;

export const importFile = (callback: importCallback) => {
  const input = document.createElement('input');
  input.type = 'file';
  input.multiple = false;
  input.onchange = (e: any) => {
    const file = e.target.files?.[0] ?? {};
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const { Sheets } = workbook;
      const sheetsJson = Object.keys(Sheets).reduce((res, key) => {
        (res as any)[key] = XLSX.utils.sheet_to_json(Sheets[key], {
          defval: '',
        });
        return res;
      }, {});
      callback?.(sheetsJson);
    };
    reader.readAsBinaryString(file);
  };
  input.click();
};

type SheetCellType = string | number;
type SheetDataType = SheetCellType[][];

interface multiSheetDataType {
  [key: string]: SheetDataType;
};

interface exportFileArgs {
  exportName?: string;
  sheetName?: string;
  data: SheetDataType | multiSheetDataType;
};

export const exportFile = ({
  exportName = 'temp',
  sheetName = 'Sheet1',
  data = [[], []],
}: exportFileArgs) => {
  const workbook = {
    SheetNames: Array.isArray(data) ? [sheetName] : Object.keys(data),
    Sheets: Array.isArray(data)
      ? {
          Sheet1: XLSX.utils.aoa_to_sheet(data),
        }
      : Object.keys(data).reduce((res, key) => {
        (res as any)[key] = XLSX.utils.aoa_to_sheet(data[key]);
        return res;
      }, {})
  };
  const workbookOptions: any = { bookType: 'xlsx', bookSST: false, type: 'binary' };
  const workbookOut = XLSX.write(workbook, workbookOptions);

  function s2ab (s: any) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }

  /* the saveAs call downloads a file on the local machine */
  saveAs(new Blob([s2ab(workbookOut)], { type: '' }), `${exportName}.xlsx`);
};
