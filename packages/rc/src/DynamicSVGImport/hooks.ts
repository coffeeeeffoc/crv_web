import { useRef, useState, useEffect } from 'react';

// 参考链接：https://stackoverflow.com/a/61472427/9391729
interface UseDynamicSVGImportOptions {
  onCompleted?: (
    SvgIcon: React.FC<React.SVGProps<SVGSVGElement>> | undefined
  ) => void;
  onError?: (err: Error) => void;
}

export function useDynamicSVGImport (
  importSvg: Function,
  options: UseDynamicSVGImportOptions = {}
) {
  const ImportedIconRef = useRef<React.FC<React.SVGProps<SVGSVGElement>>>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const { onCompleted, onError } = options;
  useEffect(() => {
    setLoading(true);
    const importIcon = async (): Promise<void> => {
      try {
        // 正常版本参考链接：https://codesandbox.io/s/react-dynamic-svg-import-ts-kzx7n?fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.tsx&theme=dark
        // 因有bug，故采用下面使用方式
        // ImportedIconRef.current = (
        //   await import('@/../public/assets/icons/columnGap.svg')
        //   // await import(`${src}`)
        // ).ReactComponent;
        // 注：在此处添加!!@svgr/webpack?-svgo,+titleProp,+ref!是为了修复某个bug而添加的
        ImportedIconRef.current = (
          await importSvg()
          // await import(`!!@svgr/webpack?-svgo,+titleProp,+ref!@/../public${src}`)
          // await import('!!@svgr/webpack?-svgo,+titleProp,+ref!@/../public/assets/icons/columnGap.svg')
        ).default;
        onCompleted?.(ImportedIconRef.current);
      } catch (err: any) {
        onError?.(err);
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    importIcon();
  }, [importSvg, onCompleted, onError]);

  return { error, loading, SvgIcon: ImportedIconRef.current };
};
