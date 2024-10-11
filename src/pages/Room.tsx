import { doc } from "firebase/firestore";
import { useEffect } from "react";

export default function Room() {
  useEffect(() => {
    const getRoom = async () => {

      try {
        const roomDoc = doc
      } catch (error) {}
    };
    getRoom();
  }, []);

  return <div>Room</div>;
}
