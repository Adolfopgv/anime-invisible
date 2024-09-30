import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home, CreateRoom, Room, SelectProfile } from "./Routes";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-room" element={<CreateRoom />} />
        <Route path="/room/:id" element={<Room />} />
        <Route path="/select-profile" element={<SelectProfile />} />
      </Routes>
    </>
  );
}

export default App;
