export interface NewPatternDialogData {
  id?: number
  patternMatrix: boolean[]
  patternName: string
}

export interface Pattern {
  id: number
  patternMatrix: boolean[]
  patternName: string
}
export const EmptyPattern: NewPatternDialogData = {
  patternMatrix: [
    false, false, false, false, false,
    false, false, false, false, false,
    false, false, false, false, false,
    false, false, false, false, false,
    false, false, false, false, false,
  ],
  patternName: ""
}
export const ExamplePatterns: NewPatternDialogData[] = [
  {
    patternMatrix: [
        true, false, false, false, true,
      true, false, false, false, true,
      true, true, true, true, true,
      true, false, false, false, true,
      true, false, false, false, true,
    ],
    patternName: "Letra H"
  },
  {
    patternMatrix: [
      true, true, true, true, true,  // Línea horizontal superior
      false, false, false, false, false,
      false, false, false, false, false,
      false, false, false, false, false,
      false, false, false, false, false,
    ],
    patternName: "Línea Horizontal Superior"
  },
  {
    patternMatrix: [
      true, false, false, false, true,  // Esquinas (4 corners)
      false, false, false, false, false,
      false, false, false, false, false,
      false, false, false, false, false,
      true, false, false, false, true,
    ],
    patternName: "Cuatro Esquinas"
  },
  {
    patternMatrix: [
      true, false, false, false, true,
      false, true, false, true, false,
      false, false, true, false, false,
      false, true, false, true, false,
      true, false, false, false, true,
    ],
    patternName: "Letra X"
  },
  {
    patternMatrix: [
      true, false, false, false, true,
      true, false, false, false, true,
      true, true, true, true, true,
      true, false, false, false, true,
      true, false, false, false, true,
    ],
    patternName: "Marco"
  },
  {
    patternMatrix: [
      false, false, true, false, false,
      false, false, true, false, false,
      true, true, true, true, true,
      false, false, true, false, false,
      false, false, true, false, false,
    ],
    patternName: "Cruz"
  },
  {
    patternMatrix: [
      true, true, true, true, true,
      false, false, true, false, false,
      false, false, true, false, false,
      false, false, true, false, false,
      false, false, true, false, false,
    ],
    patternName: "Letra T"
  },
  {
    patternMatrix: [
      false, false, true, false, false,
      false, true, true, true, false,
      true, false, true, false, true,
      false, false, true, false, false,
      false, false, true, false, false,
    ],
    patternName: "Flecha Hacia Arriba"
  }
]
