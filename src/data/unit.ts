import { del, get, post } from "./client/http-client";

import { IUser } from "@/@types/Use";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";

interface AddUnit {
  email: string,
  password: string,
}

interface UpdateUnit {
  id:string,
  email: string,
  password: string,
}



export const addUnit= async ({ email,password }: AddUnit) => {
  const token = Cookies.get("auth_token");
  console.log("token", token)
  const response = await post<IUser>("/units", { email,password}, token);

  return response;
};
export const ListnUnit = async () => {
  const token = Cookies.get("auth_token");
  const response:AxiosResponse = await get("/units",token );
  return response.data;
};




export const updateUnit= async ({ email,id,password}: UpdateUnit) => {
  const response = await post(`/units/${id}`, { email,password});
  return response;
};

export const deleteUnit = async (id:string) => {
  const response = await del(`/units/${id}`);
  return response;
};


