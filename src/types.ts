import CentralPlayer from "./components/centralPlayer";

export interface Sound {
  name: string;
  name_l10n?: { [key: string]: string };
  file: string | string[];
  type: string;
}

export interface PageStatus {
  darkMode: boolean;
  player: CentralPlayer;
}