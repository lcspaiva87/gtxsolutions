import { del, get, post, put } from "./client/http-client";

import { AxiosResponse } from "axios";
import Cookies from "js-cookie";

interface AddCamera {
  name: string,

}

interface UpdateCameras {
  id: number,
  name:string,
}



export const addDepartments= async ({ name }: AddCamera) => {
  const token = Cookies.get("auth_token");
  console.log("token", token)
  const response = await post("/departments", { name}, token);

  return response;
};
export const listDepartments = async () => {
  const token = Cookies.get("auth_token");
  const response:AxiosResponse = await get("/departments",token );
  return response.data;
};




export const updateDepartments = async ({ id,name}: UpdateCameras) => {
  const response = await put(`/departments/${id}`, {name});
  return response;
};

export const  deleteDepartments = async (id:string) => {
  const response = await del(`/departments/${id}`);
  return response;
};


