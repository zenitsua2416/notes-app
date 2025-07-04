import { useKeyBindContext } from "@/context/KeyBindContext";

/**
 * Debug hook for inspecting and managing the keybind system.
 *
 * Useful for development, debugging, and building admin interfaces.
 * Provides information about all active keybinds and their status.
 *
 * @returns Object containing debug information and utilities
 *
 * @example
 * ```tsx
 * const { activeKeyBinds, keyBindCount, clearAllKeyBinds } = useKeyBindDebug();
 *
 * console.log(`Active keybinds: ${keyBindCount}`);
 * activeKeyBinds.forEach(kb => console.log(`${kb.name}: ${kb.keyBind.join('+')}`));
 * ```
 */
export const useKeyBindDebug = () => {
  const { getActiveKeyBinds, unregisterKeyBind } = useKeyBindContext();

  const activeKeyBinds = getActiveKeyBinds();
  const keyBindCount = activeKeyBinds.length;

  const clearAllKeyBinds = () => {
    activeKeyBinds.forEach((keyBind) => {
      unregisterKeyBind(keyBind.id);
    });
  };

  const getKeyBindsByGroup = (group?: string) =>
    activeKeyBinds.filter((kb) => kb.group === group);

  const findKeyBindById = (id: string) =>
    activeKeyBinds.find((kb) => kb.id === id);

  const findKeyBindsByName = (name: string) =>
    activeKeyBinds.filter((kb) =>
      kb.name.toLowerCase().includes(name.toLowerCase()),
    );

  return {
    activeKeyBinds,
    keyBindCount,
    clearAllKeyBinds,
    getKeyBindsByGroup,
    findKeyBindById,
    findKeyBindsByName,
    unregisterKeyBind,
  };
};
