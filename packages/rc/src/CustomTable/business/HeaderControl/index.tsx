// import { ExcelImportExport } from '../../basic';
import {
  // Dropdown,
  // Menu,
  Button,
} from 'antd';
// import { Menu } from 'antd';

export default ({
  config: {
    title = '标题',
    showHeaderControl = true,
    showHeaderFilter = true,
    showHeaderOperation = true,
    allowSelectColumns = true,
    importExport: {
      allowExcelImportExport = true,
    } = {},
  } = {},
  setData,
  columns,
  onAddRow,
  dataSource,
}: any) => {
  return (
    <div>
      {/* {title && <div>{title}</div>} */}
      {showHeaderControl && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
        }} >
          <Button type='primary' onClick={() => onAddRow()}>增加</Button>
          {/* {showHeaderOperation && <div>一系列操作</div>}
          {showHeaderFilter && <div>筛选</div>}
          <Dropdown
            trigger={['click']}
            overlay={(
              <Menu>
                {allowExcelImportExport && (
                  <Menu.Item>
                    <ExcelImportExport {...{
                      importExport: {
                        allowExcelImportExport,
                      },
                      setData,
                      columns,
                      dataSource,
                    }} />
                  </Menu.Item>
                )}
                {allowSelectColumns && (
                  <Menu.Item>
                    <div>列选择</div>
                  </Menu.Item>
                )}
              </Menu>
            )}
            >
            <Button>更多操作</Button>
          </Dropdown> */}
        </div>
      )}
    </div>
  );
};

export {};
