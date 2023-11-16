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
  const [columns, setColumns] = useState(initialColum);
  const [tasks, setTasks] = useState(initialTask);
  console.log("columns",columns)
  useEffect(() => {
    setColumns(columm);
  }, [columm]);
  useEffect(() => {
    setTasks(task);
  }, [task]);

  const onDragEnd = (result: any) => {
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

const initialColum =[
  {
    "id": "container-555671e6-665d-415d-a6de-1a692f92c48",
    "title": "Todo"
  },
  {
    "id": "container-555671e6-665d-415d-a6de-1a692f92c4",
    "title": "Work in progress"
  }
]
const initialTask =[{
  "user": "dev",
  "columnId": "container-555671e6-665d-415d-a6de-1a692f92c48",
  "message": "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
  "avatar": "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80",
  "priority": "hard",
  "company": "44545",
  "id": "container-11a2883b-8246-49ac-aced-9f99fbab3b20",
  "title": "Fazer o almoço",
  "startDate": "2018-01-01",
  "endDate": "2018-01-01",
  "assignee": [
    {
      "image": "/assets/images/avatar/av-1.svg",
      "title": "Mahedi Amin"
    },
    {
      "image": "/assets/images/avatar/av-2.svg",
      "title": "Sovo Haldar"
    },
    {
      "image": "/assets/images/avatar/av-3.svg",
      "title": "Rakibul Islam"
    }
  ]
},
{
  "user": "dev 1",
  "title": "Fazer a tela de mensagem",
  "columnId": "container-555671e6-665d-415d-a6de-1a692f92c48",
  "message": "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
  "avatar": "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80",
  "priority": "hoje",
  "company": "tem",
  "id": "container-d61d45b7-3ddb-471d-a57f-f1b4f56e217c",
  "startDate": "2018-01-01",
  "endDate": "2018-01-01",
  "assignee": [
    {
      "image": "/assets/images/avatar/av-1.svg",
      "title": "Mahedi Amin"
    },
    {
      "image": "/assets/images/avatar/av-2.svg",
      "title": "Sovo Haldar"
    },
    {
      "image": "/assets/images/avatar/av-3.svg",
      "title": "Rakibul Islam"
    }
  ]
}]
