import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const UserConext = createContext({});

export function UserConextProvider({ children }: any) {
  const [user] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get("token");
      if (token) {
        try {
            // buscar al usuario en la base de datos, el token me devuelve la ID del usuario
          console.log("Token: ", token);
        } catch (error) {
          console.error("Token error: ", error);
        }
      } else {
        console.log("No token found");
      }
    };
    fetchUser();
  }, [user]);

  return <UserConext.Provider value={user}>{children}</UserConext.Provider>;
}
