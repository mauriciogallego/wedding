import Typewriter, { TypewriterClass } from "typewriter-effect";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Countdown from "../shared/count-down/count-down";

const Confirmation = () => {
  const { t } = useTranslation();

  const typingAction = (typewriter: TypewriterClass, text: string) => {
    typewriter
      .typeString(text)
      .callFunction((x) => {
        x.elements.cursor.remove();
      })
      .start();
  };

  return (
    <>
      <Image
        src="/assets/wedding.jpeg"
        alt="Wedding Save the Date"
        fill
        className="object-cover -z-10 opacity-50"
        priority
      />
      <div id="scroll-save-date" className="h-screen w-full overflow-y-scroll">
        <section className="flex flex-col items-center justify-center h-1/3">
          <Typewriter
            onInit={(c) => typingAction(c, "21.03.2026")}
            options={{
              wrapperClassName:
                "text-lg font-mono italic font-thin text-[#ffffff]",
              cursorClassName: "hidden",
            }}
          />
          <Typewriter
            onInit={(c) => typingAction(c, t("weddingNames"))}
            options={{
              wrapperClassName: "text-3xl font-mono font-bold text-[#ffffff]",
              cursorClassName: "hidden",
            }}
          />
          <Typewriter
            onInit={(c) => typingAction(c, "La Paz, Bolivia.")}
            options={{
              wrapperClassName:
                "text-xl font-mono font-semibold italic text-[#ffffff]",
              cursorClassName: "hidden",
            }}
          />
        </section>

        <section className="flex items-center justify-center h-1/3">
          <p className="text-6xl font-sisterhood">{t("saveDate")}</p>
        </section>

        <section className="w-full flex flex-col justify-end items-center h-1/3">
          <div className="mb-10">
            <Countdown />
          </div>
        </section>
      </div>
    </>
  );
};

export default Confirmation;
