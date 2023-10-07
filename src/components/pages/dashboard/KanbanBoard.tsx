"use client"

import ColumnContainer from "./ColumnContainer";
import useColumns from "@/hooks/useColuns";

export  function KanbanBoard() {
  const { columns} = useColumns();

  return (
    <div
      className="flex w-full items-center overflow-x-auto px-[40px]"
    >
      <div className="m-auto flex gap-4">
        <div className="flex gap-4">
          {columns.map((col) => (
            <ColumnContainer key={col.id} column={col} />
          ))}
        </div>
      </div>
    </div>
  );
}
