import { Route, Routes } from "react-router";
import Home from "./Home";
import "../index.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
