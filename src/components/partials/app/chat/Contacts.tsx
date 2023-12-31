'use client'
import Image from 'next/image'
import appChatStore from './store'

interface IContact {
  id: number
  fullName: string
  role: string
  lastmessage: string
  lastmessageTime: string
  unredmessage: number
  avatar: string
  status: string
}

const Contacts = ({ contact }: { contact: IContact }) => {
  const { avatar, fullName, lastmessage, status, unredmessage } = contact
  const { openChat } = appChatStore()

  return (
    <div
      className="block w-full py-5 focus:ring-0 outline-none cursor-pointer group transition-all duration-150 hover:bg-slate-100 dark:hover:bg-slate-600 dark:hover:bg-opacity-70"
      onClick={() => openChat({ contact, activechat: true })}
    >
      <div className="flex space-x-3 px-6 rtl:space-x-reverse">
        <div className="flex-none">
          <div className="h-10 w-10 rounded-full relative">
            <span
              className={`  status ring-1 ring-white inline-block h-[10px] w-[10px] rounded-full absolute -right-0 top-0
                ${status === 'active' ? 'bg-success-500' : 'bg-secondary-500'}
              `}
            ></span>
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
            <span className="block text-slate-600 dark:text-slate-300 text-xs font-normal">
              {lastmessage.slice(0, 14) + '...'}
            </span>
          </div>
          <div className="flex-none ltr:text-right rtl:text-end">
            <span className="block text-xs text-slate-400 dark:text-slate-400 font-normal">
              12:20 pm
            </span>
            {unredmessage > 0 && (
              <span className="inline-flex flex-col items-center justify-center text-[10px] font-medium w-4 h-4 bg-[#FFC155] text-white rounded-full">
                {unredmessage}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contacts
