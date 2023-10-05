import Logo from "@/components/ui/logo";

export const AuthPageLayout = ({ children }: any) => {
  const dir = 'ltr';
  return (
    <div className="bg-light flex h-screen items-center justify-center sm:bg-gray-100"
      dir={dir}
    >
      <div className="bg-light m-auto w-full max-w-[420px] rounded p-5 sm:p-8 sm:shadow">
        <div className="mb-2 flex justify-center">
          <Logo />
        </div>
        {children}
      </div>
    </div>
  );
};

