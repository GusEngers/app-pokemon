async function getData() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api`);
throw new Error("asdasda")
  return data.json();
}

async function Ejemplo() {
  const data = await getData();
  console.log(data);
  return (
    <div>
      <h1>holada</h1>
    </div>
  );
}

export default Ejemplo;
