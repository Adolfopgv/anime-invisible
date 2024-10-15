import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDb } from "../context/DbContext";
import type { Room } from "../types";

export default function Room() {
  const db = useDb();
  const roomFromUrl = location.pathname.split("/")[2];

  const [room, setRoom] = useState<Room | null>(null);

  // Terminar
  useEffect(() => {
    const getRoom = async () => {
      try {
        const roomRef = collection(db, "rooms");
        const q = query(roomRef, where("id", "==", roomFromUrl));
        const docs = await getDocs(q);
        console.log(docs);
        if (!docs.empty) {
        }
      } catch (error) {}
    };
    getRoom();
  }, []);

  return <div>Room</div>;
}
