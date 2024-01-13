
import { SignintoForm } from '@/components/form/SignintoForm';
import { Metadata } from 'next';
import Image from 'next/image';
import '../scss/app.scss';
import GTXLogo from "../../assets/logo.png";

export const metadata: Metadata = {
  title: 'Login',
}

export default function Home() {
  return (
    <section  className="bg-light flex h-screen items-center justify-center sm:bg-gray-100">
      <div className="bg-white m-auto w-full max-w-[420px] rounded p-5 sm:p-8 sm:shadow">
        <div className="mb-2 flex justify-center">
          <Image
            className="w-40 h-40 rounded-full "
            width={100}
            height={100}
            src={GTXLogo}
            alt="avatar"
            quality={100}
            style={{objectFit:"scale-down", background: "#f7fbff"}}
          />
         
        </div>
        <SignintoForm />

      </div>
    </section>
  )
}
