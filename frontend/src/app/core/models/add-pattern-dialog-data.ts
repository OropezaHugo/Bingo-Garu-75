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

export interface RoundPatternInfo {
  id: number
  patternMatrix: boolean[]
  patternName: string
  targetPrice: number,
  active: boolean
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
export const EmptyPatternData: boolean[] = [
    false, false, false, false, false,
    false, false, false, false, false,
    false, false, false, false, false,
    false, false, false, false, false,
    false, false, false, false, false,
]

