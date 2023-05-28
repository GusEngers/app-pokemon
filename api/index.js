const axios = require("axios")
const fs = require("fs")
const TIPOS = {
  normal: '6472b2bc3d418c0a288c4117',
  fighting: '6472b2bc3d418c0a288c4118',
  flying: '6472b2bc3d418c0a288c4119',
  poison: '6472b2bc3d418c0a288c411a',
  ground: '6472b2bc3d418c0a288c411b',
  rock: '6472b2bc3d418c0a288c411c',
  bug: '6472b2bc3d418c0a288c411d',
  ghost: '6472b2bc3d418c0a288c411e',
  steel: '6472b2bc3d418c0a288c411f',
  fire: '6472b2bc3d418c0a288c4120',
  water: '6472b2bc3d418c0a288c4121',
  grass: '6472b2bc3d418c0a288c4122',
  electric: '6472b2bc3d418c0a288c4123',
  psychic: '6472b2bc3d418c0a288c4124',
  ice: '6472b2bc3d418c0a288c4125',
  dragon: '6472b2bc3d418c0a288c4126',
  dark: '6472b2bc3d418c0a288c4127',
  fairy: '6472b2bc3d418c0a288c4128',
  unknown: '6472b2bc3d418c0a288c4129',
  shadow: '6472b2bd3d418c0a288c412a',
};

async function create() {
  let generaciones = [];
  for (let i = 1; i < 152; i++) {
    console.log(i)
    const data = await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${i}`)
      .then((d) => {
        return {
          pokedex_id: d.data.id,
          name: d.data.name,
          image: d.data.sprites.other["official-artwork"].front_default,
          types: d.data.types.map((typ) => {
            return TIPOS[typ.type.name];
          }),
          attack: d.data.stats[1].base_stat,
          defense: d.data.stats[2].base_stat,
          generation: "6472b1761e4b275718aa13ec"
        };
      });
    generaciones.push(data)
  }
  fs.writeFile("datos.json", JSON.stringify(generaciones), (err) => {
    if(err) {
      console.log(err)
    }
    console.log("listo")
  })
}

create()