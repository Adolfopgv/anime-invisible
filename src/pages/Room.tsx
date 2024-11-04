import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDb } from "../context/DbContext";
import type { Room } from "../types";
import UserTable from "../components/UserTable";

export default function Room() {
  const db = useDb();
  const roomFromUrl = location.pathname.split("/")[2];

  const [room, setRoom] = useState<Room | null>();

  useEffect(() => {
    const getRoom = async () => {
      try {
        const roomById = doc(db, "rooms", roomFromUrl);
        const getRoom = await getDoc(roomById);
        if (getRoom.exists()) {
          const roomData = getRoom.data() as Room;
          setRoom(roomData);
        }
      } catch (error) {
        console.error("Error al obtener la sala: ", error);
      }
    };
    getRoom();
  }, []);

  return (
    <div>
      <h1>room: {room?.name}</h1>
      <h3>{room?.endDate?.getDay()}</h3>
      <UserTable users={room?.users} />
    </div>
  );
}
