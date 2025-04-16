"use client";

import { Input } from "@/components/client/input/input";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

type FormInputs = {
  name: string;
};

export const GuestForm = () => {
  const { t } = useTranslation();

  const { register, handleSubmit } = useForm<FormInputs>();

  const onSubmit = (data: FormInputs) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md space-y-4"
    >
      <div className="space-y-2">
        <Input
          label={t("labelName")}
          placeholder={t("placeholderName")}
          register={register("name")}
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 font-mono text-[#ffffff] bg-primary rounded-lg hover:bg-primary/90 transition-colors"
      >
        {t("continue")}
      </button>
    </form>
  );
};
