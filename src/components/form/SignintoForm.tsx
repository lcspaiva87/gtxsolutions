'use client'
import { useForm } from "react-hook-form";
import Link from "next/link";
import { InputCustomer } from "../ui/inputs";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from "../ui/Button";
import { LoadingSpinner } from "../ui/LoadingSpinner";

type FormValues = {
  email: string;
  password: string
};


const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória').min(8, 'A senha deve ter pelo menos 8 caracteres'),

})
export function SignintoForm() {
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: ""
    }
  });
  return (
    <form  className="mt-6">
      <InputCustomer
        type="email"
        name="email"
        placeholder="Email"
        required
        control={control}
         //disabled={loading}
      />
    <InputCustomer
        type="password"
        name="password"
        placeholder="Password"
        className="mt-6"
        required
        control={control}
        //disabled={loading}
      />
       <Link
        href="#"
        className="ml-auto mt-[9px] block w-max text-small-label text-secondary hover:underline"
      >
        Forgot password?
      </Link>

      <Button
        className="mt-4 w-full py-3"
        type="submit"
        disabled={false || !errors}
      >

        {false ? (
          <LoadingSpinner className="mx-auto" />
        ) : (
          " Sign in"
        )}

      </Button>
    </form>
  );
}
