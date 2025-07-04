import { useEffect } from "react";
import { KeyBind } from "@/types";
import { useKeyBindContext } from "@/context/KeyBindContext";

/**
 * Custom hook for registering multiple keyboard shortcuts in React components.
 *
 * More efficient than multiple useKeyBind calls when you need several shortcuts.
 * Automatically handles registration and cleanup of all keybinds when the component
 * mounts/unmounts.
 *
 * @param keyBinds - Array of keybind configuration objects
 * @returns void
 *
 * @example
 * ```tsx
 * useKeyBinds([
 *   {
 *     id: "save-note",
 *     name: "Save Note",
 *     keyBind: ["Ctrl", "S"],
 *     action: () => saveNote()
 *   },
 *   {
 *     id: "new-note",
 *     name: "New Note",
 *     keyBind: ["Ctrl", "N"],
 *     action: () => createNote()
 *   }
 * ]);
 * ```
 */
export const useKeyBinds = (keyBinds: KeyBind[]) => {
  const { registerKeyBind, unregisterKeyBind } = useKeyBindContext();

  // Extract dependencies for static checking
  const keyBindIds = keyBinds.map((kb) => kb.id).join(",");
  const keyBindNames = keyBinds.map((kb) => kb.name).join(",");
  const keyBindKeys = keyBinds.map((kb) => kb.keyBind.join(",")).join("|");
  const keyBindActions = keyBinds.map((kb) => kb.action).join(",");
  const keyBindContexts = keyBinds
    .map((kb) => JSON.stringify(kb.context))
    .join("|");

  useEffect(() => {
    // Register all keybinds
    keyBinds.forEach((keyBind) => {
      registerKeyBind(keyBind);
    });

    // Cleanup function to unregister all when component unmounts
    return () => {
      keyBinds.forEach((keyBind) => {
        unregisterKeyBind(keyBind.id);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    keyBindIds,
    keyBindNames,
    keyBindKeys,
    keyBindActions,
    keyBindContexts,
    registerKeyBind,
    unregisterKeyBind,
  ]);
};
