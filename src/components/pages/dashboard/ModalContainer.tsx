import { closeModal } from "@/store/slices/modalContainer.slice";
import Modal from "../../modal/container";
import { useAppSelector } from "@/store";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Icons } from "@/components/icons";
import { UniqueIdentifier } from "@dnd-kit/core";
import Input from "@/components/ui/Input";
import { v4 as uuidv4 } from "uuid";
type DNDType = {
  id: UniqueIdentifier;
  title: string;
  items: {
    id: UniqueIdentifier;
    title: string;
  }[];
};
export function ModalContainer() {
  const modal = useAppSelector((store) => {
    return store.modalContainer;
  });
  const dispatch = useDispatch();
  const [containerName, setContainerName] = useState("");
  const [containers, setContainers] = useState<DNDType[]>([]);

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
    dispatch(closeModal());
  };
  return (
    <Modal showModal={modal} setShowModal={() => dispatch(closeModal())}>
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
          onClick={() => dispatch(closeModal())}
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
