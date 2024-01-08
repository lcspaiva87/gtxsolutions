import { Icon } from "@iconify/react/dist/iconify.js";
import createUserStore from "./store";

export function CreateUser() {
  const { toggleModalUser } = createUserStore();

  return (
    <div>
      <header>
        <div className="flex">
          <div className="flex-1" />
          <div className="flex-none">
            <div
              className="h-8 w-8 bg-slate-100 dark:bg-black-450 dark:text-slate-400 flex flex-col justify-center items-center text-xl rounded-full cursor-pointer"
              onClick={() => toggleModalUser(true)}
            >
              <Icon icon="heroicons-outline:plus" />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
