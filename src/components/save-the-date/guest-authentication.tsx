"use client";

import { Input } from "@/components/save-the-date/input";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import Layout from "./layout/layout";
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

  const invites = sheetData.map((item) => item[0]?.split(" "));
  const nameInputData = register("name");
  const guestInputData = register("guestSelected");
  const nameInputRef = useRef<HTMLInputElement | null>(null);

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
  }, []);

  const onSubmit = (data: FormInputs) => {
    if (data.guestSelected) {
      setGuest(data.guestSelected);
      setTimeout(moveNextStep, 2000);
      return;
    }

    const value = data.name.toLowerCase().split(" ");
    const guestFound = [];

    for (const invite of invites) {
      const matches = invite.filter((word: string) =>
        value.includes(word.toLowerCase())
      ).length;

      if (matches >= 2) {
        guestFound.push(invite.join(" "));
      }
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
        className="w-full max-w-md space-y-6"
      >
        <div className="space-y-4.5">
          <Input
            label={t("labelName")}
            placeholder={t("placeholderName")}
            registerName={nameInput}
            registerGuestSelected={guestInputData}
            error={errors.name}
            guestFound={guestFound}
          />
        </div>
        {!!guest ? (
          <div className="flex items-center justify-center mt-12">
            <div className="bg-transparent border border-[#56c071] py-2 px-3">
              <p className="font-mono text-sm text-[#56c071] font-bold">
                {t("authenticated")}
              </p>
            </div>
          </div>
        ) : (
          <button
            type="submit"
            disabled={disabled}
            className="w-full px-4 py-2 font-mono text-[#ffffff] bg-primary rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
          >
            {guestFound ? t("confirm") : t("continue")}
          </button>
        )}
      </form>
    </Layout>
  );
};
