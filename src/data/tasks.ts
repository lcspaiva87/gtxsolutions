import { taskProps } from "@/@types/Task";
import axios from "axios";

export const fetchTask= async (): Promise<taskProps[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/task`);
  const data = await response.json();
  return data;
};

export const postTask= async ({camera,company,file,message,phone,responsible,avatar,columnId,id,priority}:taskProps) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/task`,{
   camera,company,message,priority,id,columnId,phone,responsible,avatar,file
  });
  return response

};
export const deleteTasID= async (id:number | string) => {
  const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/task/${id}`);
  return response

};
export const pathTask= async ({id, columnId }:{id:string | number ,columnId:string  | number}) => {

  const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/task/${id}`,{
    columnId:columnId,

  });
  return response
};
