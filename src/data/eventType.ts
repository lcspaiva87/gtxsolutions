import { del, get, post, put } from "./client/http-client";

import { AxiosResponse } from "axios";
import Cookies from "js-cookie";

interface AddEventType {
  name:string,
  description : string,
}

interface UpdatEventType {
  id: number,
  description :string,
  name:string
}



export const addEventType= async ({ description ,name }: AddEventType) => {
  const token = Cookies.get("auth_token");
  const response = await post("/event_type", { description,name}, token);
  return response;
};
export const listEventType = async () => {
  const token = Cookies.get("auth_token");
  const response:AxiosResponse = await get("/event_type",token );
  return response.data;
};

export const updateEventType = async ({ id,description,name }: UpdatEventType) => {
  const token = Cookies.get("auth_token");
  const response = await put(`/event_type/${id}`, {description,name},token);
  return response;
};

export const deleteEventType = async (id:string) => {
  const response = await del(`/event_type/${id}`);
  return response;
};


