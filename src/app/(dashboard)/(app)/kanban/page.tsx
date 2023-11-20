import Column from "@/components/partials/app/kanban/Colum";
import { Metadata } from "next";
import dynamic from "next/dynamic";
export const metadata: Metadata = {
  title: 'Kanban',
}


export default function Kanban() {
  const AddColumn = dynamic(
    () => import('@/components/partials/app/kanban/AddColumn'),
    {
      ssr: false,
    },
  )
  return (
    <>
      <Column />
      <AddColumn />
    </>
  );
}
