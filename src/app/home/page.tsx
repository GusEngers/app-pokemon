import { Suspense } from 'react';
import Loading from './loading';
import Ejemplo from './ejemplo';

export default function Page() {
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <Ejemplo />
      </Suspense>
    </main>
  );
}