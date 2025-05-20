import "./loading.css";
import { useTranslation } from "react-i18next";
export const Loading = () => {
  const { t } = useTranslation();
  return (
    <div className="terminal-loader">
      <div className="terminal-header">
        <div className="terminal-title">{t("wedding")}</div>
        <div className="terminal-controls">
          <div className="control close"></div>
          <div className="control minimize"></div>
          <div className="control maximize"></div>
        </div>
      </div>
      <div className="text-type-delete">{t("loading")}</div>
    </div>
  );
};
