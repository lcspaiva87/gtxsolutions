import { create } from "zustand";
interface IunitUpdate {
  id: string;
  name: string;
  email: string;
}
interface Iunit {
  isOpenModal: boolean,
  modalAction: "create" | "update",
  toggleModal: (open: Iunit["isOpenModal"], action: Iunit["modalAction"]) => void
  unitInitialData: IunitUpdate | null,
  setUserInitialData: (unit: IunitUpdate) => void
}

const creatIunitStore = create<Iunit>((set) => ({
  isOpenModal: false,
  modalAction: "create",
  unitInitialData: null,
  toggleModal: (open, action) => {
    if(action === "create") {
      set({ unitInitialData: null })
    }

    set({ isOpenModal: open, modalAction: action });
  },
  setUserInitialData: (unit) => set({ unitInitialData: unit })
}))

export default creatIunitStore
