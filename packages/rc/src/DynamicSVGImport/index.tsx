import { useDynamicSVGImport } from './hooks';
import styles from './index.less';

interface DynamicSVGImportProps {
  // 导入svg路径
  importSvg: Function;
  // svg属性
  svgProps?: any;
};

export default function DynamicSVGImport ({
  importSvg,
  svgProps,
}: DynamicSVGImportProps) {
  // 加载前显示的loading
  const { loading, error, SvgIcon } = useDynamicSVGImport(importSvg);
  return loading
    ? (
        <span className={styles.loading}>
          <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2315" width="200" height="200"><path d="M980.752 313.697c-25.789-60.972-62.702-115.725-109.713-162.736-47.012-47.011-101.764-83.924-162.736-109.713C645.161 14.542 578.106 1 509 1c-2.242 0-4.48 0.015-6.715 0.043-16.567 0.211-29.826 13.812-29.615 30.38 0.209 16.438 13.599 29.618 29.99 29.618l0.39-0.002c1.98-0.026 3.963-0.039 5.95-0.039 61.033 0 120.224 11.947 175.93 35.508 53.82 22.764 102.162 55.359 143.683 96.879s74.115 89.862 96.88 143.683C949.054 392.776 961 451.967 961 513c0 16.568 13.432 30 30 30s30-13.432 30-30c0-69.106-13.541-136.162-40.248-199.303z" p-id="2316"></path></svg>
        </span>
      )
    : (!error && SvgIcon) ? <SvgIcon {...svgProps} /> : null;
};
