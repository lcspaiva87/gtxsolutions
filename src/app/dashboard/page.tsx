import { KanbanBoard } from "@/components/pages/dashboard/KanbanBoard";
import { ModalContainer } from "@/components/pages/dashboard/ModalContainer";

export default function Dashboard() {
  return (
    <>
      <ModalContainer />
      <div className="bg-gray-90 h-[45rem] w-full items-center overflow-x-auto overflow-y-auto ml-[2rem]  ">
        <KanbanBoard />
      </div>
    </>
  );
}
