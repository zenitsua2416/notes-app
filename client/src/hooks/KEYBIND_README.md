# Keybind System

A performant and intelligent keyboard shortcut system for React applications.

## Features

- **Global Management**: Single context manages all keybinds across the app
- **Automatic Cleanup**: Keybinds are automatically removed when components unmount
- **Input Field Protection**: Automatically ignores shortcuts when typing in input fields
- **Efficient Matching**: Optimized key combination matching with exact match requirements
- **Debug Support**: Built-in debugging tools for development
- **Type Safety**: Full TypeScript support with comprehensive type definitions

## Architecture

### Core Components

1. **KeyBindProvider** (`context/KeyBindContext.tsx`)

   - Global context that manages all keybinds
   - Single event listener for optimal performance
   - Handles key normalization and matching

2. **useKeyBind** (`hooks/useKeyBind.ts`)

   - Simple hook for registering a single keybind
   - Automatic cleanup on unmount

3. **useKeyBinds** (`hooks/useKeyBinds.ts`)

   - Efficient hook for registering multiple keybinds
   - Better performance than multiple `useKeyBind` calls

4. **useKeyBindDebug** (`hooks/useKeyBindDebug.ts`)
   - Debug utilities for inspecting active keybinds
   - Useful for development and admin interfaces

## Usage

### Basic Usage

```tsx
import { useKeyBind } from "@/hooks";

const MyComponent = () => {
  useKeyBind({
    id: "save-note",
    name: "Save Note",
    keyBind: ["Ctrl", "S"],
    action: (context) => {
      console.log("Saving note...", context);
      saveNote();
    },
    context: { noteId: "123" },
  });

  return <div>My Component</div>;
};
```

### Multiple Keybinds

```tsx
import { useKeyBinds } from "@/hooks";

const MyComponent = () => {
  useKeyBinds([
    {
      id: "save-note",
      name: "Save Note",
      keyBind: ["Ctrl", "S"],
      action: () => saveNote(),
    },
    {
      id: "new-note",
      name: "New Note",
      keyBind: ["Ctrl", "N"],
      action: () => createNote(),
    },
    {
      id: "delete-note",
      name: "Delete Note",
      keyBind: ["Del"],
      action: () => deleteNote(),
    },
  ]);

  return <div>My Component</div>;
};
```

### Debug and Inspection

```tsx
import { useKeyBindDebug } from "@/hooks";

const DebugComponent = () => {
  const { activeKeyBinds, keyBindCount, clearAllKeyBinds, findKeyBindById } =
    useKeyBindDebug();

  return (
    <div>
      <p>Active keybinds: {keyBindCount}</p>
      <button onClick={clearAllKeyBinds}>Clear All</button>

      {activeKeyBinds.map((kb) => (
        <div key={kb.id}>
          {kb.name}: {kb.keyBind.join("+")}
        </div>
      ))}
    </div>
  );
};
```

## Key Types

The system supports a comprehensive set of keys:

### Letters & Numbers

- `A-Z`, `0-9`

### Function Keys

- `F1-F12`

### Modifier Keys

- `Ctrl`, `Alt`, `Shift`, `Meta`

### Navigation

- `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`
- `Home`, `End`, `PageUp`, `PageDown`

### Editing

- `Backspace`, `Del`, `Ins`

### Control

- `Enter`, `Esc`, `Tab`, `Space`

### Symbols

- `` ` ``, `-`, `=`, `[`, `]`, `\`, `;`, `'`, `,`, `.`, `/`

## Performance Optimizations

1. **Single Event Listener**: Only one global `keydown` listener
2. **Ref-based Updates**: Uses refs to avoid unnecessary re-renders
3. **Efficient Matching**: Set-based key comparison for O(1) lookups
4. **Early Exit**: Stops processing after first match
5. **Input Field Protection**: Skips processing when typing in inputs

## Best Practices

### 1. Use Unique IDs

```tsx
// Good
useKeyBind({
  id: "save-note-123", // Unique per note
  name: "Save Note",
  keyBind: ["Ctrl", "S"],
  action: () => saveNote(123),
});

// Bad - could conflict
useKeyBind({
  id: "save", // Too generic
  name: "Save Note",
  keyBind: ["Ctrl", "S"],
  action: () => saveNote(),
});
```

### 2. Use Context for Dynamic Data

```tsx
useKeyBind({
  id: "edit-note",
  name: "Edit Note",
  keyBind: ["Ctrl", "E"],
  action: (context) => {
    const { noteId } = context as { noteId: string };
    editNote(noteId);
  },
  context: { noteId: currentNoteId },
});
```

### 3. Group Related Keybinds

```tsx
useKeyBinds([
  {
    id: "note-save",
    name: "Save Note",
    group: "note-editing",
    keyBind: ["Ctrl", "S"],
    action: saveNote,
  },
  {
    id: "note-new",
    name: "New Note",
    group: "note-editing",
    keyBind: ["Ctrl", "N"],
    action: createNote,
  },
]);
```

### 4. Use useKeyBinds for Multiple Shortcuts

```tsx
// Good - single registration
useKeyBinds([
  { id: "save", keyBind: ["Ctrl", "S"], action: save },
  { id: "new", keyBind: ["Ctrl", "N"], action: create },
]);

// Less efficient - multiple registrations
useKeyBind({ id: "save", keyBind: ["Ctrl", "S"], action: save });
useKeyBind({ id: "new", keyBind: ["Ctrl", "N"], action: create });
```

## Error Handling

The system includes built-in error handling:

```tsx
// Actions are wrapped in try-catch
try {
  keyBind.action(keyBind.context || null);
} catch (error) {
  console.error(`Error executing keybind ${keyBind.id}:`, error);
}
```

## Input Field Protection

The system automatically ignores shortcuts when:

- Typing in `<input>` elements
- Typing in `<textarea>` elements
- Editing contenteditable elements

This prevents conflicts with normal typing behavior.

## Example Implementation

See `components/ui/KeyBindExample/KeyBindExample.component.tsx` for a complete working example.

## Migration from Other Systems

If migrating from other keyboard shortcut libraries:

1. Replace individual event listeners with `useKeyBind` or `useKeyBinds`
2. Convert key combinations to the `Keys` array format
3. Wrap actions in the `Action<ActionContext>` type
4. Use the debug tools to verify registration

## Troubleshooting

### Keybind Not Working

1. Check browser console for errors
2. Verify key combination is valid
3. Ensure component is mounted
4. Check if typing in input field (shortcuts are disabled)

### Performance Issues

1. Use `useKeyBinds` instead of multiple `useKeyBind` calls
2. Avoid creating new action functions on every render
3. Use `useCallback` for action functions if needed

### Infinite Re-render Loop

If you see "Maximum update depth exceeded" error:

1. **Use stable action functions**:

```tsx
// Good - stable action function
const saveAction = useCallback(() => saveNote(), [saveNote]);

useKeyBind({
  id: "save-note",
  name: "Save Note",
  keyBind: ["Ctrl", "S"],
  action: saveAction,
});

// Bad - new function on every render
useKeyBind({
  id: "save-note",
  name: "Save Note",
  keyBind: ["Ctrl", "S"],
  action: () => saveNote(), // This creates a new function every render!
});
```

2. **Use stable context objects**:

```tsx
// Good - memoized context
const context = useMemo(() => ({ noteId: currentNoteId }), [currentNoteId]);

// Bad - new object on every render
const context = { noteId: currentNoteId }; // New object every render!
```

3. **Use useKeyBinds for multiple keybinds** to reduce re-renders

### Debug Information

```tsx
const { activeKeyBinds, keyBindCount } = useKeyBindDebug();
console.log(`Active keybinds: ${keyBindCount}`);
console.log(activeKeyBinds);
```
