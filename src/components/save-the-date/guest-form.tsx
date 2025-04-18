"use client";

import { Input } from "@/components/client/input/input";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import Layout from "./layout/layout";

type FormInputs = {
  name: string;
};

export const GuestForm = () => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit } = useForm<FormInputs>();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const onSubmit = (data: FormInputs) => {
    console.log(data);
  };

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
            register={register("name")}
            inputRef={inputRef}
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 font-mono text-[#ffffff] bg-primary rounded-lg hover:bg-primary/90 transition-colors"
        >
          {t("continue")}
        </button>
      </form>
    </Layout>
  );
};
