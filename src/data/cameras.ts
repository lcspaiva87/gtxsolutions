import { del, get, post } from "./client/http-client";

import { IUser } from "@/@types/Use";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";

interface AddCamera {
  ip:string,
  description: string,
  site: string,
  id_camera_group: string,
}

interface UpdateCameras {
  id: number,
  ip:string,
  description?: string,
  site?: string,
  id_camera_group?: string,
}



export const addCamera= async ({ description,id_camera_group,ip,site }: AddCamera) => {
  const token = Cookies.get("auth_token");
  console.log("token", token)
  const response = await post<IUser>("/cameras", { description,id_camera_group,ip,site}, token);

  return response;
};
export const ListCameras = async () => {
  const token = Cookies.get("auth_token");
  const response:AxiosResponse = await get("/cameras",token );
  return response.data;
};




export const updateCamera = async ({ id,ip,description,id_camera_group,site}: UpdateCameras) => {
  const response = await post(`/cameras/${id}`, { ip,description,id_camera_group,site});
  return response;
};

export const deleteCamera = async (id:string) => {
  const response = await del(`/cameras/${id}`);
  return response;
};


