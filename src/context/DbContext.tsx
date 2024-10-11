import React, { createContext, useContext, ReactNode } from "react";
import { getFirestore, Firestore } from "firebase/firestore";

interface DbContextProps {
  db: Firestore;
}

const DbContext = createContext<Firestore | null>(null);

export const DbProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const db = getFirestore(); // Initialize Firestore

  return <DbContext.Provider value={db}>{children}</DbContext.Provider>;
};

export const useDb = (): Firestore => {
  const context = useContext(DbContext);
  if (!context) {
    throw new Error("useDb must be used within a DbProvider");
  }
  return context;
};
