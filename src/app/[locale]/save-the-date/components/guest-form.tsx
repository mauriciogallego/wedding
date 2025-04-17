"use client";

import { Input } from "@/components/client/input/input";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";

type FormInputs = {
  name: string;
};

export const GuestForm = ({ data }: any) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
    clearErrors,
  } = useForm<FormInputs>();
  const invites = data.map((item: any) => item[0]?.split(" "));
  const nameInputData = register("name");
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const nameInput = {
    ...nameInputData,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      nameInputData.onChange(e); // ejecuta la función original
      clearErrors("name"); // limpia el error al modificar el input
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
    const value = data.name.toLowerCase().split(" ");
    const guestsFinded = [];

    for (const invite of invites) {
      const matches = invite.filter((word: string) =>
        value.includes(word.toLowerCase())
      ).length;
      if (matches >= 2) {
        guestsFinded.push(invite.join(" "));
      }
    }

    if (guestsFinded.length === 0) {
      setError("name", {
        type: "manual",
        message:
          "No hemos encontrado tu nombre en la lista de invitados, por favor verifica que lo hayas escrito correctamente.",
      });
    }
  };

  const disabled = getValues("name") === " " || getValues("name") === undefined;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md space-y-4"
    >
      <div className="space-y-2">
        <Input
          label={t("labelName")}
          placeholder={t("placeholderName")}
          register={nameInput}
          error={errors.name}
        />
      </div>
      <button
        type="submit"
        disabled={disabled}
        className="w-full px-4 py-2 font-mono text-[#ffffff] bg-primary rounded-lg hover:bg-primary/90 transition-colors"
      >
        {t("continue")}
      </button>
    </form>
  );
};
