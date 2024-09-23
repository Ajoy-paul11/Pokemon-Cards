import React, { useEffect, useState } from "react";
import axios from "axios";

function Card() {
  const [pokemon, setPokemon] = useState();
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/55")
      .then((response) => {
        console.log(response.data);

        setPokemon(response.data);
      })
      .catch((err) => console.error("ERROR while fetching data", err));
  }, []);
  return (
    <div>
      <img
        src={pokemon?.sprites.other.dream_world.front_default}
        alt="pokemon-avatar"
      />
      <p>Name: {pokemon?.name}</p>
      <div>
        Abilities:
        {pokemon.abilities.map((value, index) => (
          <div key={index}> {value.ability.name}</div>
        ))}
      </div>
    </div>
  );
}

export default Card;
