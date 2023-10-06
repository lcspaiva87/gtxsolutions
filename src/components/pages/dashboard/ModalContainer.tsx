import Modal from "../../modal/container";
import { useState } from "react";
import { UniqueIdentifier } from "@dnd-kit/core";
import Input from "@/components/ui/Input";
import { v4 as uuidv4 } from "uuid";

import { useStore } from "@/store";

type DNDType = {
  id: UniqueIdentifier;
  title: string;
  items: {
    id: UniqueIdentifier;
    title: string;
  }[];
};
export function ModalContainer() {

  const [containerName, setContainerName] = useState("");
  const [containers, setContainers] = useState<DNDType[]>([]);
  const {isOpen,closeModal} =useStore()
  const onAddContainer = () => {
    if (!containerName) return;
    const id = `container-${uuidv4()}`;
    setContainers([
      ...containers,
      {
        id,
        title: containerName,
        items: [],
      },
    ]);
    setContainerName("");
    closeModal();
  };
  return (
    <Modal showModal={isOpen} setShowModal={() => closeModal()}>
      <div className="flex flex-col w-full items-start gap-y-4">
        <h1 className="text-gray-800 text-3xl font-bold">
          Adicione Titulo do card
        </h1>
        <Input
          type="text"
          placeholder="Titulo"
          name="containername"
          value={containerName}
          onChange={(e) => setContainerName(e.target.value)}
        />
      </div>
      <div className="flex justify-between gap-3 mt-3">
        <button
          onClick={() => closeModal()}
          className="flex text-red-300 items-center gap-2 border border-red-300 p-2 rounded-lg hover:text-red-400 hover:border-red-400"
        >
          Cancelar
        </button>
        <button
          onClick={onAddContainer}
          className="flex text-green-300 items-center gap-2 border border-green-300 p-2 rounded-lg hover:text-green-400 hover:border-green-600"
        >
          Adicionar
        </button>
      </div>
    </Modal>
  );
}
