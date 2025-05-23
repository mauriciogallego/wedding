"use client";

import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import Layout from "./components/layout/layout";
import { useAppContext } from "@/providers/app-context";
import { FormInputs } from "@/types";
import Typewriter from "typewriter-effect";

interface Props {
  moveNextStep: () => void;
}

export const GuestAuthentication = ({ moveNextStep }: Props) => {
  const { t } = useTranslation();
  const { sheetData, setGuest, guest } = useAppContext();
  const [guestFound, setGuestFound] = useState<string[]>();
  const [showInput, setShowInput] = useState(false);
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
      nameInputData.onChange(e);
      clearErrors("name");
      setGuestFound(undefined);
    },
    ref: (e: HTMLInputElement) => {
      nameInputRef.current = e;
      if (typeof nameInputData.ref === "function") {
        nameInputData.ref(e);
      }
    },
  };

  useEffect(() => {
    if (nameInputRef.current && showInput) {
      nameInputRef.current.focus();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [showInput]);

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
    <Layout className="bg-[#e8e8e8]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-6 flex flex-col items-center justify-center"
      >
        <div className="m-auto w-full">
          <aside className="bg-black text-white p-6 rounded-lg w-[98%] max-w-lg font-mono min-h-[250px] flex flex-col justify-between mx-1">
            <div className="flex justify-between items-center">
              <div className="flex space-x-2 text-red-500">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <p className="text-sm">bash</p>
            </div>
            <div className="mt-4">
              <p className="text-[#5689c0] font-bold -mb-5">
                ~/Desktop/project/wedding
              </p>
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .pauseFor(200)
                    .typeString(
                      '<br/><span class="text-green-500">$ npm install save-the-date</span>'
                    )
                    .pauseFor(1000)
                    .typeString(
                      '<br/><span class="text-white"><span class="text-green-300">success</span> installed save-the-date</span>'
                    )
                    .pauseFor(500)
                    .typeString(
                      '<br/><span class="text-white"><span class="text-amber-300">⚠️ important</span> type your name and last name ✨</span>'
                    )
                    .callFunction(() => {
                      setShowInput(true);
                    })
                    .start();
                }}
                options={{
                  delay: 50,
                  cursor: "█",
                  cursorClassName: "text-white",
                }}
              />
              {showInput && (
                <input
                  {...nameInput}
                  className="bg-black w-full h-10 font-semibold text-white outline-none placeholder:text-[#989898] mt-1"
                  placeholder={t("placeholderName")}
                />
              )}

              {errors.name && (
                <p className="text-red-500 font-semibold">
                  {errors.name.message}
                </p>
              )}

              {guestFound && (
                <div className="relative">
                  <label className="text-amber-300 text-sm mb-1 block tracking-wider">
                    {t("selectYourName")}
                  </label>
                  <div className="flex items-center border border-[#5689c0] rounded-md bg-transparent px-2 mt-2">
                    <svg
                      className="text-[#5689c0] mr-2"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 17l6-6-6-6M12 19h8"></path>
                    </svg>
                    <select
                      {...guestInputData}
                      className="bg-transparent border-none text-[#5689c0] font-mono text-sm outline-none w-full p-2"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        {t("select")}
                      </option>
                      {guestFound.map((guest, index) => (
                        <option key={index} value={guest}>
                          {guest}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {!!guest?.name && (
                <div className="flex items-center justify-center mt-12">
                  <div className="bg-transparent border border-[#56c071] py-2 px-3">
                    <p className="tracking-wider font-mono text-sm text-[#56c071] font-bold">
                      {t("authenticated")}
                    </p>
                  </div>
                </div>
              )}

              {showInput && !guest?.name && (
                <button
                  type="submit"
                  disabled={disabled}
                  className="tracking-wider w-full px-4 py-2 font-mono text-[#ffffff] bg-primary rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  {guestFound ? t("confirm") : t("continue")}
                </button>
              )}
            </div>
          </aside>
        </div>
      </form>
    </Layout>
  );
};
