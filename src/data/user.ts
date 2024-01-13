import * as yup from "yup";
import { get, post } from "./client/http-client";

import { IUser } from "@/@types/Use";
import { AxiosResponse } from "axios";
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
  name: string,
  email: string,
  password: string,
}

interface UpdateUser {
  id: number,
  name?: string,
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
  const token = Cookies.get("auth_token");
  const response:AxiosResponse<IUser[]> = await get<IUser>("/users",token );
  return response.data;
};


export const addUser = async ({ name, email, password }: AddUser) => {
  const token = Cookies.get("auth_token");
  console.log("token", token)
  const response = await post<IUser>("/users", { name, email, password }, token);

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
