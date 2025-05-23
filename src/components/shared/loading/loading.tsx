import { useTranslation } from "react-i18next";
import Typewriter from "typewriter-effect";

export const Loading = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-black text-white p-4 rounded-lg w-2/4 max-w-xs font-mono">
      <div className="flex justify-between items-center">
        <div className="flex space-x-1.5 text-red-500">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-sm">{t("wedding")}</div>
      </div>
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
