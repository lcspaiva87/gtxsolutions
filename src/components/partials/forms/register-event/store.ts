import { create } from "zustand";
interface IeventUpdate {
  id: string;
  description: string;
  name: string;
}
interface Ievent {
  isOpenModal: boolean,
  modalAction: "create" | "update",
  toggleModal: (open: Ievent["isOpenModal"], action: Ievent["modalAction"]) => void
  userInitialData: IeventUpdate | null,
  setUserInitialData: (user: IeventUpdate) => void
}

const creatIeventStore = create<Ievent>((set) => ({
  isOpenModal: false,
  modalAction: "create",
  userInitialData: null,
  toggleModal: (open, action) => {
    if(action === "create") {
      set({ userInitialData: null })
    }

    set({ isOpenModal: open, modalAction: action });
  },
  setUserInitialData: (Ievent) => set({ userInitialData: Ievent })
}))

export default creatIeventStore
