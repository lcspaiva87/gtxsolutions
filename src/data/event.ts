import { del, get, post } from "./client/http-client";

import { AxiosResponse } from "axios";
import Cookies from "js-cookie";

interface AddEvent {
  description : string,
}

interface UpdatEvent {
  id: number,
  description :string,
}



export const addEvent= async ({ description  }: AddEvent) => {
  const token = Cookies.get("auth_token");
  const response = await post("/event_origin", { description}, token);
  return response;
};
export const listEvent = async () => {
  const token = Cookies.get("auth_token");
  const response:AxiosResponse = await get("/event_origin",token );
  return response.data;
};

export const updateEvent = async ({ id,description }: UpdatEvent) => {
  const response = await post(`/event_origin/${id}`, {description});
  return response;
};

export const deleteEvent = async (id:string) => {
  const response = await del(`/event_origin/${id}`);
  return response;
};


