import BasicTable from '../basic';
import { defaultBusinessConfig, mergeBusinessConfig } from './config';
import HeaderControl from './HeaderControl';

export * from './config';
export * from './types';
export * from './HeaderControl';
export * from './RowActionBar';

export default ({
  customConfig,
  ...props
}: any) => {
  const config = mergeBusinessConfig(customConfig, defaultBusinessConfig);
  return (
    <BasicTable {...{
      ...props,
      customConfig,
      convertProps: (prop: any) => ({
        ...prop,
        ...(config.showHeaderControl && {
          title: () => (
            <HeaderControl {...{
              ...props,
              config,
            }} />
          )
        }),
      }),
    }} />
  );
};
