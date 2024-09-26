import React, { useEffect, useState } from "react";
import axios from "axios";

function Card({ name }) {
  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${name}/`)
      .then((response) => {
        setPokemon(response.data);
      })
      .catch((err) => console.error("ERROR while fetching data", err));
  }, [name]);

  return (
    <div className=" w-full mx-auto shadow-xl rounded-lg shadow-[#363634] pb-2">
      <img
        className=" w-full mx-auto h-[250px]"
        src={pokemon?.sprites.other.dream_world.front_default}
        alt="pokemon-avatar"
      />
      <p className=" text-center my-4 font-semibold text-2xl">
        Name: {pokemon?.name}
      </p>
      <div className=" flex justify-center gap-2 font-semibold text-sm">
        Abilities:
        {pokemon?.abilities.map((value, index) => (
          <div key={index}> {value.ability.name}</div>
        ))}
      </div>
    </div>
  );
}

export default Card;
