import * as yup from 'yup';
import { get, post } from './client/http-client';
// Definição do esquema com yup
const FormSchema = yup.object().shape({
  email: yup.string().email().required('Digite um email válido'),
  password: yup.string().max(8).required('Digite uma senha válida'),
});

// Tipo inferido a partir do esquema do yup
type YupFormType = yup.InferType<typeof FormSchema>;
export const LoginUser = async ({email,password}:YupFormType) => {
  const response = await post('/login',{
    email,password
  })
  return response
}

export const ListnUser = async () => {
  const response = await get('/user')
  return response
}


export const RefreshToken = async (token:string) => {
  const response = await post('/refresh-token',{
    token
  })
  return response
}
