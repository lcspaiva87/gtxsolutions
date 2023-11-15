"use client";
import { Column } from "@/@types/Column";
import { Itask } from "@/@types/Task";
import TaskCard from "@/app/dashboard/TaskCard";
import { Button } from "@/components/Button";
import { FormCreateTask } from "@/components/form/CreateTask";
import AddColumn from "@/components/partials/app/kanban/AddColumn";
import { toggleColumnModal } from "@/components/partials/app/kanban/store";
import { useColumns } from "@/hooks/useColuns";
import { useTask } from "@/hooks/useTask";
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
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import ColumnContainer from "./ColumnContainer";

export function KanbanBoard() {
  const { columns: columm, removeMutation: deleteColumnMutation } =useColumns();
  const { tasks: task, saveMutation, removeMutation } = useTask();
  const [columns, setColumns] = useState(columm);
  const [tasks, setTasks] = useState(task);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Itask | null>(null);
  const dispatch = useDispatch();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );
  useEffect(() => {
    setColumns(columm);
  }, [columm]);

  useEffect(() => {
    setTasks(task);
  }, [task]);

  async function updateTaskColumn({
    id,
    columnId,
  }: {
    id: string | number;
    columnId: string | number;
  }) {
    await saveMutation.mutate({ id, columnId });
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
        const newIDColum: any = (tasks[activeIndex].columnId = overId);
        updateTaskColumn({ id, columnId: newIDColum });
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }

  async function deleteTask(id: string | number) {
    await removeMutation.mutate(id);
  }
  async function deleteColumn(id: string | number) {
    await deleteColumnMutation.mutate(id);
  }

  return (
    <div>
      {/* Header Kanban */}
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
          Task
        </h4>
        <div className="flex space-x-4 justify-end items-center rtl:space-x-reverse">
          <Button
            icon="heroicons-outline:plus"
            text="Create new task"
            className="bg-slate-800 dark:hover:bg-opacity-70   h-min text-sm font-medium text-slate-50 hover:ring-2 hover:ring-opacity-80 ring-slate-900  hover:ring-offset-1  dark:hover:ring-0 dark:hover:ring-offset-0"
            iconclassName=" text-lg"
            onClick={() => dispatch(toggleColumnModal(true))}
          />
        </div>
      </div>

      <div
        className="
      flex
      w-full
      items-center
      overflow-x-auto
      overflow-y-hidden
      pr-[7rem]
  "
      >
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
        >
          <div className="flex gap-4">
            <div className="flex gap-4">
              <SortableContext items={columnsId}>
                {columns.map((col) => (
                  <ColumnContainer
                    key={col.id}
                    deleteColumn={deleteColumn}
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
                  deleteColumn={deleteColumn}
                  // updateColumn={updateColumn}
                  // createTask={createTask}
                  deleteTask={deleteTask}
                  // updateTask={updateTask}
                  tasks={tasks.filter(
                    (task) => task.columnId === activeColumn.id
                  )}
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
      <FormCreateTask />
      <AddColumn />
    </div>
  );
}
