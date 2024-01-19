"use client";
import { IUser } from "@/@types/Use";
import Blank from "@/components/partials/app/chat/Blank";
import Contacts from "@/components/partials/app/chat/Contacts";
import appChatStore from "@/components/partials/app/chat/store";
import { CreateEventType } from "@/components/partials/forms/register-event-type/CreateEventType";
import { FormRegisterEventType } from "@/components/partials/forms/register-event-type/FormRegisterEventType";
import creatIevenTypetStore from "@/components/partials/forms/register-event-type/store";


import { Card } from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import { useEventType } from "@/hooks/useEventType";
import useWidth from "@/hooks/useWidth";
import { Key } from "react";
import SimpleBar from "simplebar-react";

export default function ResgisterEvent() {
  const { width, breakpoints } = useWidth();
  const {
    searchContact,
    mobileChatSidebar,
    setContactSearch,
    toggleMobileChatSidebar,
  } = appChatStore();
  const { isOpenModal } = creatIevenTypetStore();
  const {  eventType} = useEventType();
  const searchContacts = eventType?.filter((item: { description: string }) =>
    item?.description?.toLowerCase().includes(searchContact.toLowerCase()),
  );

  return (
    <div className="flex lg:space-x-5 chat-height overflow-hidden relative rtl:space-x-reverse">
      <div
        className={`transition-all duration-150 flex-none min-w-[260px]
        ${
          width < parseInt(breakpoints.lg)
            ? "absolute h-full top-0 md:w-[260px] w-[200px] z-[999]"
            : "flex-none min-w-[260px]"
        }
        ${
          width < parseInt(breakpoints.lg) && mobileChatSidebar
            ? "left-0 "
            : "-left-full "
        }
        `}
      >
        <Card
          bodyClass=" relative p-0 h-full overflow-hidden "
          className="h-full bg-white"
        >
          <div className="border-b border-slate-100 dark:border-slate-700 pb-4 flex items-center p-[1rem] gap-x-2">
            <div className="search px-3 rounded flex items-center space-x-3 rtl:space-x-reverse bg-black-450">
              <div className="flex-none text-base text-slate-900 dark:text-slate-400">
                <Icon icon="bytesize:search" />
              </div>
              <input
                onChange={(e) => setContactSearch(e.target.value)}
                placeholder="Procurar..."
                className="w-full flex-1 block bg-transparent placeholder:font-normal placeholder:text-slate-400 py-2 focus:ring-0 focus:outline-none dark:text-slate-200 dark:placeholder:text-slate-400"
              />
            </div>

            <CreateEventType />
          </div>

          <SimpleBar className="contact-height">
            {searchContacts?.map((contact: IUser,index: Key | null | undefined) => (
              <Contacts key={index} contact={contact} />
            ))}
          </SimpleBar>
        </Card>
      </div>

      {/* overlay */}
      {width < parseInt(breakpoints.lg) && mobileChatSidebar && (
        <div
          className="overlay bg-slate-900 dark:bg-slate-900 dark:bg-opacity-60 bg-opacity-60 backdrop-filter
            backdrop-blur-sm absolute w-full flex-1 inset-0 z-[99] rounded-md"
          onClick={() => toggleMobileChatSidebar(!mobileChatSidebar)}
        ></div>
      )}

      {/* mai  chat box */}
      <div className="flex-1">
        <div className="parent flex space-x-5 h-full rtl:space-x-reverse">
          {/* main message body */}
          <div className="flex-1">
            <Card bodyClass="p-0 h-full" className="h-full bg-white">
              {isOpenModal ? (
                <div className="divide-y divide-slate-100 dark:divide-slate-700 h-full overflow-auto">
                  <FormRegisterEventType />
                </div>
              ) : (
                <Blank />
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
