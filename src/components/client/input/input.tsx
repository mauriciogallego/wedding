import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  register: UseFormRegisterReturn<string>;
  label: string;
  placeholder: string;
}

export const Input = ({ register, label, placeholder }: Props) => {
  return (
    <div className="w-[400px] bg-[#23252590] backdrop-blur-md rounded-xl shadow-md overflow-hidden">
      <div className="bg-[#23252590] p-[10px_15px] flex items-center">
        <span className="text-white text-sm font-semibold flex items-center gap-2">
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
      <div className="bg-[#23252590] text-white p-[15px] font-mono">
        <div className="flex items-center">
          <span className="text-white mr-[10px]">{register.name}:</span>
          <div className="relative flex-grow">
            <input
              {...register}
              placeholder={placeholder}
              className="bg-transparent border-none text-[#5689c0] font-mono text-sm outline-none w-full pr-[10px] placeholder:text-white/50"
            />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-[15px] bg-white animate-[blink_1s_step-end_infinite]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
