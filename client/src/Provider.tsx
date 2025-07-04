import { ReactNode } from "react";
import { Provider as StoreProvider } from "react-redux";

import { HeroUIProvider } from "@heroui/system";

import { store } from "@/store";
import { KeyBindProvider } from "./context";

const Provider = ({ children }: { children: ReactNode }) => (
  <HeroUIProvider>
    <StoreProvider store={store}>
      <KeyBindProvider>{children}</KeyBindProvider>
    </StoreProvider>
  </HeroUIProvider>
);

export default Provider;
