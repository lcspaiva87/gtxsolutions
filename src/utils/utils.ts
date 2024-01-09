import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export function generatePassword(length: number) {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]|:;<>,.?/';
  let password = '';

  for (let i = 0; i < length; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    password += caracteres.charAt(indiceAleatorio);
  }

  return password;
}
