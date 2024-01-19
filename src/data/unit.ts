import { del, get, post, put } from "./client/http-client";

import { IUser } from "@/@types/Use";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";

interface AddUnit {
  email: string,
  name: string,
}
interface UpdateUnit {
  id:string,
  email: string,
  name: string,
}

export const addUnit= async ({ email,name }: AddUnit) => {
  const token = Cookies.get("auth_token");
  console.log("token", token)
  const response = await post<IUser>("/units", { email,name}, token);

  return response;
};
export const ListnUnit = async () => {
  const token = Cookies.get("auth_token");
  const response:AxiosResponse = await get("/units",token );
  return response.data;
};

export const updateUnit= async ({id, email,name}: UpdateUnit) => {
  const response = await put(`/units/${id}`, { email,name});
  return response;
};

export const deleteUnit = async (id:string) => {
  const response = await del(`/units/${id}`);
  return response;
};


