import LanguageTransform from '@@/LanguageTransform';
import { Button } from 'antd';

interface FieldProps {
  id: string;
  name: string;
  fieldStatement?: string;
  style?: React.CSSProperties;
};

export const Field = ({
  id,
  name,
  fieldStatement,
  style,
}: FieldProps) => {
  return (
    <Button
      block
      style={{
        // margin: '5px 0',
        textAlign: 'left',
        ...style,
      }}
      title={`${id}\n${name}\n${fieldStatement ?? ''}`}
    >
      <LanguageTransform
        lang={{
          zh: name,
          en: id,
        }}
      />
    </Button>
  );
};
