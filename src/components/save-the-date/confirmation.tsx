import Typewriter, { TypewriterClass } from "typewriter-effect";
import { Trans } from "react-i18next";
import Image from "next/image";
import Countdown from "../shared/count-down/count-down";

const Confirmation = () => {
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
        className="object-cover -z-10 opacity-65 fixed inset-0"
        priority
      />
      <div id="scroll-save-date" className="h-dvh w-full overflow-y-scroll">
        <section className="flex flex-col items-center justify-center h-1/3">
          <Typewriter
            onInit={(c) => typingAction(c, "March 21, 2026")}
            options={{
              wrapperClassName:
                "text-2xl font-sisterhood font-bold tracking-widest text-[#ffffff]",
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

        <section className="flex flex-col items-center bg-blue-50 opacity-90">
          <p className="text-3xl font-sisterhood font-thin tracking-widest text-black pt-7 pb-2">
            <Trans i18nKey="weGotMarried" />
          </p>

          <p className="text-md italic font-sans font-thin tracking-widest text-[#5689c0] p-5 text-center">
            <Trans i18nKey="messageDate" components={{ bold: <strong /> }} />
          </p>
        </section>

        <section className="flex flex-col items-center bg-blue-50 opacity-90 mt-20">
          <p className="text-3xl font-sisterhood font-thin tracking-widest text-black pt-7 pb-1">
            <Trans i18nKey="where" />
          </p>

          <p className="text-md italic font-sans font-thin tracking-widest text-[#5689c0] p-5 text-center">
            <Trans i18nKey="messageWhere" components={{ bold: <strong /> }} />
          </p>
        </section>

        <section className="flex flex-col items-center bg-blue-50 opacity-90 mt-20"></section>
      </div>
    </>
  );
};

export default Confirmation;
