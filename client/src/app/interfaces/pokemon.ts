export interface IType {
  _id: string;
  name: string;
}

export interface IGeneration {
  _id: string;
  generation: string;
  region: string;
  description: string;
}

export interface IPokemon {
  pokedex_id: string;
  name: string;
  image: string;
  attack: number;
  defense: number;
  types: IType[];
  generation: IGeneration[];
  original: boolean;
}

export type ListPokemon = {
  count: number;
  pokemons: IPokemon[];
};
