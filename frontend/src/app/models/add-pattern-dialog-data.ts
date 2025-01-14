export interface NewPatternDialogData {
  pattern: boolean[]
  name: string
}
export const EmptyPattern: NewPatternDialogData = {
  pattern: [
    false, false, false, false, false,
    false, false, false, false, false,
    false, false, false, false, false,
    false, false, false, false, false,
    false, false, false, false, false,
  ],
  name: ""
}
export const ExamplePatterns: NewPatternDialogData[] = [
  {
    pattern: [
        true, false, false, false, true,
      true, false, false, false, true,
      true, true, true, true, true,
      true, false, false, false, true,
      true, false, false, false, true,
    ],
    name: "Letra H"
  },
  {
    pattern: [
      true, true, true, true, true,  // Línea horizontal superior
      false, false, false, false, false,
      false, false, false, false, false,
      false, false, false, false, false,
      false, false, false, false, false,
    ],
    name: "Línea Horizontal Superior"
  },
  {
    pattern: [
      true, false, false, false, true,  // Esquinas (4 corners)
      false, false, false, false, false,
      false, false, false, false, false,
      false, false, false, false, false,
      true, false, false, false, true,
    ],
    name: "Cuatro Esquinas"
  },
  {
    pattern: [
      true, false, false, false, true,
      false, true, false, true, false,
      false, false, true, false, false,
      false, true, false, true, false,
      true, false, false, false, true,
    ],
    name: "Letra X"
  },
  {
    pattern: [
      true, false, false, false, true,
      true, false, false, false, true,
      true, true, true, true, true,
      true, false, false, false, true,
      true, false, false, false, true,
    ],
    name: "Marco"
  },
  {
    pattern: [
      false, false, true, false, false,
      false, false, true, false, false,
      true, true, true, true, true,
      false, false, true, false, false,
      false, false, true, false, false,
    ],
    name: "Cruz"
  },
  {
    pattern: [
      true, true, true, true, true,
      false, false, true, false, false,
      false, false, true, false, false,
      false, false, true, false, false,
      false, false, true, false, false,
    ],
    name: "Letra T"
  },
  {
    pattern: [
      false, false, true, false, false,
      false, true, true, true, false,
      true, false, true, false, true,
      false, false, true, false, false,
      false, false, true, false, false,
    ],
    name: "Flecha Hacia Arriba"
  }
]
