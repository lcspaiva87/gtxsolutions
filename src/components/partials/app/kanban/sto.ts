import { create } from 'zustand'
interface Assignee {
  image: string
  title: string
}

interface Category {
  value: string
  label: string
}

interface Task {
  id: string
  assignee: Assignee[]
  name: string
  des: string
  startDate: string
  endDate: string
  progress: number
  category: Category[]
}

interface Column {
  id: string
  name: string
  color: string
  tasks: Task[]
}

interface Data {
  columns: Column[]
}
interface IKabanStore {
  toggleColumnModal: (value: boolean) => void
  addColumnBoard: (value: Column) => void
  columModal: boolean
  taskModal: boolean
  isLoading: boolean | null
  openTaskId: string | null
  columns: Column[]
}
const kabanStore = create<IKabanStore>((set) => ({
  columModal: false,
  taskModal: false,
  isLoading: null,
  openTaskId: null,
  columns: [],
  toggleColumnModal: (value) => set(() => ({ columModal: value })),
  addColumnBoard: (value) =>
    set((state) => ({ columns: [...state.columns, value] })),
}))

export default kabanStore
