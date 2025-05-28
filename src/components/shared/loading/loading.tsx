import { useTranslation } from "react-i18next";
import Typewriter from "typewriter-effect";
import { TerminalHeader } from "../terminal/terminal";

export const Loading = () => {
  const { t } = useTranslation();

  return (
    <div
      data-testid="loading-animation"
      className="bg-black text-white p-5 rounded-lg w-2/4 max-w-xs font-mono"
    >
      <TerminalHeader title={t("wedding")} />
      <div className="ml-4 mt-4 p-2 flex items-center justify-start">
        <p className="text-center">{t("loading")}</p>
        <Typewriter
          options={{
            strings: "...",
            cursor: "█",
            delay: 100,
            deleteSpeed: 50,
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
