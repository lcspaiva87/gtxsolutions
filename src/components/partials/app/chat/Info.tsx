import Icon from '@/components//ui/icons/Icon'
import Image from 'next/image'
import SimpleBar from 'simplebar-react'
import appChatStore from './store'

const socials = [
  {
    name: 'facebook',
    icon: 'bi:facebook',
    link: '#',
  },
  {
    name: 'twitter',
    link: '#',
    icon: 'bi:twitter',
  },
  {
    name: 'instagram',
    link: '#',
    icon: 'bi:instagram',
  },
]

const Info = () => {
  const { user } = appChatStore()
  return (
    <SimpleBar className="h-full p-6">
      <h4 className="text-xl text-slate-900 font-medium mb-8">About</h4>
      <div className="h-[100px] w-[100px] rounded-full mx-auto mb-4">
        <Image
          width={100}
          height={100}
          src={user.avatar}
          alt={user.fullName}
          className="block w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="text-center">
        <h5 className="text-base text-slate-600 dark:text-slate-300 font-medium mb-1">
          {user.fullName}
        </h5>
        <h6 className="text-xs text-slate-600 dark:text-slate-300 font-normal">
          {user.role}
        </h6>
      </div>
      <ul className="list-item mt-5 space-y-4 border-b border-slate-100 dark:border-slate-700 pb-5 -mx-6 px-6">
        <li className="flex justify-between text-sm text-slate-600 dark:text-slate-300 leading-[1]">
          <div className="flex space-x-2 items-start rtl:space-x-reverse">
            <Icon
              icon="heroicons-outline:location-marker"
              className="text-base"
            />
            <span>Location</span>
          </div>
          <div className="font-medium">Bangladesh</div>
        </li>
        <li className="flex justify-between text-sm text-slate-600 dark:text-slate-300 leading-[1]">
          <div className="flex space-x-2 items-start rtl:space-x-reverse">
            <Icon icon="heroicons-outline:user" className="text-base" />
            <span>Members since</span>
          </div>
          <div className="font-medium">Oct 2021</div>
        </li>
        <li className="flex justify-between text-sm text-slate-600 dark:text-slate-300 leading-[1]">
          <div className="flex space-x-2 items-start rtl:space-x-reverse">
            <Icon icon="heroicons-outline:translate" className="text-base" />
            <span>Language</span>
          </div>
          <div className="font-medium">English</div>
        </li>
      </ul>
      <ul className="list-item space-y-3 border-b border-slate-100 dark:border-slate-700 pb-5 -mx-6 px-6 mt-5">
        {socials?.map((slink, sindex) => (
          <li
            key={sindex}
            className="text-sm text-slate-600 dark:text-slate-300 leading-[1]"
          >
            <button className="flex space-x-2 rtl:space-x-reverse">
              <Icon icon={slink.icon} className="text-base" />
              <span className="capitalize font-normal text-slate-600 dark:text-slate-300">
                {slink.name}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <h4 className="py-4 text-sm text-secondary-500 dark:text-slate-300 font-normal">
        Shared Files
      </h4>
      <ul className="grid grid-cols-3 gap-2">
        <li className="h-[46px]">
          <img
            src={'/assets/images/chat/sd1.png'}
            alt=""
            className="w-full h-full object-cover rounded-[3px]"
          />
        </li>
        <li className="h-[46px]">
          <img
            src={'/assets/images/chat/sd2.png'}
            alt=""
            className="w-full h-full object-cover rounded-[3px]"
          />
        </li>
        <li className="h-[46px]">
          <img
            src={'/assets/images/chat/sd3.png'}
            alt=""
            className="w-full h-full object-cover rounded-[3px]"
          />
        </li>
        <li className="h-[46px]">
          <img
            src={'/assets/images/chat/sd4.png'}
            alt=""
            className="w-full h-full object-cover rounded-[3px]"
          />
        </li>
        <li className="h-[46px]">
          <img
            src={'/assets/images/chat/sd5.png'}
            alt=""
            className="w-full h-full object-cover rounded-[3px]"
          />
        </li>
        <li className="h-[46px]">
          <img
            src={'/assets/images/chat/sd6.png'}
            alt=""
            className="w-full h-full object-cover rounded-[3px]"
          />
        </li>
      </ul>
    </SimpleBar>
  )
}

export default Info
