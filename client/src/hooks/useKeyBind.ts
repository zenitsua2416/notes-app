import { useEffect } from "react";
import { KeyBind } from "@/types";
import { useKeyBindContext } from "@/context/KeyBindContext";

/**
 * Custom hook for registering keyboard shortcuts in React components.
 *
 * Automatically handles registration and cleanup of keybinds when the component
 * mounts/unmounts. Provides a simple API for adding keyboard shortcuts to any page.
 *
 * @param keyBind - The keybind configuration object
 * @returns void
 *
 * @example
 * ```tsx
 * useKeyBind({
 *   id: "save-note",
 *   name: "Save Note",
 *   keyBind: ["Ctrl", "S"],
 *   action: (context) => {
 *     console.log("Saving note...", context);
 *     saveNote();
 *   },
 *   context: { noteId: "123" }
 * });
 * ```
 */
export const useKeyBind = (keyBind: KeyBind) => {
  const { registerKeyBind, unregisterKeyBind } = useKeyBindContext();

  useEffect(() => {
    // Register the keybind
    registerKeyBind(keyBind);

    // Cleanup function to unregister when component unmounts
    return () => {
      unregisterKeyBind(keyBind.id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyBind.id, registerKeyBind, unregisterKeyBind]);
};
