import { Column } from "@/@types/Column";
import axios from "axios";

export const fetchColumns= async (): Promise<Column[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/columns`);
  const data = await response.json();
  return data;
};

export const PostColumns= async ({id,title}:Column) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/columns`,{
  id,
  title
  });
  return response

};


export const DeleteColumns= async (id:number| string) => {
  const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/columns/${id}`);
  return response

};
