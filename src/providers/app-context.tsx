"use client";

import { AppContextState, Guest } from "@/types";
import React, { createContext, useContext, useState, ReactNode } from "react";

const AppContext = createContext<AppContextState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [sheetData, setSheetData] = useState<Guest[]>([]);
  const [guest, setGuest] = useState<Guest>({
    name: "",
    companions: "",
    plusOne: "",
    children: "",
    invitationName: "",
    totalPeople: 0,
    row: 0,
  });

  const value = {
    sheetData,
    guest,
    setSheetData,
    setGuest,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
