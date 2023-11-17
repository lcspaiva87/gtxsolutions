"use client";
import { Button } from "@/components/button";
import AddColumn from "@/components/partials/app/kanban/AddColumn";
import { toggleColumnModal } from "@/components/partials/app/kanban/store";
import { useDispatch } from "react-redux";
import Column from "./components/Colum";




export default function Kaban() {

  const dispatch = useDispatch();

  return (
    <>
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
      <Column />
      <AddColumn/>
    </>
  );
}
