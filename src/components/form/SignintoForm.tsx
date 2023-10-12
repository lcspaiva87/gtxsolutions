"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { InputCustomer } from "../ui/inputs";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../ui/Button";
import { LoadingSpinner } from "../ui/LoadingSpinner";

type FormValues = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup
    .string()
    .required("Senha obrigatória")
});
export function SignintoForm() {
  const {
    handleSubmit,
    control,
    setError,

    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function handleSignIn(data: FormValues) {

  }
  return (
    <form onSubmit={handleSubmit(handleSignIn)}  >
     <InputCustomer
        type="email"
        name="email"
        placeholder="Digite seu nome Completo"
        required
        control={control}
        className="mt-6"
        // disabled={loading}
      />
      <InputCustomer
        type="password"
        name="password"
        placeholder="Digite seu endereço de e-mail"
        required
        control={control}
        className="mt-6"
        // disabled={loading}
      />


      <Link
        href="#"
        className="ml-auto mt-[9px] block w-max text-small-label text-secondary hover:underline"
      >
        Forgot password?
      </Link>

      <Button
        className="mt-4 w-full py-3 "
        type="submit"
        disabled={false || !errors}
      >
        {false ? <LoadingSpinner className="mx-auto" /> : " Sign in"}
      </Button>
    </form>
  );
}
