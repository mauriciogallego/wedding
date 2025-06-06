import { useState, useEffect } from "react";
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
import LocationOutline from "@/svg/location-outline";
import Accompanies from "./components/accompanies";
import { motion } from "framer-motion";
import { safeTrack } from "@/utils/mixpanel";
import { useFrameMotion } from "@/hooks/use-frame-motion";
import { Loader2 } from "lucide-react";
import { statusGuest } from "@/consts/confirmations";

const Confirmation = () => {
  const { t } = useTranslation();
  const { guest } = useAppContext();
  const [status, setStatus] = useState<StatusGuest | undefined>(undefined);
  const [saved, setSaved] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isExploding, setIsExploding] = useState(false);
  const {
    weGotMarriedRef,
    isWeGotMarriedInView,
    formalInvitationRef,
    isFormalInvitationInView,
    formQuestionRef,
    isFormQuestionInView,
  } = useFrameMotion();

  const typingAction = (typewriter: TypewriterClass, text: string) => {
    typewriter
      .typeString(text)
      .callFunction((x) => {
        x.elements.cursor.remove();
      })
      .start();
  };

  const confirm = async (status: StatusGuest) => {
    setLoading(true);
    setStatus(status);

    if (status === statusGuest.confirm) {
      safeTrack("I will attend", {
        guest: guest?.name,
        status,
      });
      setIsExploding(true);
    }

    if (status === statusGuest.decline) {
      safeTrack("I will not attend", {
        guest: guest?.name,
        status,
      });
    }

    if (status === statusGuest.maybe) {
      safeTrack("I don't know yet", {
        guest: guest?.name,
        status,
      });
    }

    await updateSheetData({
      row: guest.row,
      status,
    });

    setSaved(true);
    setLoading(false);
  };

  useEffect(() => {
    if (isExploding) {
      const timer = setTimeout(() => {
        setIsExploding(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isExploding]);

  useEffect(() => {
    if (guest?.name) {
      safeTrack("Confirmation rendered", { guest: guest.name });
    }
  }, [guest?.name]);

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
          opacity: { duration: 0.6 },
          y: { duration: 0.6, delay: 0.3 },
        }}
      >
        <p className="text-3xl font-sisterhood font-thin tracking-widest text-[#bab8b8] pt-7 pb-2">
          <Trans i18nKey="weGotMarried" />
        </p>

        <Ring className="w-6 h-6 my-2 fill-[#bab8b8]" />

        <p className="text-md italic font-sans font-light tracking-widest text-[#6699CC] p-5 text-center">
          <Trans
            i18nKey="messageDate"
            components={{ bold: <strong className="font-bold" /> }}
          />
        </p>
        <p className="text-md italic font-sans font-light tracking-widest text-black p-5 text-center">
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
          opacity: { duration: 0.6 },
          y: { duration: 0.6, delay: 0.3 },
        }}
      >
        <Envelop className="w-8 h-8" />

        <p className="text-2xl font-sisterhood text-center font-thin tracking-widest text-[#bab8b8] pt-7">
          <Trans i18nKey="formalInvitation" />
        </p>
        <p className="text-5xl font-sisterhood text-center font-thin tracking-widest text-[#bab8b8] pt-4 pb-3">
          <Trans i18nKey="soon" />
        </p>

        <p className="text-3xl font-sisterhood font-thin text-center tracking-widest text-[#bab8b8] pt-1 pb-3">
          <Trans
            i18nKey="addressToSend"
            values={{ name: guest.invitationName }}
            components={{ font: <span className="font-sans text-xl" /> }}
          />
        </p>
        <span className="font-light font-sans text-black text-xl tracking-widest text-center">
          {guest.invitationName}
        </span>
        <span className="font-light font-sans text-black text-xs tracking-widest text-center">
          {guest.plusOne === "Si" ? `${t("withCompanion")}` : undefined}
          {guest.totalPeople > 1
            ? `${guest.totalPeople} ${t("companions")}`
            : undefined}
        </span>
      </motion.section>

      <div className="h-[185px]"></div>

      <motion.section
        ref={formQuestionRef}
        className="grid grid-cols-1 justify-items-center gap-2 bg-white opacity-85 py-5"
        initial={{ opacity: 0, y: 50 }}
        animate={
          isFormQuestionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
        }
        transition={{
          duration: 0.5,
          ease: "easeInOut",
          opacity: { duration: 0.6 },
          y: { duration: 0.6, delay: 0.3 },
        }}
      >
        <p className="text-md font-medium font-sans tracking-wider text-[#6699CC] p-5 text-center">
          <Trans
            i18nKey="formQuestion"
            components={{
              bold: <strong className="font-bold" />,
            }}
          />
        </p>

        <div className="space-y-4">
          <p className="text-xs font-light font-sans tracking-widest text-[#bab8b8] italic text-center px-4">
            <Trans
              i18nKey="remember"
              components={{ bold: <strong className="font-bold" /> }}
            />
          </p>
          <div className="flex items-center justify-center gap-2">
            {saved && (
              <p className="text-gray-700 font-mono text-xs text-center">
                {t("answerSaved")}
              </p>
            )}
            {loading && (
              <Loader2 className="w-4 h-4 text-gray-500 text-center animate-spin" />
            )}
          </div>
          <div className="flex items-center justify-between gap-4">
            <Button
              data-testid="attend-button"
              onClick={() => confirm("confirm")}
              disabled={loading}
            >
              {t("yesAttending")}
            </Button>
            <Button
              data-testid="decline-button"
              onClick={() => confirm("decline")}
              disabled={loading}
            >
              {t("noAttending")}
            </Button>
            <Button
              data-testid="maybe-button"
              onClick={() => confirm("maybe")}
              disabled={loading}
            >
              {t("maybe")}
            </Button>
          </div>
        </div>

        {status && <Accompanies status={status} guest={guest} />}
      </motion.section>
      {isExploding && (
        <Confetti
          data-testid="confetti"
          mode="boom"
          colors={["#F8C3CD", "#E0B0D5", "#FFFDD0"]}
          particleCount={150}
          shapeSize={35}
          y={0.3}
          launchSpeed={0.9}
          spreadDeg={360}
          effectInterval={0.02}
          effectCount={20}
        />
      )}
    </motion.div>
  );
};

export default Confirmation;
