import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const getFirstName = (name: string) => {
  return name.split(" ")[0];
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeName(name: string | undefined): string {
  if (!name) return "";
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
