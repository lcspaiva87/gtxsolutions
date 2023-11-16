"use client";
import { useEffect, useMemo, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import { useColumns } from "@/hooks/useColuns";
import { useTask } from "@/hooks/useTask";
import { ColumItem } from "./ColumItem";
const reorderColumnList = (sourceCol: any, startIndex: any, endIndex: any) => {
  const newTaskIds = Array.from(sourceCol.taskIds);
  const [removed] = newTaskIds.splice(startIndex, 1);
  newTaskIds.splice(endIndex, 0, removed);

  const newColumn = {
    ...sourceCol,
    taskIds: newTaskIds,
  };

  return newColumn;
};
const Column = () => {
  const { columns: columm, removeMutation: deleteColumnMutation } =
    useColumns();
  const { tasks: task, saveMutation, removeMutation } = useTask();
  const [columns, setColumns] = useState(columm);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const tasksIds = task.map((task) => task.id);
  const [tasks, setTasks] = useState(task);

  useEffect(() => {
    setColumns(columm);
  }, [columm]);
  useEffect(() => {
    setTasks(task);
  }, [task]);

  const onDragEnd = (result: any) => {
    console.log("result", result);
    const { destination, source } = result;
    console.log("source", source);
    // If user tries to drop in an unknown destination
    if (!destination) return;
    // if the user drags and drops back in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // If the user drops within the same column but in a different positoin
    console.log(columns);
    const sourceCol = columns.findIndex((col) => col.id === source.droppableId);
    const destinationCol = columns.findIndex(
      (col) => col.id === destination.droppableId
    );

    if (sourceCol === destinationCol) {
      const newColumn = reorderColumnList(sourceCol, source, destination);

      const newState = {
        ...columns,
        columns: {
          ...columns.columns,
          [newColumn.id]: newColumn,
        },
      };
      setColumns(newState);
      return;
    }

    // If the user moves from one column to another
    const startTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = startTaskIds.splice(source.index, 1);
    const newStartCol = {
      ...sourceCol,
      taskIds: startTaskIds,
    };

    const endTaskIds = Array.from(destinationCol.taskIds);
    endTaskIds.splice(destination.index, 0, removed);
    const newEndCol = {
      ...destinationCol,
      taskIds: endTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      },
    };

    setColumns(newState);
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
const initialData = {
  tasks: {
    1: { id: 1, content: "Configure Next.js application" },
    2: { id: 2, content: "Configure Next.js and tailwind " },
    3: { id: 3, content: "Create sidebar navigation menu" },
    4: { id: 4, content: "Create page footer" },
    5: { id: 5, content: "Create page navigation menu" },
    6: { id: 6, content: "Create page layout" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "TO-DO",
      taskIds: [1, 2, 3, 4, 5, 6],
    },
    "column-2": {
      id: "column-2",
      title: "IN-PROGRESS",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "COMPLETED",
      taskIds: [],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ["column-1", "column-2", "column-3"],
};
