import React, { useEffect, useState } from "react";
import axios from "axios";

function Card() {
  const [pokemon, setPokemon] = useState();
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/22/")
      .then((response) => {
        setPokemon(response.data);
      })
      .catch((err) => console.error("ERROR while fetching data", err));
  }, []);
  return (
    <div className=" w-[90%] lg:w-[30%] mx-auto shadow-xl rounded-lg shadow-[#363634] pb-4">
      <img
        className=" w-[90%] mx-auto mt-6 h-[250px]"
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
      <button className=" w-36 px-4 py-2 rounded-lg my-4 bg-blue-700 text-white block mx-auto">
        New Pokemon
      </button>
    </div>
  );
}

export default Card;
