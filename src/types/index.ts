import { TargetAndTransition, Transition } from "framer-motion";

export interface AnimationConfig {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  exit: TargetAndTransition;
  transition: Transition;
}

export interface AppContextState {
  sheetData: string[][];
  guest: string;
  setSheetData: React.Dispatch<React.SetStateAction<string[][]>>;
  setGuest: React.Dispatch<React.SetStateAction<string>>;
}

export type FormInputs = {
  name: string;
  guestSelected: string;
};
