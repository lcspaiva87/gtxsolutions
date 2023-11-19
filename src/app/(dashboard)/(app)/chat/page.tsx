'use client'

import Contacts from '@/components/partials/app/chat/Contacts'
import Info from '@/components/partials/app/chat/Info'
import MyProfile from '@/components/partials/app/chat/MyProfile'

import Blank from '@/components/partials/app/chat/Blank'
import Chat from '@/components/partials/app/chat/Chat'
import appChatStore from '@/components/partials/app/chat/store'
import { Card } from '@/components/ui/Card'
import Icon from '@/components/ui/Icon'
import useWidth from '@/hooks/useWidth'
import { Key } from 'react'
import SimpleBar from 'simplebar-react'

export default function ChatPage() {
  const { width, breakpoints } = useWidth()
  const {
    searchContact,
    mobileChatSidebar,
    activechat,
    contacts,
    openinfo,
    setContactSearch,
    toggleMobileChatSidebar,
  } = appChatStore()

  const searchContacts = contacts?.filter((item: { fullName: string }) =>
    item.fullName.toLowerCase().includes(searchContact.toLowerCase()),
  )

  return (
    <div className="flex lg:space-x-5 chat-height overflow-hidden relative rtl:space-x-reverse">
      <div
        className={`transition-all duration-150 flex-none min-w-[260px]
        ${
          width < parseInt(breakpoints.lg)
            ? 'absolute h-full top-0 md:w-[260px] w-[200px] z-[999]'
            : 'flex-none min-w-[260px]'
        }
        ${
          width < parseInt(breakpoints.lg) && mobileChatSidebar
            ? 'left-0 '
            : '-left-full '
        }
        `}
      >
        <Card
          bodyClass=" relative p-0 h-full overflow-hidden "
          className="h-full bg-white"
        >
          <div className="border-b border-slate-100 dark:border-slate-700 pb-4">
            <MyProfile />
          </div>
          <div className="border-b border-slate-100 dark:border-slate-700 py-1">
            <div className="search px-3 mx-6 rounded flex items-center space-x-3 rtl:space-x-reverse">
              <div className="flex-none text-base text-slate-900 dark:text-slate-400">
                <Icon icon="bytesize:search" />
              </div>
              <input
                onChange={(e) => setContactSearch(e.target.value)}
                placeholder="Search..."
                className="w-full flex-1 block bg-transparent placeholder:font-normal placeholder:text-slate-400 py-2 focus:ring-0 focus:outline-none dark:text-slate-200 dark:placeholder:text-slate-400"
              />
            </div>
          </div>
          <SimpleBar className="contact-height">
            {searchContacts?.map((contact: any, i: Key | null | undefined) => (
              <Contacts key={i} contact={contact} />
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
              {activechat ? (
                <div className="divide-y divide-slate-100 dark:divide-slate-700 h-full">
                  <Chat />
                </div>
              ) : (
                <Blank />
              )}
            </Card>
          </div>
          {/* right side information */}
          {width > parseInt(breakpoints.lg) && openinfo && activechat && (
            <div className="flex-none w-[285px]">
              <Card bodyClass="p-0 h-full" className="h-full bg-white">
                <Info />
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
