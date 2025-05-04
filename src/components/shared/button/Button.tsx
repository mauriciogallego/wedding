import { ReactNode } from "react";
import "./Button.css";
interface Props {
  children: ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export const Button = ({
  children,
  onClick,
  className,
  disabled,
  type,
}: Props) => {
  return (
    <button
      className={`btn-31 ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      <span className="text-container">
        <span className="text">{children}</span>
      </span>
    </button>
  );
};
