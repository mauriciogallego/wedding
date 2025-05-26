import { useTranslation } from "react-i18next";
import Typewriter from "typewriter-effect";
import { TerminalHeader } from "../terminal/terminal";

export const Loading = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-black text-white p-4 rounded-lg w-2/4 max-w-xs font-mono">
      <TerminalHeader title={t("wedding")} />
      <div className="ml-4 mt-4 p-2 flex items-center justify-start">
        <p className="text-center">{t("loading")}</p>
        <Typewriter
          options={{
            strings: "...",
            cursor: "█",
            delay: 200,
            deleteSpeed: 200,
            cursorClassName: "text-white",
            wrapperClassName: "text-white text-center",
            autoStart: true,
            loop: true,
          }}
        />
      </div>
    </div>
  );
};
