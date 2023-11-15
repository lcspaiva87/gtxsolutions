import { Itask } from "@/@types/Task";
import { toggleEditModal } from "@/components/partials/app/projects/store";
import { Card } from "@/components/ui/Card";
import Dropdown from "@/components/ui/Dropdown";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Menu } from "@headlessui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import * as Separator from "@radix-ui/react-separator";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export type Id = string | number;
export type Column = {
  id: Id;
  title: string;
};

interface Props {
  task: Itask;
  deleteTask: (id: string | number) => void;
  // updateTask: (id: Id, content: string) => void;
}

function TaskCard({ task, deleteTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const { title, user, message, startDate, endDate, assignee } = task;
  const [editMode, setEditMode] = useState(false);
  const [start, setStart] = useState(new Date(Number(startDate)));
  const [end, setEnd] = useState(new Date(endDate));
  const [totaldays, setTotaldays] = useState(0);

  useEffect(() => {
    const diffTime = Math.abs(Number(end) - Number(start));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setTotaldays(diffDays);
  }, [start, end]);
  const dispatch = useDispatch();
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

  return (
    <div
    ref={setNodeRef}
    style={style}
    {...attributes}
    {...listeners}
    onClick={toggleEditMode}>
 <Card
    className=" bg-mainBackgroundColor  flex flex-col  rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative task"

    >
      <header className="flex justify-between items-end">
        <div className="flex space-x-4 items-center rtl:space-x-reverse">
          <div className="flex-none">
            <div className="h-10 w-10 rounded-md text-lg bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-200 flex flex-col items-center justify-center font-normal capitalize">
              {title.charAt(0) + title.charAt(1)}
            </div>
          </div>
          <div className="font-medium text-base leading-6">
            <div className="dark:text-slate-200 text-slate-900 max-w-[160px] truncate">
              {title}
            </div>
          </div>
        </div>
        <div>
          <Dropdown
            classMenuItems=" w-[130px]"
            label={
              <span className="text-lg inline-flex flex-col items-center justify-center h-8 w-8 rounded-full bg-gray-500-f7 dark:bg-slate-900 dark:text-slate-400">
                <Icon icon="heroicons-outline:dots-vertical" />
              </span>
            }
          >
            <div>
              <Menu.Item
                onClick={() =>
                  dispatch(
                    toggleEditModal({
                      editModal: true,
                      task,
                    })
                  )
                }
              >
                <div
                  className="hover:bg-slate-900 dark:hover:bg-slate-600 dark:hover:bg-opacity-70 hover:text-white
                   w-full border-b border-b-gray-500 border-opacity-10   px-4 py-2 text-sm dark:text-slate-300  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center
                     capitalize rtl:space-x-reverse"
                >
                  <span className="text-base">
                    <Icon icon="heroicons-outline:pencil-alt" />
                  </span>
                  <span>Edit</span>
                </div>
              </Menu.Item>
              <Menu.Item onClick={() => dispatch(deleteTask(id))}>
                <div
                  className="hover:bg-slate-900 dark:hover:bg-slate-600 dark:hover:bg-opacity-70 hover:text-white
                   w-full border-b border-b-gray-500 border-opacity-10   px-4 py-2 text-sm dark:text-slate-300  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center
                     capitalize rtl:space-x-reverse"
                >
                  <span className="text-base">
                    <Icon icon="heroicons-outline:trash" />
                  </span>
                  <span>Delete</span>
                </div>
              </Menu.Item>
            </div>
          </Dropdown>
        </div>
      </header>
      {/* description */}
      <div className="text-slate-600 dark:text-slate-400 text-sm pt-4 pb-8">
        {message}
      </div>
      {/* assignee */}
      <div className="flex space-x-4 rtl:space-x-reverse">
        {/* start date */}
        <div>
          <span className="block date-label">Start date</span>
          <span className="block date-text">{startDate}</span>
        </div>
        {/* end date */}
        <div>
          <span className="block date-label">Start date</span>
          <span className="block date-text">{endDate}</span>
        </div>
      </div>
      <Separator.Root
        orientation="vertical"
        className="bg-red-900 h-[1px] mt-3"
      />
      {/* assignee and total date */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {/* assignee */}
        <div>
          <div className="text-slate-400 dark:text-slate-400 text-sm font-normal mb-3">
            Assigned to
          </div>
          <div className="flex justify-start -space-x-1.5 rtl:space-x-reverse">
            {assignee?.map((user, userIndex) => (
              <div
                className="h-6 w-6 rounded-full ring-1 ring-slate-100"
                key={userIndex}
              >
                <img
                  src={user.image}
                  alt={user.label}
                  className="w-full h-full rounded-full"
                />
              </div>
            ))}
            <div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-300 text-xs ring-2 ring-slate-100 dark:ring-slate-700 rounded-full h-6 w-6 flex flex-col justify-center items-center">
              +2
            </div>
          </div>
        </div>

        {/* total date */}
        <div className="ltr:text-right rtl:text-left">
          <span className="inline-flex items-center space-x-1 bg-danger-500 bg-opacity-[0.16] text-danger-500 text-xs font-normal px-2 py-1 rounded-full rtl:space-x-reverse">
            <span>
              {" "}
              <Icon icon="heroicons-outline:clock" />
            </span>
            <span>{totaldays}</span>
            <span>days left</span>
          </span>

        </div>
      </div>
    </Card>

    </div>

  );
}

export default TaskCard;
