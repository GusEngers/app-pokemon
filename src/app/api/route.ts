import { NextResponse, NextRequest } from 'next/server';
const API = 'https://beta.pokeapi.co/graphql/v1beta';

const query = `
query ListTypes {
  data: pokemon_v2_type_aggregate {
    nodes {
      name
      id
    }
  }
}`;

export async function GET() {
  let data = await fetch(API, {
    method: 'POST',
    body: JSON.stringify({
      query: query,
      operationName: 'ListTypes',
    }),
  })
    .then((res) => res.json())
    .then((d) => d.data.data.nodes);
  return NextResponse.json(data);
}
