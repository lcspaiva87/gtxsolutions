"use client";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import ColumnContainer from "./ColumnContainer";
import useColumns from "@/hooks/useColuns";
import { Column } from "@/@types/Column";
import { useEffect, useMemo, useState } from "react";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import useTask from "@/hooks/useTask";
import { deleteTasID, pathTask, } from "@/data/tasks";
import { taskProps } from "@/@types/Task";
import { createPortal } from "react-dom";
import TaskCard from "@/app/dashboard/TaskCard";

export function KanbanBoard() {
  const { columns: colun } = useColumns();
  const { task, refetch } = useTask();
  const [columns, setColumns] = useState(colun);

  const [tasks, setTasks] = useState(task);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<taskProps | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );
  useEffect(() => {
    setColumns(colun);
  }, [colun]);
  useEffect(() => {
    setTasks(task);
  }, [task]);

  async function updateTaskColumn({id, columnId ,}:{id:string | number ,columnId:string  | number}) {
   await pathTask({id, columnId})
    refetch();
  }


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
  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }
  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          // Fix introduced after video recording
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";
    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId;
        const { id } = tasks[activeIndex];
        const newIDColum:any = tasks[activeIndex].columnId = overId
        updateTaskColumn({id,columnId:newIDColum })
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }

  async function deleteTask(id: string | number) {
    await deleteTasID(id);
    refetch();
  }
  return (
    <div className="flex w-full items-center px-[40px]  ">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteTask={deleteTask}
                  tasks={task.filter((task) => task.columnId === col.id)}
                />
              ))}
            </SortableContext>
          </div>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                // deleteColumn={deleteColumn}
                // updateColumn={updateColumn}
                // createTask={createTask}
                deleteTask={deleteTask}
                // updateTask={updateTask}
                tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                // updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}
