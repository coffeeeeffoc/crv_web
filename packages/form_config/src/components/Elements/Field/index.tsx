import { useFieldConfig } from '@/hooks/business/useConfig';

export default ({
  field,
}: any) => {
  const fieldConfig = useFieldConfig(field);
  return (
    <span title={`${field}\n${fieldConfig?.name ?? ''}\n${fieldConfig?.fieldStatement ?? ''}`}>{fieldConfig?.name ?? field}</span>
  );
};
