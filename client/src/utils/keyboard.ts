export const normalizeKey = (e: KeyboardEvent): string => {
  const key = e.key;

  // Handle standard aliases
  switch (key) {
    case " ":
    case "Spacebar":
      return "Space";
    case "Esc":
    case "Escape":
      return "Esc";
    case "Del":
    case "Delete":
      return "Del";
    case "Ins":
    case "Insert":
      return "Ins";
    case "ArrowUp":
    case "Up":
      return "ArrowUp";
    case "ArrowDown":
    case "Down":
      return "ArrowDown";
    case "ArrowLeft":
    case "Left":
      return "ArrowLeft";
    case "ArrowRight":
    case "Right":
      return "ArrowRight";
    default:
      return key.length === 1 ? key.toUpperCase() : key; // Normalize letters
  }
};
