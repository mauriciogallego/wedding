type Props = {
  title: string;
};

export const TerminalHeader = ({ title }: Props) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex space-x-2 text-red-500">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      <p className="text-sm">{title}</p>
    </div>
  );
};

export const TerminalRoot = () => (
  <p className="text-[#5689c0] font-bold -mb-5">~/Desktop/project/wedding</p>
);
