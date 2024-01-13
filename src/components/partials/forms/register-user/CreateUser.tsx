import { Icon } from "@iconify/react/dist/iconify.js";
import creatIeventStore from "../register-event/store";

export function CreateEventType() {
  const { toggleModal } = creatIeventStore();

  return (
    <div>
      <header>
        <div className="flex">
          <div className="flex-1" />
          <div className="flex-none">
            <div
              className="h-8 w-8 bg-slate-100 dark:bg-black-450 dark:hover:bg-sky-500 dark:text-slate-400 dark:hover:text-white duration-150 flex flex-col justify-center items-center text-xl rounded-full cursor-pointer bg-sky-700"
              onClick={() => toggleModal(true, "create")}
            >
              <Icon icon="heroicons-outline:plus" />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
