import { ReactNode } from "react";
import { KeyBind } from "@/types";

export interface KeyBindContextType {
  registerKeyBind: (keyBind: KeyBind) => void;
  unregisterKeyBind: (id: string) => void;
  getActiveKeyBinds: () => KeyBind[];
}

export interface KeyBindProviderProps {
  children: ReactNode;
}
