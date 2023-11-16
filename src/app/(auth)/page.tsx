import { SignintoForm } from "@/components/form/SignintoForm";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import '../scss/app.scss';
export const metadata: Metadata = {
  title: 'GTX | Login',
  description: '...',
}
export default function Home() {
  return (
    <main className="bg-light flex h-screen items-center justify-center sm:bg-gray-100">
      <div className="bg-light m-auto w-full max-w-[420px] rounded p-5 sm:p-8 sm:shadow">
        <div className="mb-2 flex justify-center">
          <Image
            className="w-40 h-40 rounded-full "
            width={100}
            height={100}
            src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
            alt="avatar"
            quality={100}
          />
        </div>
        <SignintoForm />
        <div className="mt-4 text-small-label text-center ">
          <Link href="/register"  className="hidden md:inline">Don{"'"}t have an account? </Link>
        </div>
      </div>
    </main>
  );
}
