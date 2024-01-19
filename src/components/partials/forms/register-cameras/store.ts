import { create } from "zustand";


interface IcameraUpdate {
  id: string;
  ip: string;
  description: string;
  site: string;
  id_camera_group: string;
}


interface ICamera {
  isOpenModal: boolean,
  modalAction: "create" | "update",
  toggleModal: (open: ICamera["isOpenModal"], action: ICamera["modalAction"]) => void
  cameraInitialData: IcameraUpdate | null,
  setCamaraInitialData: (camera: IcameraUpdate) => void
}

const createCameraStore = create<ICamera>((set) => ({
  isOpenModal: false,
  modalAction: "create",
  cameraInitialData: null,
  toggleModal: (open, action) => {
    if(action === "create") {
      set({ cameraInitialData: null })
    }

    set({ isOpenModal: open, modalAction: action });
  },
  setCamaraInitialData: (camera) => set({ cameraInitialData: camera })
}))

export default createCameraStore
