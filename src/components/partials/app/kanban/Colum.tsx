"use client";
import Button from "@/components/Button";
import { useColumns } from "@/hooks/useColuns";
import { useTask } from "@/hooks/useTask";
import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import ColumItem from "./ColumItem";
import kabanStore from "./store";

type Column = {
  id: string;
  title: string;
};


export default function Column() {
  const { columns: initialColumns} = useColumns();
  const { tasks: initialTasks, saveMutation, } = useTask();
  const [columns, setColumns] = useState(initialColumns);
  const [tasks, setTasks] = useState(initialTasks);
  const { toggleColumnModal } = kabanStore()

  useEffect(() => {
    setColumns([
      {
        id: "0",
        title: "Aberto",
        color: "green"
      },
      {
        id: "1",
        title: "Em andamento",
        color: "blue"
      },
      {
        id: "2",
        title: "Finalizado",
        color: "gray"
      }
    ])
  }, []);

  useEffect(() => {
    console.log(initialColumns, "initialColumns");
    // if (initialColumns) {
    //   setColumns(initialColumns);
    // }
  }, [initialColumns]);

  useEffect(() => {
    console.log(initialTasks, "initialTasks");
    // if (initialTasks) {
    //   setTasks(initialTasks);
    // }
  }, [initialTasks]);

  const filterTasks = (columnId: string) =>
    tasks.filter((task) => task.columnId === columnId);

  const onDragEnd = (result: any) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Update the columnId of the task
    const task = tasks.find((task) => task.id === result.draggableId);
    if (task) {
      saveMutation.mutate({ id: task.id, columnId: destination.droppableId });
      task.columnId = destination.droppableId;
    }

    // setColumns(updatedColumns)
  };

  return (
    <>
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
          Registros de Ocorrências
        </h4>
        <div className="flex space-x-4 justify-end items-center rtl:space-x-reverse">
          <Button
            type="button"
            icon="heroicons-outline:plus"
            text="Criar nova ocorrência"
            className="bg-slate-800 dark:hover:bg-opacity-70   h-min text-sm font-medium text-slate-50 hover:ring-2 hover:ring-opacity-80 ring-slate-900  hover:ring-offset-1  dark:hover:ring-0 dark:hover:ring-offset-0"
            iconClass=" text-lg"
            onClick={() => toggleColumnModal(true)}
          />
        </div>
      </div>
      <div className="  flex w-full items-center overflow-x-auto overflow-y-hidden pr-[7rem]">
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
      </div>

      {!columns?.length && (
        <div className="w-full flex h-[45rem] lg:h-[35rem] justify-center items-center ">
          <div className="flex items-center justify-center">
            <span>Não existem status disponível</span>
          </div>
        </div>
      )}
    </>
  );
}
