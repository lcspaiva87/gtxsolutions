"use client";
import { IList } from "@/@types/ListForms";
import Icons from "@/components/ui/Icon";
import Image from "next/image";
import { useState } from "react";
interface ItoogleModal{
  modalAction: "create" | "update",
  isOpenModal: boolean,
}
interface ContactProps {
  contact: IList;
  onDelete: (id: string) => void;
  toggleModal: (open: ItoogleModal["isOpenModal"], action: ItoogleModal["modalAction"]) => void
}

const Contacts = ({ contact, onDelete,toggleModal }: ContactProps) => {
  const { name, id } = contact;
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);


  const handleClick = () => {
    setIsOpenConfirmDelete(!isOpenConfirmDelete);
  };

  const style = {
    backgroundColor: isOpenConfirmDelete ? "red" : "", // Altere para a cor que deseja quando clicado
  };

  return (
    <>
      <div className="relative block w-full py-5 focus:ring-0 outline-none cursor-pointer group transition-all duration-150 hover:bg-slate-100 dark:hover:bg-slate-600 dark:hover:bg-opacity-70">
        <div className="flex space-x-3 px-6 rtl:space-x-reverse">
          <div className="flex-none">
            <div className="h-10 w-10 rounded-full relative">
              <Image
                width={100}
                height={100}
                src="/assets/images/users/avatar.png"
                alt={name}
                className="block w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <div className="flex-1 text-start flex">
            <div className="flex-1">
              <span className="block text-slate-800 dark:text-slate-300 text-sm font-medium mb-[2px]">
                {name}
              </span>
            </div>
            <div className="flex-none ltr:text-right rtl:text-end flex gap-2 items-center">
              <div
                className="h-7 w-7 bg-slate-100 dark:bg-black-450 dark:hover:bg-white dark:text-slate-400 dark:hover:text-black flex flex-col justify-center items-center text-xl rounded-full cursor-pointer"
                onClick={() => {
                  toggleModal(true, "update");
                }}
              >
                <Icons icon="heroicons-outline:pencil" width="18" />
              </div>
              <div
                style={style}
                onClick={handleClick}
                className="h-7 w-7 bg-slate-100 dark:bg-black-450 dark:hover:bg-white dark:text-slate-400 dark:hover:text-black flex flex-col justify-center items-center text-xl rounded-full cursor-pointer hover:"
              >
                <Icons icon="heroicons-outline:trash" width="20" />
              </div>
            </div>
          </div>
        </div>

        {isOpenConfirmDelete && (
          <div className="bg-red-600 block h-full w-full focus:ring-0 outline-none group transition-all duration-150 absolute flex justify-center top-0 flex-col opacity-90">
            <div className="flex space-x-3 px-6 rtl:space-x-reverse">
              <div className="flex-none">
                <div className="-10 rounded-full relative">
                  <span>Deseja mesmo excluir?</span>
                </div>
              </div>
              <div className="flex-1 text-start flex">
                <div className="flex-1">
                  <span className="block text-slate-800 dark:text-slate-300 text-sm font-medium mb-[2px]"></span>
                </div>
                <div className="flex-none ltr:text-right rtl:text-end flex gap-2">
                  <button
                    onClick={() => {
                      onDelete(String(id)), setIsOpenConfirmDelete(false);
                    }}
                    className=" text-xs  cursor-pointer bg-gray-100 rounded-md px-[1rem] text-white bg-transparent border border-white hover:border-black hover:bg-white hover:text-black-900"
                  >
                    sim
                  </button>
                  <button
                  onClick={() => setIsOpenConfirmDelete(false)}

                  className=" text-xs  cursor-pointer bg-gray-100 rounded-md px-[1rem] text-white bg-transparent border border-white hover:border-black hover:bg-white hover:text-black-900">
                    não
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Contacts;
