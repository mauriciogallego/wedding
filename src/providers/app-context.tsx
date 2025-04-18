"use client";

import { AppContextState } from "@/types";
import React, { createContext, useContext, useState, ReactNode } from "react";

const AppContext = createContext<AppContextState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [sheetData, setSheetData] = useState<string[][]>([]);
  const [guest, setGuest] = useState<string>("");

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
