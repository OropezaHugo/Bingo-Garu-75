export interface LobbySettings {
  manual: boolean;
  randomPatterns: boolean;
  sharedPrices: boolean;
  Rounds: number;
}
export const InitialLobbySettings: LobbySettings = {
  manual: false,
  randomPatterns: false,
  sharedPrices: false,
  Rounds: 0
}
