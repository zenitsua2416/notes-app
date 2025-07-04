export type Key =
  // Letters
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z"

  // Digits
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"

  // Function keys
  | "F1"
  | "F2"
  | "F3"
  | "F4"
  | "F5"
  | "F6"
  | "F7"
  | "F8"
  | "F9"
  | "F10"
  | "F11"
  | "F12"

  // Modifier keys
  | "Ctrl"
  | "Alt"
  | "Shift"
  | "Meta"

  // Arrow/navigation
  | "ArrowUp"
  | "ArrowDown"
  | "ArrowLeft"
  | "ArrowRight"
  | "Home"
  | "End"
  | "PageUp"
  | "PageDown"

  // Editing
  | "Backspace"
  | "Del"
  | "Ins"

  // Misc control
  | "Enter"
  | "Esc"
  | "Tab"
  | "Space"

  // Symbols (common on most keyboards)
  | "`"
  | "-"
  | "="
  | "["
  | "]"
  | "\\"
  | ";"
  | "'"
  | ","
  | "."
  | "/";

export type Keys = Key[];

export type ActionContext = Record<string, unknown> | null;

export type Action<C extends ActionContext> = (
  context: C,
) => void | Promise<void>;

export interface KeyBind {
  /**
   * The unique identifier for the key binding.
   *
   * Used to identify and reference the key binding in code. Should be unique globally
   */
  id: string;

  /**
   * The name of the key binding.
   *
   * Used to describe the purpose of the key binding (e.g., "Save File", "Open Settings").
   */
  name: string;

  /**
   * Optional additional information or description about the key binding.
   *
   * Can be used to provide context, usage instructions, or developer notes.
   * Often displayed in tooltips or help documentation.
   */
  info?: string;

  /**
   * The group to which this key binding belongs. This should be unique throughout
   * the application. If not, throws an error when a duplicate is encountered.
   *
   */
  group?: string;

  /**
   * The actual key combination that triggers this action.
   *
   * This should be a defined `Keys` value representing one or more keys.
   * It's the physical or logical keyboard shortcut associated with this binding.
   */
  keyBind: Keys;

  /**
   * The action function that is executed when the key binding is triggered.
   *
   * This is a function or command that defines what happens when the key is pressed.
   * It typically uses the provided `context` as input.
   */
  action: Action<ActionContext>;

  /**
   * (Optional) Context object passed to the action when invoked.
   *
   * Contains additional state or data needed for the action to execute properly.
   * Can include things like editor state, selected items, or user preferences.
   */
  context?: ActionContext;
}
