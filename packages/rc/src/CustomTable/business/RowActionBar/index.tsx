import { Menu } from 'antd';
import Action from '@crv/utils/src/browser/actions';
import DropdownCom from './Dropdown';
import { useMemo } from 'react';

export * from './utils';

export interface RowActionBarProps {
  record: any;
  operations: any;
  context: any;
  showCount: number;
};

// 对视图操作配置和模型操作配置进行转换
export const convertOperationsConfig = (viewOperations: any[], operations: any[]) => {
  return viewOperations.map(({ operationIds, ...item }) => ({
    ...item,
    operations: operationIds.map(({ id, name, displayName }: any) => {
      const targetOperation = operations.find(item => item.id === id);
      const showName = displayName || name;
      return {
        ...targetOperation,
        ...(showName && {
          name: showName,
        }),
      };
    })
  }));
};

export const RowActions = ({
  record,
  operations,
  showCount,
  context,
}: RowActionBarProps) => {
  const actionInstance = useMemo(() => new Action(), []);

  const operationClick = (operationSteps: any) => {
    actionInstance.run({
      actions: operationSteps ?? [],
      context,
      data: [{ id: record.id }]
    });
  };
  const createElement = ({ id, name, statement, operationSteps }: any, Element: any) => {
    return (
      <Element {...{
        title: statement,
        key: id,
        id: `${id}.${record.id}`,
        onClick: () => operationClick(operationSteps),
        children: name,
      }} />
    );
  };
  const createOperations = (operations: any[]) => {
    return operations.map(({ operations, type, name }, index) => {
      if (type === 'SINGLE') {
        return operations.map((item: any) => createElement(item, 'a'));
      } else {
        const comboMenus = (
          <Menu forceSubMenuRender>
            {operations.map((item: any) => createElement(item, Menu.Item))}
          </Menu>
        );
        return (
          <DropdownCom
            comboMenus={comboMenus}
            id={`BUTTON_${index}_${record.id}`}
            key={`BUTTON_${index}_${record.id}`}
            textName={name}
          />
        );
      }
    });
  };
  const createMoreOperations = (operations: any[]) => {
    return (
      <Menu>
        {operations?.map(({ operations }: any, index, arr) => (
          <>
            {operations.map((item: any) => createElement(item, Menu.Item))}
            {operations.length && index < arr.length - 1 && <Menu.Divider key={`Menu.Divider_${index}`} />}
          </>
        ))}
      </Menu>
    );
  };
  return (
    <>
      {
        createOperations(operations.slice(0, showCount))
      }
      {
        operations.length > showCount && (
          <DropdownCom comboMenus={createMoreOperations(operations.slice(showCount))} id='MORE' key='MORE' textName='More'/>
        )
      }
    </>
  );
};
