/* eslint-disable no-unused-vars */
import "./checkbox.css";
import { useTranslation } from "react-i18next";

const Checkbox = ({
  handleChange,
}: {
  handleChange: (value: string) => void;
}) => {
  const { t } = useTranslation();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.checked ? "Si" : "No");
  };

  return (
    <label className="rocker rocker-small">
      <input type="checkbox" onChange={onChange} />
      <span className="switch-left">{t("yes")}</span>
      <span className="switch-right">{t("no")}</span>
    </label>
  );
};

export default Checkbox;
