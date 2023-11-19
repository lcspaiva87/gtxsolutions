'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import Button from '../ui/Button'
import { Input } from '../ui/Input'
import { LoadingSpinner } from '../ui/LoadingSpinner'

type FormValues = {
  email: string
  password: string
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
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
      password: '',
    },
  })
  async function handleSignIn(data: FormValues) {}
  return (
    <form onSubmit={handleSubmit(handleSignIn)}>
      <Input
        type="email"
        name="email"
        placeholder="Digite seu nome Completo"
        required
        control={control}
        className="mt-6"
        // disabled={loading}
      />
      <Input
        type="password"
        name="password"
        placeholder="Digite sua senha"
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
        {false ? <LoadingSpinner className="mx-auto" /> : ' Sign in'}
      </Button>
    </form>
  )
}
