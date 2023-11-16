"use client";
import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import { useColumns } from "@/hooks/useColuns";
import { useTask } from "@/hooks/useTask";
import { ColumItem } from "./ColumItem";
type Column = {
  id: string;
  title:string
};
type Assignee = {
  image: string;
  title: string;
 };

 type Task = {
  user: string;
  columnId: string;
  message: string;
  avatar: string;
  priority: string;
  company: string;
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  assignee: Assignee[];
 };
 const reorderColumnList = (
  columns: Column[],
  tasks: Task[],
  sourceColId: string,
  destinationColId: string,
  startIndex: number,
  endIndex: number
 ) => {
  let removed:any; // Define removed here

  const updatedColumns = columns.map((col) => {
    if (col.id === sourceColId) {
      const sourceTasks = tasks.filter((task) => task.columnId === sourceColId);
      [removed] = sourceTasks.splice(startIndex, 1);

      return { ...col, tasks: sourceTasks };
    } else if (col.id === destinationColId) {
      const destinationTasks = tasks.filter((task) => task.columnId === destinationColId);
      destinationTasks.splice(endIndex, 0, removed);

      return { ...col, tasks: destinationTasks };
    }

    return col;
  });

  return updatedColumns;
 };

const Column = () => {
  const { columns: columm, removeMutation: deleteColumnMutation } =
    useColumns();
  const { tasks: task, saveMutation, removeMutation } = useTask();
  const [columns, setColumns] = useState(columm);
  const [tasks, setTasks] = useState(task);
  console.log("columns",columns)
  useEffect(() => {
    setColumns(columm);
  }, [columm]);
  useEffect(() => {
    setTasks(task);
  }, [task]);

  const onDragEnd =  (result: any) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const updatedColumns = reorderColumnList(
      columns,
      tasks,
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index
    );

    // Update the columnId of the task
    const task = tasks.find(task => task.id === result.draggableId);
    if (task) {
      saveMutation.mutate({ id: task.id, columnId: destination.droppableId });
      task.columnId = destination.droppableId;
    }

    setColumns(updatedColumns);
   };
  return (
    <div className="  flex w-full items-center overflow-x-auto overflow-y-hidden pr-[7rem]">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4">
          {columns.map((column) => {
            // Filtra as tarefas correspondentes a esta coluna
            const tasksInColumn = task.filter(
              (task) => task.columnId === column.id
            );

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
  );
};

export default Column;
