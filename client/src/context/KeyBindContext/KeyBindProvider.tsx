import { useEffect, useRef, useState, useCallback } from "react";
import { KeyBind } from "@/types";
import { normalizeKey } from "@/utils";
import { KeyBindContext } from "./KeyBindContext.context";
import {
  KeyBindContextType,
  KeyBindProviderProps,
} from "./KeyBindContext.types";

export const KeyBindProvider = ({ children }: KeyBindProviderProps) => {
  const [keyBinds, setKeyBinds] = useState<Map<string, KeyBind>>(new Map());
  const keyBindsRef = useRef<Map<string, KeyBind>>(new Map());

  // Keep ref in sync with state for performance
  useEffect(() => {
    keyBindsRef.current = keyBinds;
  }, [keyBinds]);

  const registerKeyBind = useCallback((keyBind: KeyBind) => {
    setKeyBinds((prev) => {
      const newMap = new Map(prev);
      newMap.set(keyBind.id, keyBind);
      return newMap;
    });
  }, []);

  const unregisterKeyBind = useCallback((id: string) => {
    setKeyBinds((prev) => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
  }, []);

  const getActiveKeyBinds = useCallback(
    () => Array.from(keyBinds.values()),
    [keyBinds],
  );

  // Efficient key matching function
  const matchesKeyBind = useCallback(
    (event: KeyboardEvent, keyBind: KeyBind): boolean => {
      const pressedKeys = new Set<string>();

      // Add modifier keys
      if (event.ctrlKey) pressedKeys.add("Ctrl");
      if (event.altKey) pressedKeys.add("Alt");
      if (event.shiftKey) pressedKeys.add("Shift");
      if (event.metaKey) pressedKeys.add("Meta");

      // Add the main key
      const normalizedKey = normalizeKey(event);
      pressedKeys.add(normalizedKey);

      // Check if all required keys are pressed
      const requiredKeys = new Set(keyBind.keyBind);

      // All required keys must be pressed
      for (const key of requiredKeys) {
        if (!pressedKeys.has(key)) return false;
      }

      // No extra keys should be pressed (exact match)
      return pressedKeys.size === requiredKeys.size;
    },
    [],
  );

  // Global event handler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Skip if typing in input fields
      const target = event.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.contentEditable === "true"
      ) {
        return;
      }

      const currentKeyBinds = keyBindsRef.current;

      for (const keyBind of currentKeyBinds.values()) {
        if (matchesKeyBind(event, keyBind)) {
          event.preventDefault();
          event.stopPropagation();

          // Execute the action
          try {
            keyBind.action(keyBind.context || null);
          } catch (error) {
            console.error(`Error executing keybind ${keyBind.id}:`, error);
          }

          // Only execute the first matching keybind
          break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const value: KeyBindContextType = {
    registerKeyBind,
    unregisterKeyBind,
    getActiveKeyBinds,
  };

  return (
    <KeyBindContext.Provider value={value}>{children}</KeyBindContext.Provider>
  );
};
