import { Suspense } from 'react';
import Loading from '@rc/Loading';

export default ({
  children,
  useLoading,
}: any) => (
  <Suspense fallback={useLoading ? <Loading /> : null} >
    {children}
  </Suspense>
);
