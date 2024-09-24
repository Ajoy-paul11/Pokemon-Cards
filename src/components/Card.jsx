import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

function Card() {
  const inputRef = useRef();
  const [pokemon, setPokemon] = useState();
  const [num, setNum] = useState(1);

  const nextPokemon = () => {
    setNum(num + 1);
  };
  const prevPokemon = () => {
    setNum(num - 1);
  };

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${num}/`)
      // .get(`https://pokeapi.co/api/v2/pokemon/pikachu/`)
      .then((response) => {
        console.log(response.data);
        setPokemon(response.data);
      })
      .catch((err) => console.error("ERROR while fetching data", err));
  }, [num]);

  const findPokemon = () => {
    const inputValue = inputRef.current.value.toLowerCase();
    console.log(inputValue);

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${inputValue}`)
      .then((response) => {
        setNum(response.data.id);
      })
      .catch((err) => console.error("ERROR while getting search data", err));

    inputRef.current.value = "";
  };

  return (
    <div className=" w-[90%] lg:w-[30%] mx-auto shadow-xl rounded-lg shadow-[#363634] pb-2">
      <div className=" w-full px-4 flex flex-wrap items-center">
        <input
          ref={inputRef}
          className="w-[70%] h-10 pl-2 rounded-l-lg text-[#202829] outline-none"
          type="text"
          placeholder="Search Pokemon..."
        />
        <button
          onClick={findPokemon}
          className=" px-4 py-2 rounded-r-lg my-4 bg-blue-700 text-white"
        >
          Search
        </button>
      </div>
      <img
        className=" w-[90%] mx-auto h-[250px]"
        src={pokemon?.sprites.other.dream_world.front_default}
        alt="pokemon-avatar"
      />
      <p className=" text-center my-4 font-semibold text-2xl">
        Name: {pokemon?.name}
      </p>
      <div className=" flex justify-center gap-2 font-semibold text-xl">
        Abilities:
        {pokemon?.abilities.map((value, index) => (
          <div key={index}> {value.ability.name}</div>
        ))}
      </div>
      <div className=" flex justify-between items-center">
        <button
          onClick={prevPokemon}
          disabled={num === 1}
          className={`w-36 px-4 py-2 rounded-lg my-4 bg-blue-700 text-white  mx-auto ${
            num === 1 ? "opacity-10" : ""
          }`}
        >
          Previous
        </button>
        <button
          onClick={nextPokemon}
          className=" w-36 px-4 py-2 rounded-lg my-4 bg-blue-700 text-white  mx-auto"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Card;
