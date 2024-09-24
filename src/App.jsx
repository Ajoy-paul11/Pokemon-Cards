import { useState } from "react";
import Card from "./components/Card.jsx";

function App() {
  return (
    <div className=" bg-[#202829] h-screen">
      <div className=" pt-12 text-gray-300">
        <h2 className=" text-center mb-4 text-3xl font-bold">Pokemon Avatar</h2>
        <Card />
      </div>
    </div>
  );
}

export default App;
