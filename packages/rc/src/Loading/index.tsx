import { Spin, SpinProps } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const indicatorsConfig: any = {
  LoadingOutlined: <LoadingOutlined style={{ fontSize: 24 }} spin />,
};

interface LoadingProps {
  size?: Pick<SpinProps, 'size'>['size'];
  indicatorType?: string;
};

export default ({
  size = 'large',
  indicatorType,
}: LoadingProps) => {
  const indicator = indicatorType && indicatorsConfig[indicatorType];
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spin {...{
        size,
        ...(indicator && {
          indicator,
        }),
      }} />
    </div>
  );
};
