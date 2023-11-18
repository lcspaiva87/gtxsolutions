import { Itask } from "@/@types/Task";
import { del, get, post, put } from "./client/http-client";

export const fetchTask= async (): Promise<Itask[]> => {
  const response = await get(`/task`);
  return response;
};

export const postTask= async ({camera,company,file,message,phone,responsible,avatar,columnId,id,priority}:Itask) => {
  const response = await post(`${process.env.NEXT_PUBLIC_BASE_URL}/task`,{
   camera,company,message,priority,id,columnId,phone,responsible,avatar,file
  });
  return response

};
export const deleteTaskId= async (id:number | string) => {
  const response = await del(`/task/${id}`);
  return response

};
export const pathTask= async ({id, columnId }:{id:string | number ,columnId:string  | number}) => {

  const response = await put(`/task/${id}`,{
    columnId:columnId,
  });
  return response
};
