import { useState } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Icons } from "@/components/icons";
import { taskProps } from "@/@types/Task";
import * as Avatar from "@radix-ui/react-avatar";
export type Id = string | number;

export type Column = {
  id: Id;
  title: string;
};

interface Props {
  task: taskProps;
  // deleteTask: (id: Id) => void;
  // updateTask: (id: Id, content: string) => void;
}

function TaskCard({ task }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
        opacity-30
      bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-rose-500  cursor-grab relative
      "
      />
    );
  }

  // if (editMode) {
  //   return (
  //     <div
  //       ref={setNodeRef}
  //       style={style}
  //       {...attributes}
  //       {...listeners}
  //       className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative"
  //     >
  //       <div className="w-full resize-none border-none rounded bg-transparent text-white focus:outline-none">
  //         {/* <textarea
  //           className=" w-full resize-none border-none rounded bg-transparent text-white focus:outline-none"
  //           value={task.message}
  //           autoFocus
  //           placeholder="Task content here"
  //           onBlur={toggleEditMode}
  //           onKeyDown={(e) => {
  //             if (e.key === "Enter" && e.shiftKey) {
  //               toggleEditMode();
  //             }
  //           }}

  //           // onChange={(e) => updateTask(task.id, e.target.value)}
  //         /> */}
  //         <Avatar.Root className="AvatarRoot">
  //           <Avatar.Fallback className="mx-auto object-cover rounded-full h-6 w-6 bg-gray-200 p-1 ">
  //             PD
  //           </Avatar.Fallback>
  //         </Avatar.Root>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[210px] flex flex-col  rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative task"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      <div className="">
        <span className="bg-red-200 w-10 text-center rounded-lg text-red-400  block m-1 p-0.5 ">
          hard
        </span>
      </div>

      <p className="my-auto m-1  w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        {task.message}
      </p>
      <div className="flex justify-between m-1 p-0.5">
        <div className="flex items-center gap-2">
          <Icons.Chat className="text-sm" />
          <span className="text-white">1</span>
        </div>
        <Avatar.Root className="AvatarRoot">
          <Avatar.Fallback className="mx-auto object-cover rounded-full w-2 h-2 bg-gray-200 p-1 text-sm ">
            PD
          </Avatar.Fallback>
        </Avatar.Root>
      </div>

      {mouseIsOver && (
        <>
          <button
            // onClick={() => {
            //   deleteTask(task.id);
            // }}
            className="stroke-white absolute right-4 top-1/3 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100"
          >
            <Icons.EditIcon className="w-6" />
          </button>
          <button
            // onClick={() => {
            //   deleteTask(task.id);
            // }}
            className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100"
          >
            <Icons.TrashIcon className="w-6" />
          </button>
        </>
      )}
    </div>
  );
}

export default TaskCard;
