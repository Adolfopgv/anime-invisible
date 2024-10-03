import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home, CreateRoom, Room, SelectProfile } from "./Routes";
import "./firebaseConfig";
import { DbProvider } from "./context/DbContext";

function App() {
  return (
    <DbProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-room" element={<CreateRoom />} />
        <Route path="/room/:id" element={<Room />} />
        <Route path="/select-profile" element={<SelectProfile />} />
      </Routes>
    </DbProvider>
  );
}

export default App;
