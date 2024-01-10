import { create } from "zustand"


interface IdepartmentsUpdate {
  id: number,
  name: string,
}


interface IDepartments {
  isOpenModal: boolean,
  modalAction: "create" | "update",
  toggleModal: (open: IDepartments["isOpenModal"], action: IDepartments["modalAction"]) => void
  userInitialData: IdepartmentsUpdate | null,
  setUserInitialData: (departments: IdepartmentsUpdate) => void
}

const createDepartmentsStore = create<IDepartments>((set) => ({
  isOpenModal: false,
  modalAction: "create",
  userInitialData: null,
  toggleModal: (open, action) => {
    if(action === "create") {
      set({ userInitialData: null })
    }

    set({ isOpenModal: open, modalAction: action });
  },
  setUserInitialData: (departments) => set({ userInitialData: departments })
}))

export default createDepartmentsStore
