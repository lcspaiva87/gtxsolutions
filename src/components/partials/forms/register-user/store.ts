import { create } from "zustand"


interface IuserUpdate {
  id: number,
  email: string,
  password: string
}


interface ICreateUser {
  isOpenModal: boolean,
  modalAction: "create" | "update",
  toggleModal: (open: ICreateUser["isOpenModal"], action: ICreateUser["modalAction"]) => void
  userInitialData: IuserUpdate | null,
  setUserInitialData: (user: IuserUpdate) => void
}

const createUser = create<ICreateUser>((set) => ({
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

export default createUser
