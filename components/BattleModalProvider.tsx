"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import BattleRegistrationModal from "./BattleRegistrationModal";

interface BattleModalContextValue {
  openModal: () => void;
}

const BattleModalContext = createContext<BattleModalContextValue | null>(null);

export function useBattleModal() {
  const ctx = useContext(BattleModalContext);
  if (!ctx) throw new Error("useBattleModal must be used within BattleModalProvider");
  return ctx;
}

export default function BattleModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <BattleModalContext.Provider value={{ openModal: () => setOpen(true) }}>
      {children}
      <BattleRegistrationModal open={open} onClose={() => setOpen(false)} />
    </BattleModalContext.Provider>
  );
}
