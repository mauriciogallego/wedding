import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface Props {
  registerName: any;
  registerGuestSelected: any;
  label: string;
  placeholder: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  error: FieldError | undefined;
  guestsFinded: string[] | undefined;
}

export const Input = ({
  registerName,
  label,
  placeholder,
  inputRef,
  error,
  guestsFinded,
  registerGuestSelected,
}: Props) => {
  const { t } = useTranslation();

  return (
    <div
      data-testid="input-container"
      className="w-[400px] backdrop-blur-md rounded-xl shadow-md overflow-hidden"
    >
      <div className="pl-[15px] pt-[15px] flex items-center">
        <span className="text-[#ffffff] text-sm font-semibold flex items-center gap-2">
          <svg
            className="text-[#5689c0]"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 17l6-6-6-6M12 19h8"></path>
          </svg>
          {label}
        </span>
      </div>
      <div className="text-[#ffffff] p-[15px] mt-2 font-mono">
        <div className="flex items-center gap-2">
          <svg
            className="text-[#5689c0]"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 17l6-6-6-6M12 19h8"></path>
          </svg>
          <div className="relative flex-grow">
            <input
              {...registerName}
              placeholder={placeholder}
              className="bg-transparent border-none text-[#5689c0] font-mono text-sm outline-none w-full pr-[10px] placeholder:text-[#ffffff]/50"
            />
            <div
              data-testid="blinking-cursor"
              className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-[15px] bg-[#ffffff] animate-[blink_1s_step-end_infinite]"
            ></div>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mx-10">{error.message}</p>}
      </div>
      {guestsFinded && (
        <div className="relative  p-[15px]">
          <label className="text-[#ffffff] text-sm font-mono mb-1 block">
            {t("selectYourName")}
          </label>
          <div className="flex items-center border border-[#5689c0] rounded-md bg-transparent px-2">
            <svg
              className="text-[#5689c0] mr-2"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 17l6-6-6-6M12 19h8"></path>
            </svg>
            <select
              {...registerGuestSelected}
              className="bg-transparent border-none text-[#5689c0] font-mono text-sm outline-none w-full p-2"
              defaultValue=""
            >
              <option value="" disabled>
                {t("select")}
              </option>
              {guestsFinded.map((guest, index) => (
                <option key={index} value={guest}>
                  {guest}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
