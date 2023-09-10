import { NextResponse, NextRequest } from 'next/server';
import { ListTypesQuery } from './query';
const API = 'https://beta.pokeapi.co/graphql/v1beta';

export async function GET() {
  // let data = await fetch(API, {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     query: ListTypesQuery().query,
  //     operationName: ListTypesQuery().operationName,
  //   }),
  // })
  //   .then((res) => res.json())
  //   .then((d) => d.data.data.nodes);
  return NextResponse.json({hola:"hola mundo"});
}
