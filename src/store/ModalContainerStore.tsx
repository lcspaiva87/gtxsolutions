
import { UniqueIdentifier } from "@dnd-kit/core";
import { create } from "zustand";
type containerType = {
  id: UniqueIdentifier;
  title: string;
  items: {
    id: UniqueIdentifier;
    title: string;
  }[];
};
type ItemType = {
  id: number;
  title: string;
};

type ContainerType = {
  id: UniqueIdentifier;
  title: string;
  items: ItemType[];
};

export interface ModalIsOpen {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  containers: ContainerType[];
  addContainer: (container: ContainerType) => void;
  // removeContainer: (containerId: UniqueIdentifier) => void;
}
export const useModalContainerStore = create<ModalIsOpen>((set) => {
  return {
    isOpen: false,
    containers: [], // Inicialmente, a lista de contêineres está vazia
    openModal: () => {
      set({ isOpen: true });
    },
    closeModal: () => {
      set({ isOpen: false });
    },
    addContainer: (container) => {
      set((state) => ({
        containers: [...state.containers, container],
      }));
    },

  };
});

