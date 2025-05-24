import { StatusGuest } from "@/types";

export const confirmations = {
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
