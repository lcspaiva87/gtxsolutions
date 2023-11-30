import { Icon } from "@iconify/react/dist/iconify.js";
import { useRef, useState } from "react";
import appChatStore from "../../app/chat/store";

export function CreateUser() {
  const { toggleProfile, openProfile } = appChatStore();
  const [status, setStatus] = useState("online");
  const nodeRef = useRef(null);
  return (
    <div>
      <header>
        <div className="flex px-6 pt-6">
          <div className="flex-1" />
          <div className="flex-none">
            <div
              className="h-8 w-8 bg-slate-100 dark:bg-slate-900 dark:text-slate-400 flex flex-col justify-center items-center text-xl rounded-full cursor-pointer"
              onClick={() => toggleProfile(true)}
            >
              <Icon icon="heroicons-outline:plus" />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
