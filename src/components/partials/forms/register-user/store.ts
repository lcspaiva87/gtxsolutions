import { create } from "zustand"
interface Icompany{
  id: string,
  value: string,
  label: string
}

interface IuserUpdate {
  id: number,
  description: string,
  ip: string,
  site: string,
  id_camera_group: string,
}


interface ICameras {
  isOpenModal: boolean,
  modalAction: "create" | "update",
  toggleModal: (open: ICameras["isOpenModal"], action: ICameras["modalAction"]) => void
  userInitialData: IuserUpdate | null,
  setUserInitialData: (user: IuserUpdate) => void
}

const createUserStore = create<ICameras>((set) => ({
  isOpenModal: false,
  modalAction: "create",
  userInitialData: null,
  toggleModal: (open, action) => {
    if(action === "create") {
      set({ userInitialData: null })
    }

    set({ isOpenModal: open, modalAction: action });
  },
  setUserInitialData: (user) => set({ userInitialData: user })
}))

export default createUserStore
