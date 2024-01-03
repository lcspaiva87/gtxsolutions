"use client";
import Image from "next/image";
import appChatStore from "./store";

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
  const { openChat } = appChatStore();

  return (
    <div
      className="block w-full py-5 focus:ring-0 outline-none cursor-pointer group transition-all duration-150 hover:bg-slate-100 dark:hover:bg-slate-600 dark:hover:bg-opacity-70"
      onClick={() => openChat({ contact, activechat: true })}
    >
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
            <span className="block text-slate-600 dark:text-slate-300 text-xs font-normal"></span>
          </div>
          <div className="flex-none ltr:text-right rtl:text-end"></div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
