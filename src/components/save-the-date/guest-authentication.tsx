"use client";

import { Input } from "@/components/save-the-date/input";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import Layout from "./layout/layout";

type FormInputs = {
  name: string;
  guestSelected: string;
};

interface Props {
  data: string[][];
  moveNextStep: () => void;
}

export const GuestAuthentication = ({ data, moveNextStep }: Props) => {
  const { t } = useTranslation();
  const [guestFound, setGuestFound] = useState<string[]>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
    clearErrors,
  } = useForm<FormInputs>();

  const invites = data.map((item) => item[0]?.split(" "));
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
      return moveNextStep();
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
        className="w-full max-w-md space-y-4"
      >
        <div className="space-y-2">
          <Input
            label={t("labelName")}
            placeholder={t("placeholderName")}
            registerName={nameInput}
            registerGuestSelected={guestInputData}
            error={errors.name}
            guestFound={guestFound}
          />
        </div>
        <button
          type="submit"
          disabled={disabled}
          className="w-full px-4 py-2 font-mono text-[#ffffff] bg-primary rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
        >
          {guestFound ? t("confirm") : t("continue")}
        </button>
      </form>
    </Layout>
  );
};
