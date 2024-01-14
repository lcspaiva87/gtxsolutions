import { create } from "zustand"

interface IEventTypeUpdate {
  id: number,
  description: string,
  ip: string,
  site: string,
  id_camera_group: string,
}


interface IIEventType {
  isOpenModal: boolean,
  modalAction: "create" | "update",
  toggleModal: (open: IIEventType["isOpenModal"], action: IIEventType["modalAction"]) => void
  userInitialData: IEventTypeUpdate | null,
  setUserInitialData: (user: IEventTypeUpdate) => void
}

const createEventTypeStore = create<IIEventType>((set) => ({
  isOpenModal: false,
  modalAction: "create",
  userInitialData: null,
  toggleModal: (open, action) => {
    if(action === "create") {
      set({ userInitialData: null })
    }

    set({ isOpenModal: open, modalAction: action });
  },
  setUserInitialData: (eventType) => set({ userInitialData: eventType })
}))

export default createEventTypeStore
