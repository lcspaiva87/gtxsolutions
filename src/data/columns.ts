import { Column } from "@/@types/Column";
import { del, get, post } from "./client/http-client";

export const fetchColumns= async (): Promise<Column[]> => {
  const response = await get(`${process.env.NEXT_PUBLIC_BASE_URL}/columns`);
  const data = await response.json();
  return data;
};

export const PostColumns= async ({id,title}:Column) => {
  const response = await post(`${process.env.NEXT_PUBLIC_BASE_URL}/columns`,{
  id,
  title
  });
  return response

};

export const DeleteColumns= async (id:number| string) => {
  const response = await del(`${process.env.NEXT_PUBLIC_BASE_URL}/columns/${id}`);
  return response

};
