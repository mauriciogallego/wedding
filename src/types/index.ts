import { TargetAndTransition, Transition } from "framer-motion";
import {
  JWT,
  UserRefreshClient,
  BaseExternalAccountClient,
  Impersonated,
  Compute,
} from "google-auth-library";
export interface AnimationConfig {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  exit: TargetAndTransition;
  transition: Transition;
}

export type Guest = {
  name: string;
  companions: string;
  plusOne: string;
  children: string;
  totalPeople: number;
  invitationName: string;
  row: number;
};

export interface AppContextState {
  sheetData: Guest[];
  guest: Guest;
  setSheetData: React.Dispatch<React.SetStateAction<Guest[]>>;
  setGuest: React.Dispatch<React.SetStateAction<Guest>>;
}

export type FormInputs = {
  name: string;
  guestSelected: string;
};

export type SvgProps = {
  width?: string;
  height?: string;
  className?: string;
  fill?: string;
  color?: string;
};

export type StatusGuest = "confirm" | "decline" | "maybe";

export type GoogleAuth =
  | JWT
  | UserRefreshClient
  | BaseExternalAccountClient
  | Impersonated
  | Compute;
