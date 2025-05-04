import Typewriter, { TypewriterClass } from "typewriter-effect";
import { Trans, useTranslation } from "react-i18next";
import Image from "next/image";
import Countdown from "../shared/count-down/count-down";
import Location from "@/svg/location";
import Ring from "@/svg/ring";
import Envelop from "@/svg/envelop";
import { useAppContext } from "@/providers/app-context";
import { Button } from "../shared/button/Button";
import { useState, useEffect } from "react";
import { StatusGuest } from "@/types";
import Confetti from "react-confetti-boom";

const Confirmation = () => {
  const { t } = useTranslation();
  const { guest } = useAppContext();
  const [status, setStatus] = useState<StatusGuest | undefined>(undefined);
  const [isExploding, setIsExploding] = useState(false);

  const typingAction = (typewriter: TypewriterClass, text: string) => {
    typewriter
      .typeString(text)
      .callFunction((x) => {
        x.elements.cursor.remove();
      })
      .start();
  };

  const getFirstName = (name: string) => {
    return name.split(" ")[0];
  };

  const confirm = (status: StatusGuest) => {
    setStatus(status);
    if (status === "confirm") {
      setIsExploding(true);
    }
  };

  useEffect(() => {
    if (isExploding) {
      const timer = setTimeout(() => {
        setIsExploding(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isExploding]);

  const statusComponent = {
    confirm: t("confirmMessage"),
    decline: t("declineMessage"),
    maybe: t("maybeMessage"),
  };

  return (
    <>
      <Image
        src="/assets/wedding.jpeg"
        alt="Wedding Save the Date"
        fill
        className="object-cover -z-10 opacity-65 fixed inset-0"
        priority
      />
      <div id="scroll-save-date" className="h-dvh w-full overflow-y-scroll">
        <section className="flex flex-col items-center justify-center h-1/3">
          <Typewriter
            onInit={(c) => typingAction(c, t("date"))}
            options={{
              wrapperClassName:
                "text-3xl font-sisterhood font-bold tracking-widest text-[#ffffff]",
              cursorClassName: "hidden",
            }}
          />
        </section>

        <section className="flex items-center justify-center h-1/3">
          <p className="text-5xl font-sisterhood text-center">
            <Trans i18nKey="saveDate" />
          </p>
        </section>

        <section className="w-full flex flex-col justify-end items-center h-1/3">
          <div className="mb-10">
            <Countdown />
          </div>
        </section>

        <section className="grid grid-cols-1 justify-items-center gap-2 bg-white opacity-75 pb-10">
          <p className="text-3xl font-sisterhood font-thin tracking-widest text-black pt-7 pb-2">
            <Trans i18nKey="weGotMarried" />
          </p>

          <Ring className="w-5 h-5 my-2" />

          <p className="text-md italic font-sans font-thin tracking-widest text-[#5689c0] p-5 text-center">
            <Trans i18nKey="messageDate" components={{ bold: <strong /> }} />
          </p>

          <p className="text-3xl font-sisterhood font-thin tracking-widest text-black pt-7 pb-1">
            <Trans i18nKey="where" />
          </p>

          <Location className="w-5 h-5 my-2" />

          <p className="text-md italic font-sans font-thin tracking-widest text-[#5689c0] p-5 text-center">
            <Trans i18nKey="messageWhere" components={{ bold: <strong /> }} />
          </p>

          <Envelop className="w-5 h-5 my-2" />

          <p className="text-2xl font-sisterhood text-center font-thin tracking-widest text-black pt-7">
            <Trans i18nKey="formalInvitation" />
          </p>
          <p className="text-6xl font-sisterhood text-center font-thin tracking-widest text-black pt-3 pb-3">
            <Trans i18nKey="soon" />
          </p>
        </section>

        <section className="flex flex-col items-center justify-center bg-white space-y-5 py-5">
          <p className="text-md italic font-sans tracking-widest text-[#5689c0] p-5 text-center">
            <Trans
              i18nKey="formQuestion"
              values={{ name: getFirstName(guest.name) }}
              components={{ bold: <strong /> }}
            />
          </p>

          {!!status && (
            <section className="flex flex-col items-center justify-center bg-[#4e4e4ea7] py-1">
              <p className="text-md italic font-sans tracking-widest text-white p-5 text-center">
                {statusComponent[status]}
              </p>
            </section>
          )}

          <div className="flex items-center justify-between gap-4">
            <Button onClick={() => confirm("confirm")}>{t("yes")}</Button>
            <Button onClick={() => confirm("decline")}>{t("no")}</Button>
            <Button onClick={() => confirm("maybe")}>{t("maybe")}</Button>
          </div>
        </section>
      </div>
      {isExploding && (
        <Confetti
          mode="boom"
          particleCount={250}
          shapeSize={15}
          y={0.1}
          launchSpeed={0.5}
          spreadDeg={360}
          effectInterval={0.01}
          effectCount={10}
        />
      )}
    </>
  );
};

export default Confirmation;
