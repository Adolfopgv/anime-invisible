import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { collection, getDocs } from "firebase/firestore";
import { useDb } from "./DbContext";
import { User } from "../types";

interface UserConextType {
  user: User | null;
  loading: boolean;
}

const UserConext = createContext<UserConextType | null>(null);

export const useUser = () => {
  const context = useContext(UserConext);
  if (!context) {
    throw new Error("useUser debe ser usado dentro de un UserProvider");
  }
  return context;
};

export function UserConextProvider({ children }: any) {
  const db = useDb();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          // buscar al usuario en la base de datos, el token me devuelve la ID del usuario
          const roomRef = collection(db, "rooms");
          const docs = await getDocs(roomRef);

          docs.forEach((doc) => {
            const room = doc.data();
            const userFound = room.users.find((user: User) => {
              return user.id === token;
            });
            setUser(userFound);
            console.log("sd");
          });
        } catch (error) {
          console.error("Token error: ", error);
        } finally {
          setLoading(!loading);
        }
      } else {
        console.log("No token found");
      }
    };
    fetchUser();
  }, []);

  return (
    <UserConext.Provider value={{ user, loading }}>
      {children}
    </UserConext.Provider>
  );
}
