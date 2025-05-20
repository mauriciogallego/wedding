const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center h-dvh bg-[#3a3a3a9a]">
      <div className="flex flex-col gap-[32px] row-start-2 items-center w-screen">
        {children}
      </div>
    </div>
  );
};

export default Layout;
