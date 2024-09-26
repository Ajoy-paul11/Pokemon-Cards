import { useEffect, useState, useRef } from "react";
import Card from "./components/Card.jsx";
import axios from "axios";

function App() {
  const inputRef = useRef();
  const [pokeData, setPokeData] = useState([]);
  const [count, setCount] = useState(0);

  const nextData = () => {
    setCount((c) => c + 20);
  };

  const prevData = () => {
    setCount((c) => c - 20);
  };

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?offset=${count}&limit=20`)
      .then((response) => {
        setPokeData(response.data.results);
      })
      .catch((err) => {
        console.log("ERROR while getting Pokemon Data ", err);
      });
  }, [count]);

  const searchPokemon = () => {
    const inputValue = inputRef.current.value.toLowerCase();
    if (!inputValue) {
      return;
    }
    setPokeData([{ name: inputValue }]);
    inputRef.current.value = "";
  };

  return (
    <div className={` bg-[#202829] ${pokeData.length === 1 ? "h-screen" : ""}`}>
      <div className=" pt-12 text-gray-300 px-4">
        <h2 className=" text-center mb-4 text-4xl font-bold">Pokemon Avatar</h2>
        <div className=" absolute top-2 right-2 md:top-12 md:right-16">
          <button
            onClick={prevData}
            disabled={count === 0 ? true : false}
            className={` px-2 py-1 bg-blue-700 text-gray-300 mx-2 rounded-lg ${
              count === 0 ? "opacity-0" : ""
            }`}
          >
            Prev
          </button>
          <button
            onClick={nextData}
            className=" px-2 py-1 bg-blue-700 text-gray-300 mx-2 rounded-lg"
          >
            Next
          </button>
        </div>
        <div className=" w-full px-4 flex flex-wrap justify-center items-center">
          <input
            ref={inputRef}
            className="w-[70%] h-10 pl-2 rounded-l-lg text-[#202829] outline-none"
            type="text"
            placeholder="Search Pokemon..."
          />
          <button
            onClick={searchPokemon}
            className=" px-4 py-2 rounded-r-lg my-4 bg-blue-700 text-white"
          >
            Search
          </button>
        </div>
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pb-4 `}
        >
          {pokeData.length === 0 ? (
            <div className=" text-red-700 font-bold text-xl">
              No Pokemon data available
            </div>
          ) : (
            pokeData.map((item, index) => (
              <div
                key={index}
                className={pokeData.length === 1 ? "col-span-4" : ""}
              >
                <Card name={item.name} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
