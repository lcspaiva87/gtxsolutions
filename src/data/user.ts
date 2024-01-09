import * as yup from "yup";
import { get, post } from "./client/http-client";

import Cookies from "js-cookie";

// Definição do esquema com yup
const FormSchema = yup.object().shape({
  email: yup.string().email().required("Digite um email válido"),
  password: yup.string().max(8).required("Digite uma senha válida"),
});

interface RefreshToken {
  expiresIn: number;
  userId: string;
}

interface TokenData {
  token: string;
  newRefreshToken: RefreshToken;
}

interface AddUser {
  email: string,
  password: string,
}

interface UpdateUser {
  id: number,
  email?: string,
  password?: string,
}

// Tipo inferido a partir do esquema do yup
type YupFormType = yup.InferType<typeof FormSchema>;
export const LoginUser = async ({ email, password }: YupFormType) => {
  const response = await post("/authentication/login", {
    email,
    password,
  });
  return response;
};

export const ListnUser = async () => {
  const response = await get("/users", );
  return response;
};


export const addUser = async ({ email, password }: AddUser) => {
  const token = Cookies.get("auth_token");
  console.log("token", token)
  const response = await post("/users", { email, password }, token);

  return response;
};

export const updateUser = async ({ id, email, password }: UpdateUser) => {
  const response = await post(`/users/${id}`, { email, password });
  return response;
};

export const RefreshToken = async (token: string) => {
  const response = await post<TokenData>("/refresh-token", {
    refresh_token: token,
  });
  return response;
};
