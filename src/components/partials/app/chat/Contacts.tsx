"use client";
import Icons from "@/components/ui/Icon";
import Image from "next/image";
import { useState } from "react";

interface IContact {
  id: number;
  fullName: string;
  role: string;
  lastmessage: string;
  lastmessageTime: string;
  unredmessage: number;
  avatar: string;
  status: string;
}

const Contacts = ({ contact }: { contact: IContact }) => {
  const { avatar, fullName, lastmessage, status, unredmessage } = contact;
  const [isClicado, setIsClicado] = useState(false);

  const handleClick = () => {
    setIsClicado(!isClicado);
  };

  const style = {
    backgroundColor: isClicado ? "red" : "", // Altere para a cor que deseja quando clicado
  };
  //block w-full py-5 focus:ring-0 outline-none cursor-pointer group transition-all duration-150 hover:bg-slate-100 :hover:bg-red-900 dark:hover:bg-opacity-70
  return (
    <>
      {isClicado ? (
        <div className="bg-red-900 block w-full py-5 ">
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
                  onClick={handleClick}
                  className=" text-xs  cursor-pointer bg-gray-100 rounded-lg px-[1rem] text-gray-400"
                >
                  sim
                </button>
                <button
                  onClick={() => setIsClicado(false)}
                  className=" text-xs  cursor-pointer bg-gray-100 rounded-lg px-[1rem] text-gray-400"
                >
                  não
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="block w-full py-5 focus:ring-0 outline-none cursor-pointer group transition-all duration-150 hover:bg-slate-100 dark:hover:bg-slate-600 dark:hover:bg-opacity-70">
          <div className="flex space-x-3 px-6 rtl:space-x-reverse">
            <div className="flex-none">
              <div className="h-10 w-10 rounded-full relative">
                <Image
                  width={100}
                  height={100}
                  src={avatar}
                  alt={fullName}
                  className="block w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <div className="flex-1 text-start flex">
              <div className="flex-1">
                <span className="block text-slate-800 dark:text-slate-300 text-sm font-medium mb-[2px]">
                  {fullName}
                </span>
              </div>
              <div className="flex-none ltr:text-right rtl:text-end flex gap-2">
                <div className="h-7 w-7 bg-slate-100 dark:bg-black-450 dark:text-slate-400 flex flex-col justify-center items-center text-xl rounded-full cursor-pointer">
                  <Icons icon="heroicons-outline:pencil" width="18" />
                </div>
                <div
                  style={style}
                  onClick={handleClick}
                  className="h-7 w-7 bg-slate-100 dark:bg-black-450 dark:text-slate-400 flex flex-col justify-center items-center text-xl rounded-full cursor-pointer"
                >
                  <Icons icon="heroicons-outline:trash" width="20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Contacts;
