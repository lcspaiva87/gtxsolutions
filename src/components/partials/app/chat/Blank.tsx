import useWidth from '@/hooks/useWidth'
import Image from 'next/image'
import appChatStore from './store'

const Blank = () => {
  const { width, breakpoints } = useWidth()
  const { toggleMobileChatSidebar } = appChatStore()
  return (
    <div className="h-full flex flex-col items-center justify-center xl:space-y-2 space-y-6">
      <Image
        src="/assets/images/svg/blank.svg"
        alt="blanck"
        width={0}
        height={0}
      />
      <h4 className="text-2xl text-slate-600 dark:text-slate-300 font-medium">
        No message yet...
      </h4>

      <p className="text-sm text-slate-500 lg:pt-0 pt-4">
        {width > parseInt(breakpoints.lg) ? (
          <span>
            {"don't"} worry, just take a deep breath & say {'Hello'}
          </span>
        ) : (
          <span
            className="btn btn-dark cursor-pointer"
            onClick={() => toggleMobileChatSidebar(true)}
          >
            Start Conversation
          </span>
        )}
      </p>
    </div>
  )
}

export default Blank
