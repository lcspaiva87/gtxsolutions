"use client";
import { Icons } from "@/components/icons";
import Modal from "@/components/modal/OccurrenceModal";
import Input from "@/components/ui/Input";
import { v4 as uuidv4 } from "uuid";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Status } from "@/components/ui/Status";
type DNDType = {
  id: UniqueIdentifier;
  title: string;
  items: {
    id: UniqueIdentifier;
    title: string;
  }[];
};
export default function Dashboard() {
  const [showAddContainerModal, setShowAddContainerModal] = useState(false);
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
    setShowAddContainerModal(false);
  };
  return (
    <div className="mx-auto max-w-7xl py-10">
      <Modal
        showModal={showAddContainerModal}
        setShowModal={setShowAddContainerModal}
      >
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
          <Input
            type="text"
            placeholder="BackGround"
            name="containername"
            value={containerName}
            onChange={(e) => setContainerName(e.target.value)}
          />
        </div>
          <div className="flex justify-between gap-3 mt-3">
            <button onClick={() => setShowAddContainerModal(false)} className="flex text-red-300 items-center gap-2 border border-red-300 p-2 rounded-lg hover:text-red-400 hover:border-red-400">
              Cancelar
            </button>
            <button onClick={onAddContainer} className="flex text-green-300 items-center gap-2 border border-green-300 p-2 rounded-lg hover:text-green-400 hover:border-green-600">Adicionar</button>
          </div>
      </Modal>
      <div className="flex items-center justify-between gap-y-2">
        <h1 className="text-gray-800 text-3xl font-bold">
          Registro de ocorrência
        </h1>
        <div className="flex gap-6">
          <button className="flex text-gray-300 items-center gap-2 border border-gray-300 p-2 rounded-lg hover:text-gray-400/25 hover:border-gray-400">
            Filtro
          </button>
          <button
            onClick={() => setShowAddContainerModal(true)}
            className="flex text-white bg-gray-900 items-center gap-2 border border-gray-50 p-2 rounded-lg hover:text-gray-100/25 hover:border-gray-400"
          >
            <Icons.Plus className="w-5 text-white" />
            Nova Ocorrência
          </button>
        </div>
      </div>
      {/* <div className="flex gap-3 justify-center    ">
        <section>
          <div className="bg-cyan-400  p-2 rounded-lg  flex flex-col">
            <div className="p-2">
              <Status
                background="bg-cyan-200"
                colorCicle="bg-cyan-400"
                label="Planning"
              />
            </div>
            <div className="p-2 ">
              <div className="bg-gray-50 w-[21rem] p-2 mt-2 rounded-lg flex flex-col gap-2">
                <span className="bg-red-200 p-1 rounded-md text-red-400 w-[3rem]">
                  High
                </span>
                <span className="text-base text-gray-400">
                  Lorem Ipsum is a placeholder text commonly used in the
                  printing and graphic design industries for previewing layouts
                  and visual mockups. It is also used to test and preview the
                  legibility of fonts. Lorem Ipsum consists of a series of
                  nonsensical Latin words that have been placed in a
                  grammatically correct order, but do not convey any meaning
                </span>
                <div className=" flex justify-between items-center">
                  <div className="grid grid-cols-2 items-center gap-2">
                    <Icons.Chat className="text-base text-gray-500" />
                    <span className="text-gray-300">1</span>
                  </div>
                  <Avatar.Root className="AvatarRoot">
                    <Avatar.Fallback className="bg-gray-300 rounded-full p-1 text-sm">
                      PD
                    </Avatar.Fallback>
                  </Avatar.Root>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="bg-yellow-400 w-[25rem] p-2 rounded-lg  flex flex-col">
            <div className="p-2">
              <Status
                background="bg-yellow-200"
                colorCicle="bg-yellow-400"
                label="In Progress"
              />
            </div>
          </div>
        </section>
        <section>
          <div className="bg-green-400 w-[25rem] p-2 rounded-lg  flex flex-col">
            <div className="p-2">
              <Status
                background="bg-green-200"
                colorCicle="bg-green-400"
                label="Done"
              />
            </div>
          </div>
        </section>
        <section>
          <div className="bg-gray-400 w-[25rem] p-2 rounded-lg   flex flex-col">
            <div className="p-2">
              <Status
                background="bg-gray-200"
                colorCicle="bg-gray-400"
                label="Block"
              />
            </div>
          </div>
        </section>
      </div> */}
    </div>
  );
}
