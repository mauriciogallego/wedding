"use client";

import { Input } from "@/components/save-the-date/input";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import Layout from "./components/layout/layout";
import { useAppContext } from "@/providers/app-context";
import { FormInputs } from "@/types";

interface Props {
  moveNextStep: () => void;
}

export const GuestAuthentication = ({ moveNextStep }: Props) => {
  const { t } = useTranslation();
  const { sheetData, setGuest, guest } = useAppContext();
  const [guestFound, setGuestFound] = useState<string[]>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
    clearErrors,
  } = useForm<FormInputs>();

  const invites = sheetData?.map((item) => item.name?.split(" ")) || [];
  const nameInputData = register("name");
  const guestInputData = register("guestSelected");
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const nameInput = {
    ...nameInputData,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      nameInputData.onChange(e); // ejecuta la función original
      clearErrors("name"); // limpia el error al modificar el input
      setGuestFound(undefined); // limpia los invitados encontrados
    },
    ref: (e: HTMLInputElement) => {
      nameInputRef.current = e;
      if (typeof nameInputData.ref === "function") {
        nameInputData.ref(e);
      }
    },
  };

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const onSubmit = (data: FormInputs) => {
    if (data.guestSelected) {
      const guest = sheetData?.find((item) => item.name === data.guestSelected);
      if (guest) {
        setGuest({
          name: guest.name || "",
          companions: guest.companions || "",
          plusOne: guest.plusOne || "",
          children: guest.children || "",
          row: guest.row || 0,
        });
        timeoutRef.current = setTimeout(moveNextStep, 500);
      }
      return;
    }

    const value = data.name.toLowerCase().trim().split(" ").filter(Boolean);
    if (value.length === 0) return;

    const guestFound: string[] = [];
    const exactMatches: string[] = [];

    for (const invite of invites) {
      if (!invite) continue;
      const inviteLower = invite.map((word) => word.toLowerCase());
      const isExactMatch = inviteLower.join(" ") === value.join(" ");

      if (isExactMatch) {
        exactMatches.push(invite.join(" "));
        continue;
      }

      const matches = invite.filter((word: string) =>
        value.includes(word.toLowerCase())
      ).length;

      const matchRatio = matches / invite.length;

      if (matches >= 2 && matchRatio >= 0.5) {
        guestFound.push(invite.join(" "));
      }
    }

    // If we have exact matches, use those instead
    if (exactMatches.length === 1) {
      const guestName = exactMatches[0];
      const guest = sheetData?.find((item) => item.name === guestName);
      if (guest) {
        setGuest({
          name: guest.name || "",
          companions: guest.companions || "",
          plusOne: guest.plusOne || "",
          children: guest.children || "",
          row: guest.row || 0,
        });
        timeoutRef.current = setTimeout(moveNextStep, 2000);
      }
      return;
    } else if (exactMatches.length > 1) {
      setGuestFound(exactMatches);
      return;
    }

    if (guestFound.length === 0) {
      setError("name", {
        type: "manual",
        message: t("formErrorMessage"),
      });
    } else {
      setGuestFound(guestFound);
    }
  };

  const disabled =
    getValues("name")?.trim() === "" || getValues("name") === undefined;

  return (
    <Layout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg space-y-6 flex flex-col items-center justify-center"
      >
        <div className="space-y-4.5 bg-[#171717]">
          <Input
            label={t("labelName")}
            placeholder={t("placeholderName")}
            registerName={nameInput}
            registerGuestSelected={guestInputData}
            error={errors.name}
            guestFound={guestFound}
          />
        </div>
        {!!guest.name ? (
          <div className="flex items-center justify-center mt-12">
            <div className="bg-transparent border border-[#56c071] py-2 px-3">
              <p className="tracking-wider font-mono text-sm text-[#56c071] font-bold">
                {t("authenticated")}
              </p>
            </div>
          </div>
        ) : (
          <button
            type="submit"
            disabled={disabled}
            className="tracking-wider w-full px-4 py-2 font-mono text-[#ffffff] bg-primary rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
          >
            {guestFound ? t("confirm") : t("continue")}
          </button>
        )}
      </form>
    </Layout>
  );
};
