"use client";
import Button from "@/components/Button";
import kabanStore from "./store";

type Column = {
  id: string;
  title: string;
};


export default function Column() {
  const { toggleColumnModal } = kabanStore()



  // const filterTasks = (columnId: string) =>
  //   tasks.filter((task) => task.columnId === columnId);
  // const onDragEnd = (result: any) => {
  //   const { destination, source } = result;

  //   if (!destination) return;

  //   if (
  //     destination.droppableId === source.droppableId &&
  //     destination.index === source.index
  //   ) {
  //     return;
  //   }

  //   // Update the columnId of the task
  //   const task = tasks.find((task) => task.id === result.draggableId);
  //   if (task) {
  //     saveMutation.mutate({ id: task.id, columnId: destination.droppableId });
  //     task.columnId = destination.droppableId;
  //   }

  //   // setColumns(updatedColumns)
  // };
  return (
    <>
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
          Task
        </h4>
        <div className="flex space-x-4 justify-end items-center rtl:space-x-reverse">
          <Button
            type="button"
            icon="heroicons-outline:plus"
            text="Create new task"
            className="bg-slate-800 dark:hover:bg-opacity-70   h-min text-sm font-medium text-slate-50 hover:ring-2 hover:ring-opacity-80 ring-slate-900  hover:ring-offset-1  dark:hover:ring-0 dark:hover:ring-offset-0"
            iconClass=" text-lg"
            onClick={() => toggleColumnModal(true)}
          />
        </div>
      </div>
      {/* <div className="  flex w-full items-center overflow-x-auto overflow-y-hidden pr-[7rem]">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-4">
            {columns.map((column) => {
              // Filtra as tarefas correspondentes a esta coluna
              const tasksInColumn = filterTasks(column.id);
              return (
                <ColumItem
                  key={column.id}
                  column={column}
                  tasks={tasksInColumn}
                />
              );
            })}
          </div>
        </DragDropContext>
      </div> */}

      {/* {!columns?.length && (
        <div className="w-full flex h-[45rem] lg:h-[35rem] justify-center items-center ">
          <div className="flex items-center justify-center">
            <span>nao tem task disponivel</span>
          </div>
        </div>
      )} */}
    </>
  );
}
