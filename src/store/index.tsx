
import { create } from "zustand";

export interface ModalIsOpen {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}
export const useStore = create<ModalIsOpen>((set, get) => {
  return {
    isOpen: false,
    openModal: () => {
      set({ isOpen: true });
    },
    closeModal: () => {
      set({ isOpen: false });
    },
  };
});


