export const ListQuery = () => ({
  operationName: 'ListPokemons',
  query: `
  query ListPokemons {
    pokemons: pokemon_v2_pokemon {
      id
      name
      base_experience
      height
      weight
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          name
          id
        }
      }
      stats: pokemon_v2_pokemonstats {
        stat: pokemon_v2_stat {
          name
        }
        base_stat
      }
      sprites: pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`,
});

export const ListByTypeQuery = (id: number) => ({
  operationName: 'ListPokemonsByType',
  query: `
  query ListPokemonsByType {
    pokemons: pokemon_v2_pokemon(where: {pokemon_v2_pokemontypes: {type_id: {_eq: ${id}}}}) {
      id
      name
      base_experience
      height
      weight
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          name
          id
        }
      }
      stats: pokemon_v2_pokemonstats {
        stat: pokemon_v2_stat {
          name
        }
        base_stat
      }
      sprites: pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`,
});

export const ListByNameQuery = (name: string) => ({
  operationName: 'ListPokemonsByName',
  query: `
  query ListPokemonsByName {
    pokemons: pokemon_v2_pokemon(where: {name: {_regex: ${name}}}) 
      id
      name
      base_experience
      height
      weight
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          name
          id
        }
      }
      stats: pokemon_v2_pokemonstats {
        stat: pokemon_v2_stat {
          name
        }
        base_stat
      }
      sprites: pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`,
});

export const ListTypesQuery = () => ({
  operationName: 'ListTypes',
  query: `
  query ListTypes {
    data: pokemon_v2_type_aggregate {
      nodes {
        name
        id
      }
    }
  }
`,
});
