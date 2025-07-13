const hover = (className: string): string =>
  className
    .split(" ")
    .reduce((acc, curr) => `${acc} hover:${curr} `, "")
    .trim();

const focus = (className: string): string =>
  className
    .split(" ")
    .reduce((acc, curr) => `${acc} focus:${curr} `, "")
    .trim();

export { focus as generateFocusClasses, hover as generateHoverClasses };
