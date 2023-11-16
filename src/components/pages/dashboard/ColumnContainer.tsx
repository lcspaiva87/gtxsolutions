"use client";
import { Itask } from "@/@types/Task";
import TaskCard from "@/app/dashboard/components/TaskCard";
import { toggleTaskModal } from "@/components/partials/app/kanban/store";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";

export type Id = string | number;
export type Column = {
  id: Id;
  title: string;
};

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn?: (id: Id, title: string) => void;
  createTask?: (columnId: Id) => void;
  updateTask?: (id: Id, content: string) => void;
  deleteTask: (id: number | string) => void;
  tasks: Itask[];
}

function applyPhoneMask(value: string) {
  // Remove todos os caracteres não numéricos do valor
  const numericValue = value.replace(/\D/g, "");

  // Aplica a máscara "(###) ###-####" ao valor numérico
  const maskedValue = numericValue.replace(
    /(\d{3})(\d{3})(\d{4})/,
    "($1) $2-$3"
  );

  return maskedValue;
}

function ColumnContainer({
  column,
  deleteColumn,
  updateColumn,
  tasks,
  deleteTask,
  updateTask,
}: Props) {
  const [editMode, setEditMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);
  const dispatch = useDispatch();
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
        bg-columnBackgroundColor
        opacity-40
        border-2
        border-pink-500

        max-h-[500px]
        rounded-md
        flex
        flex-col
        "
      ></div>
    );
  }

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className="bg-columnBackgroundColor w-[350px]  h-[45rem] max-h-[45rem] rounded-md flex flex-col"
      >
        {/* Column title */}
        <div className="relative flex justify-between items-center bg-white dark:bg-slate-800 rounded shadow-base px-6 py-5">
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-[2px]"
            style={{
              backgroundColor: "red",
            }}
          >

          </div>
          <div className="text-lg text-slate-900 dark:text-white font-medium capitalize">
            {column.title}
          </div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">

              <button
                className="border border-slate-200 dark:border-slate-700 dark:text-slate-400 rounded h-6 w-6 flex flex-col  items-center justify-center text-base text-slate-600"

              >
                <Icon icon="heroicons-outline:trash" />
              </button>



              <button
                className="border border-slate-200 dark:border-slate-700 dark:text-slate-400 rounded h-6 w-6 flex flex-col  items-center justify-center text-base text-slate-600"
                onClick={() =>
                  dispatch(
                    toggleTaskModal({
                      open: true,
                      columnId: column.id,
                    })
                  )
                }
              >
                <Icon icon="heroicons-outline:plus-sm" />
              </button>

          </div>
        </div>

        {/* Column task container */}
        <div className="flex flex-grow flex-col gap-4 p-[0.8rem] overflow-x-hidden overflow-y-auto">
          <SortableContext items={tasksIds}>
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                // updateTask={updateTask}
              />
            ))}
          </SortableContext>
        </div>
        {/* Column footer */}

      </div>
    </>
  );
}

export default ColumnContainer;
