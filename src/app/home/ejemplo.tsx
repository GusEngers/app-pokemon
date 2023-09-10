async function getData() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api`);

  return data.json();
}

async function Ejemplo() {
  const data = await getData();

  return (
  <div>
    <h1>holada</h1>
  </div>)
}

export default Ejemplo;
