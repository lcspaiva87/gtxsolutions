import { toggleTaskModal } from "@/components/partials/app/kanban/store";
import Dropdown from "@/components/ui/Dropdown";
import { Menu } from "@headlessui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import * as Separator from "@radix-ui/react-separator";

import { Card } from "@/components/ui/Card";
import { title } from "process";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";

const Column = ({ column, tasks }: any) => {
  const dispatch = useDispatch();
  return (
    <div className="bg-columnBackgroundColor w-[350px]  h-[45rem] max-h-[45rem] rounded-md flex flex-col">
      {/* Column title */}
      <div className="relative flex justify-between items-center bg-white dark:bg-slate-800 rounded shadow-base px-6 py-5">
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-[2px]"
          style={{
            backgroundColor: "red",
          }}
        />
        <div className="text-lg text-slate-900 dark:text-white font-medium capitalize">
          {column.title}
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <button className="border border-slate-200 dark:border-slate-700 dark:text-slate-400 rounded h-6 w-6 flex flex-col  items-center justify-center text-base text-slate-600">
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
      <div className=""></div>
      <div className="flex flex-grow flex-col gap-4 p-[0.8rem] overflow-x-hidden overflow-y-auto">
        <Droppable droppableId={column.id}>
          {(droppableProvided, droppableSnapshot) => (
            <div
              className="flex flex-col gap-4 p-[0.8rem] overflow-x-hidden overflow-y-auto"
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
            >
              {tasks.map((task: any, index: any) => (
                <Draggable
                  key={task.id}
                  draggableId={`${task.id}`}
                  index={index}
                >
                  {(draggableProvided, draggableSnapshot) => (
                    <div
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                    >
                      <Card className=" bg-mainBackgroundColor  flex flex-col  rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative task">
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
                                // onClick={() =>
                                //   dispatch(
                                //     toggleEditModal({
                                //       editModal: true,
                                //       task,
                                //     })
                                //   )
                                // }
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
                                <Menu.Item
                                // onClick={() => dispatch(deleteTask(id))}
                                >
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
                        <div className="text-slate-600 dark:text-slate-400 text-sm pt-4 pb-8">
                          kgjkgjkgrjkjgrkgrjkjgrk
                        </div>
                        <div className="flex space-x-4 rtl:space-x-reverse">
                          {/* start date */}
                          <div>
                            <span className="block date-label">Start date</span>
                            <span className="block date-text">Start date</span>
                          </div>
                          {/* end date */}
                          <div>
                            <span className="block date-label">Start date</span>
                            <span className="block date-text">Start date</span>
                          </div>
                        </div>
                        <Separator.Root
                          orientation="vertical"
                          className="bg-red-900 h-[1px] mt-3"
                        />
                        <div className="grid grid-cols-2 gap-4 mt-6">
                          {/* assignee */}
                          <div>
                            <div className="text-slate-400 dark:text-slate-400 text-sm font-normal mb-3">
                              Assigned to
                            </div>
                            <div className="flex justify-start -space-x-1.5 rtl:space-x-reverse">
                              {/* {assignee?.map(
                                (
                                  user: {
                                    image: string | undefined;
                                    label: string | undefined;
                                  },
                                  userIndex: Key | null | undefined
                                ) => (
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
                                )
                              )} */}
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

                              <span>days left</span>
                            </span>
                          </div>
                        </div>
                      </Card>
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default Column;
