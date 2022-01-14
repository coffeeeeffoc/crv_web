import LanguageTransform from '@@/LanguageTransform';
import { Button } from 'antd';

interface OperationProps {
  id: string;
  name: string;
  statement?: string;
  style?: React.CSSProperties;
};

export const Operation = ({
  id,
  name,
  statement,
  style,
}: OperationProps) => {
  return <Button
    // style={{ margin: '5px 10px' }}
    block
    style={{
      textAlign: 'left',
      ...style,
    }}
    title={`${id}\n${name}\n${statement ?? ''}`}
  >
    <LanguageTransform
      lang={{
        zh: name,
        en: id,
      }}
    />
  </Button>;
};
