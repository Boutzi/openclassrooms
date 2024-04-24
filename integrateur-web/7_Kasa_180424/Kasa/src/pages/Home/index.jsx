import { useState } from "react";
import kasaLogo from "/kasa.svg";

function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://boutzi.github.io/openclassrooms/" target="_blank">
          <img src={kasaLogo} className="logo kasa" alt="Kasa logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
      </div>
    </>
  );
}

export default Home;
