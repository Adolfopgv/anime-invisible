import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useDb } from "../context/DbContext";

export default function Home() {
  const db = useDb();
  const [roomCode, setRoomCode] = useState<string>("");
  const navigate = useNavigate();

  const handleRoomCode = async () => {
    if (roomCode) {
      console.log("Entrando en la sala...");
      console.log(roomCode);
      try {
        const roomDoc = doc(db, "rooms", roomCode);
        const room = await getDoc(roomDoc);

        if (room.exists()) {
          console.log("Sala encontrada, uniendose...");
          navigate("/select-profile", {
            state: { roomId: roomCode },
          });
        } else {
          console.log("Error, no existe la sala");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("No se ha introducido ningun codigo")
    }
  };

  return (
    <main>
      <h1>Anime Invisible</h1>
      <div className="flex flex-col">
        <span>
          ¡Bienvenid@ a tu página de confianza para hacer amigos invisibles de
          anime!
        </span>
        <Link to={"/create-room"} className="btn btn-primary">
          Crear sala
        </Link>
      </div>
      <div className="divider">o</div>
      <div className="flex flex-col">
        <span>¡Introduce el link de tu amigo para unirte a su sala!</span>
        <input
          type="text"
          placeholder="Código de la sala"
          className="input input-bordered"
          value={roomCode}
          onChange={(e) => {
            setRoomCode(e.target.value);
          }}
        />
        <button className="btn btn-secondary" onClick={() => handleRoomCode()}>
          Unirse a la sala
        </button>
      </div>
    </main>
  );
}
