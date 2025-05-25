import { useState, useEffect, useRef } from "react";
import Typewriter, { TypewriterClass } from "typewriter-effect";
import { Trans, useTranslation } from "react-i18next";
import Image from "next/image";
import Countdown from "../shared/count-down/count-down";
import Ring from "@/svg/ring";
import Envelop from "@/svg/envelop";
import { useAppContext } from "@/providers/app-context";
import { Button } from "../shared/button/Button";
import { StatusGuest } from "@/types";
import Confetti from "react-confetti-boom";
import { updateSheetData } from "@/services/google-sheets.action";
import { confirmations } from "@/consts/confirmations";
import LocationOutline from "@/svg/location-outline";
import Accompanies from "./components/accompanies";
import { motion, useInView } from "framer-motion";

const Confirmation = () => {
  const { t } = useTranslation();
  const { guest } = useAppContext();
  const [status, setStatus] = useState<StatusGuest | undefined>(undefined);
  const [isExploding, setIsExploding] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);

  const weGotMarriedRef = useRef(null);
  const isWeGotMarriedInView = useInView(weGotMarriedRef, {
    once: true,
    amount: 0.2,
  });

  const formalInvitationRef = useRef(null);
  const isFormalInvitationInView = useInView(formalInvitationRef, {
    once: true,
    amount: 0.2,
  });

  const typingAction = (typewriter: TypewriterClass, text: string) => {
    typewriter
      .typeString(text)
      .callFunction((x) => {
        x.elements.cursor.remove();
      })
      .start();
  };

  const confirm = (status: StatusGuest) => {
    setStatus(status);
    if (status === "confirm") {
      setIsExploding(true);
    }

    updateSheetData({
      row: guest.row,
      status: confirmations[status],
    });
  };

  useEffect(() => {
    if (status && statusRef.current) {
      statusRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  useEffect(() => {
    if (isExploding) {
      const timer = setTimeout(() => {
        setIsExploding(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isExploding]);

  return (
    <motion.div
      id="scroll-save-date"
      className="h-dvh w-full overflow-y-scroll"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-[94%] w-full">
        <Image
          src="/assets/wedding.webp"
          alt="Wedding Save the Date"
          fill
          className="object-cover -z-10 opacity-85 fixed inset-0"
          priority
          sizes="(max-width: 640px) 640px, (max-width: 1280px) 1280px, 1920px"
          quality={80}
        />
        <section className="flex flex-col items-center justify-center h-1/3" />

        <section className="flex flex-col items-center justify-center h-1/3">
          <Typewriter
            onInit={(c) => typingAction(c, t("date"))}
            options={{
              wrapperClassName:
                "text-5xl font-sisterhood tracking-widest text-[#ffffff]",
              cursorClassName: "hidden",
            }}
          />
          <div className="flex items-center space-x-2">
            <LocationOutline className="w-6 h-6 my-2 fill-white" />
            <p className="text-xl font-sans font-thin italic tracking-widest text-[#ffffff]">
              {t("location")}
            </p>
          </div>
        </section>

        <section className="w-full flex flex-col justify-end items-center h-1/3">
          <div className="mb-10">
            <Countdown />
          </div>
        </section>
      </div>

      <motion.section
        ref={weGotMarriedRef}
        className="grid grid-cols-1 justify-items-center gap-2 bg-white opacity-85 py-5"
        initial={{ opacity: 0, y: 50 }}
        animate={
          isWeGotMarriedInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
        }
        transition={{
          duration: 0.5,
          ease: "easeInOut",
          opacity: { duration: 0.3 },
          y: { duration: 0.5 },
        }}
      >
        <p className="text-3xl font-sisterhood font-thin tracking-widest text-black pt-7 pb-2">
          <Trans i18nKey="weGotMarried" />
        </p>

        <Ring className="w-6 h-6 my-2" />

        <p className="text-md italic font-sans font-light tracking-widest text-[#5689c0] p-5 text-center">
          <Trans
            i18nKey="messageDate"
            components={{ bold: <strong className="font-bold" /> }}
          />
        </p>
        <p className="text-md italic font-sans font-light tracking-widest text-[#5689c0] p-5 text-center">
          <Trans i18nKey="message" />
        </p>
      </motion.section>

      <div className="h-[185px]"></div>

      <motion.section
        ref={formalInvitationRef}
        className="grid grid-cols-1 justify-items-center gap-2 bg-white opacity-85 py-5"
        initial={{ opacity: 0, y: 50 }}
        animate={
          isFormalInvitationInView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 50 }
        }
        transition={{
          duration: 0.5,
          ease: "easeInOut",
          opacity: { duration: 0.3 },
          y: { duration: 0.5 },
        }}
      >
        <Envelop className="w-6 h-6 my-2" />

        <p className="text-2xl font-sisterhood text-center font-thin tracking-widest text-black pt-7">
          <Trans i18nKey="formalInvitation" />
        </p>
        <p className="text-5xl font-sisterhood text-center font-thin tracking-widest text-black pt-4 pb-3">
          <Trans i18nKey="soon" />
        </p>

        <p className="text-3xl font-sisterhood font-thin text-center tracking-widest text-black pt-1 pb-3">
          <Trans
            i18nKey="addressToSend"
            values={{ name: guest.name }}
            components={{ font: <span className="font-sans text-xl" /> }}
          />
        </p>
      </motion.section>

      <div className="h-[185px]"></div>

      <section className="flex flex-col items-center justify-center bg-white opacity-85 space-y-5 py-5">
        <div>
          <p className="text-md font-semibold font-sans tracking-widest text-[#5689c0] p-5 text-center">
            <Trans
              i18nKey="formQuestion"
              components={{
                bold: <strong className="font-bold" />,
              }}
            />
          </p>

          <p className="text-xs font-light font-sans tracking-wider text-[#5689c0] italic text-center px-1">
            <Trans
              i18nKey="remember"
              components={{ bold: <strong className="font-bold" /> }}
            />
          </p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <Button onClick={() => confirm("confirm")}>
            {t("yesAttending")}
          </Button>
          <Button onClick={() => confirm("decline")}>{t("noAttending")}</Button>
          <Button onClick={() => confirm("maybe")}>{t("maybe")}</Button>
        </div>

        {status && (
          <Accompanies statusRef={statusRef} status={status} guest={guest} />
        )}
      </section>
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
    </motion.div>
  );
};

export default Confirmation;
