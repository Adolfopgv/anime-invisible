import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home, CreateRoom, Room, SelectProfile } from "./Routes";
import "./firebaseConfig";
import { DbProvider } from "./context/DbContext";
import { UserConextProvider } from "./context/userContext";

function App() {
  return (
    <DbProvider>
      <UserConextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-room" element={<CreateRoom />} />
          <Route path="/room/:roomid/:userid" element={<Room />} />
          <Route path="/select-profile" element={<SelectProfile />} />
        </Routes>
      </UserConextProvider>
    </DbProvider>
  );
}

export default App;
