import { createContext, useContext } from "react";
import { KeyBindContextType } from "./KeyBindContext.types";

const KeyBindContext = createContext<KeyBindContextType | null>(null);

export const useKeyBindContext = () => {
  const context = useContext(KeyBindContext);
  if (!context) {
    throw new Error("useKeyBindContext must be used within a KeyBindProvider");
  }
  return context;
};

export { KeyBindContext };
