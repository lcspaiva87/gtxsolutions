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
  setUserInitialData: (user: IunitUpdate) => void
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
  setUserInitialData: (Iunit) => set({ unitInitialData: Iunit })
}))

export default creatIunitStore
