async function getData() {
  const data: Promise<string> = new Promise((resolve) => {
    setTimeout(() => resolve('Hola Mundo'), 10000);
  });

  const res = await data.then((res) => res);
  return res;
}

async function Ejemplo() {
  const data = await getData();

  return <h1>{data}</h1>;
}

export default Ejemplo;
