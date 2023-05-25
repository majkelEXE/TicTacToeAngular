export interface StartGame {
  n: number;
  m: number;
  p: number;
}
export const startGameDefaults: StartGame = {
  n: 15,
  m: 15,
  p: 5,
};

export type FieldValue = 0 | 1 | 2 | 3 | 4;
export type BoardScheme = FieldValue[][];
