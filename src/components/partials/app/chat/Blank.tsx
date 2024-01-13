import useWidth from '@/hooks/useWidth'
import Image from 'next/image'
import appChatStore from './store'

import BlanckImage from "../../../../assets/blank.svg";

import { CursorClick } from "@phosphor-icons/react";


const Blank = () => {
  const { width, breakpoints } = useWidth()
  const { toggleMobileChatSidebar } = appChatStore()
  return (
    <div className="h-full flex flex-col items-center justify-center xl:space-y-2 space-y-6">
      {/* <Image
        src={BlanckImage}
        alt="blanck"
        width={0}
        height={0}
      /> */}

      <CursorClick size={40} weight="regular"/>

      <h4 className="text-2xl text-slate-600 dark:text-slate-300 font-medium">
        Nada selecionado
      </h4>

      <p className="text-sm text-slate-500 lg:pt-0 pt-4">
        {width > parseInt(breakpoints.lg) ? (
          <span>
            Clique em adicionar ou em editar, para poder gerenciar esse formulário
          </span>
        ) : (
          <span
            className="btn btn-dark cursor-pointer"
            onClick={() => toggleMobileChatSidebar(true)}
          >
            Abrir menu
          </span>
        )}
      </p>
    </div>
  )
}

export default Blank
