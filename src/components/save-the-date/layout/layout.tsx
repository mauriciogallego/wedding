const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center h-dvh">
      <div className="flex flex-col gap-[32px] row-start-2 items-center w-screen">
        {children}
      </div>
    </div>
  );
};

export default Layout;
