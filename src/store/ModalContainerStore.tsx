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
  ContainerById: UniqueIdentifier | null;
  containers: ContainerType[];
  addContainer: (container: ContainerType) => void;
  addItemToContainer: (containerId: UniqueIdentifier, item: ItemType) => void;
  getContainerById: (containerId: UniqueIdentifier) => void; // Função para obter o contêiner pelo ID

  //getContainerId: (containerId: UniqueIdentifier) => UniqueIdentifier | undefined; // Função para obter o ID do contêiner

}
export const useModalContainerStore = create<ModalIsOpen>((set) => {
  return {
    isOpen: false,
    ContainerById:null,
    containers: [
      {
        id: "container-3c890f3c-7cb3-43e0-93fe-ec21af3ce08c",
        title: "eee",
        items: [],
      },
      {
        id: "container-663e9a37-e56e-42ea-ae85-4ddeb2c208c4",
        title: "lucas",
        items: [],
      },
      {
        id: "container-fa54c777-cc68-4a79-b1c7-a9cf879ed371",
        title: "ss",
        items: [],
      },
    ], // Inicialmente, a lista de contêineres está vazia
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
    addItemToContainer: (containerId, item) => {
      set((state) => ({
        containers: state.containers.map((container) =>
          container.id === containerId
            ? { ...container, items: [...container.items, item] }
            : container
        ),
      }));
    },
    getContainerById: (containerId) =>{
      set({ContainerById:containerId})
    }

  };
});
