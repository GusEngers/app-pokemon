'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <section>
      <h1>Lo sentimos</h1>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Reintentar</button>
    </section>
  );
}
