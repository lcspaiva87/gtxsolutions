
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
  const Column = dynamic(
    () => import('@/components/partials/app/kanban/Colum'),
    {
      ssr: false,
    },
  )
  return (
    <>
      <Column />
      {/* <AddColumn /> */}
    </>
  );
}
