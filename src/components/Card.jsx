import React, { useEffect, useState } from "react";
import axios from "axios";

function Card() {
  const [pokemon, setPokemon] = useState();
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/22")
      .then((response) => {
        console.log(response.data);

        setPokemon(response.data);
      })
      .catch((err) => console.error("ERROR while fetching data", err));
  }, []);
  return (
    <div className=" w-[30%] mx-auto border shadow-xl rounded-lg border-[#252721]">
      <img
        className=" w-[90%] mx-auto mt-6"
        src={pokemon?.sprites.other.dream_world.front_default}
        alt="pokemon-avatar"
      />
      <p className=" text-center my-4 font-semibold text-2xl">
        Name: {pokemon?.name}
      </p>
      <div className=" flex justify-center gap-4 font-semibold text-2xl">
        Abilities:
        {pokemon?.abilities.map((value, index) => (
          <div key={index}> {value.ability.name}</div>
        ))}
      </div>
    </div>
  );
}

export default Card;
