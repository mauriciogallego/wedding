import { StatusGuest } from "@/types";

export const confirmations: Record<StatusGuest, string> = {
  confirm: "Confirmado",
  decline: "Declinado",
  maybe: "Tal vez",
};

export const statusComponent: Record<
  StatusGuest,
  "confirmMessage" | "declineMessage" | "maybeMessage"
> = {
  confirm: "confirmMessage",
  decline: "declineMessage",
  maybe: "maybeMessage",
};

export const statusGuest: Record<StatusGuest, string> = {
  confirm: "confirm",
  decline: "decline",
  maybe: "maybe",
};
