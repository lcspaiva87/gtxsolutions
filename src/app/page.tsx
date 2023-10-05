import { SignintoForm } from "@/components/form/SignintoForm";
import { Avatar, Card, Flex } from "@radix-ui/themes";

export default function Home() {
  return (
    <div className="bg-light flex h-screen items-center justify-center sm:bg-gray-100">
      <div className="bg-light m-auto w-full max-w-[420px] rounded p-5 sm:p-8 sm:shadow">
        <div className="mb-2 flex justify-center">
          <Avatar
            className="w-8"
            size="8"
            src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
            fallback="A"
            radius="full"
          />
        </div>
        <SignintoForm />
        <div className="mt-4 text-small-label text-center ">
          <span className="hidden md:inline">Don{"'"}t have an account? </span>
          <button

            className="font-bold hover:underline"
          >
            Sign up to
          </button>
        </div>
      </div>
    </div>
  );
}
