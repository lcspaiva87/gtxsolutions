"use client";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import ColumnContainer from "./ColumnContainer";
import useColumns from "@/hooks/useColuns";
import { Column } from "@/@types/Column";
import { useEffect, useMemo, useState } from "react";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
export function KanbanBoard() {
  const { columns: colun } = useColumns();
  const [columns, setColumns] = useState(colun);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns])
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    // setActiveTask(null);
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;
    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;
    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
      const overColumnIndex = columns.findIndex((col) => col.id === overId);
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }
  useEffect(() => {
    setColumns(colun);
  }, [colun]);

  return (
    <div className="flex w-full items-center overflow-x-auto px-[40px]">
      <DndContext sensors={sensors} onDragEnd={onDragEnd}>
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer key={col.id} column={col} />
              ))}
            </SortableContext>
          </div>
        </div>
      </DndContext>
    </div>
  );
}
