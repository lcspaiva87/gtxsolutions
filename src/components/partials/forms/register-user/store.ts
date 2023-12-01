import { create } from "zustand"
interface Icompany{
  id: string, value: string, label: string
}
interface ICreateUser {
  toggleModalUser: (value: boolean) => void
  activeModal: boolean,
  company: Icompany[],
  setCompany: (value: Icompany[]) => void
}

const createUserStore = create<ICreateUser>((set) => ({
  activeModal: false,
  company: [],
  setCompany: (value) => set({ company: value }),
  toggleModalUser: (value) => set({ activeModal: value })
}))


export default createUserStore
