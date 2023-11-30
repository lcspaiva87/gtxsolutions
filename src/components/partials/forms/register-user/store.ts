import { create } from "zustand"

interface ICreateUser {
  toggleModalUser: (value: boolean) => void
  activeModal: boolean,

}

const createUserStore = create<ICreateUser>((set) => ({
  activeModal: false,
  toggleModalUser: (value) => set({ activeModal: value })
}))


export default createUserStore
