"use client";
import Input from "@/components/ui/Input";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
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
import { ModalContainer } from "@/components/pages/dashboard/ModalContainer";
import { Icons } from "@/components/icons";
import { useModalContainerStore } from "@/store/ModalContainerStore";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import Container from "@/components/Container/index";
import { Items } from "@/components/Item";
export default function Dashboard() {
  const { openModal, containers, addContainer,getContainerById,ContainerById } = useModalContainerStore();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [containersList, setContainersList] = useState(containers);

  console.log("containers",containers)


  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
  }
  function findValueOfItems(id: UniqueIdentifier | undefined, type: string) {
    if (type === "container") {
      return containers.find((item) => item.id === id);
    }
    if (type === "item") {
      return containers.find((container) =>
        container.items.find((item) => item.id === id)
      );
    }
  }

  const handleDragMove = (event: DragMoveEvent) => {
    const { active, over } = event;
    // Handle Items Sorting
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("item") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active container and over container
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "item");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );
      const overitemIndex = overContainer.items.findIndex(
        (item) => item.id === over.id
      );
      // In the same container
      if (activeContainerIndex === overContainerIndex) {
        let newItems: any = [...containers];
        newItems[activeContainerIndex].items = arrayMove(
          newItems[activeContainerIndex].items,
          activeitemIndex,
          overitemIndex
        );

        containers(newItems);
      } else {
        // In different containers
        let newItems: any = [...containers];
        const [removeditem] = newItems[activeContainerIndex].items.splice(
          activeitemIndex,
          1
        );
        newItems[overContainerIndex].items.splice(
          overitemIndex,
          0,
          removeditem
        );
        containers(newItems);
      }
    }

    // Handling Item Drop Into a Container
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("container") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "container");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );

      // Remove the active item from the active container and add it to the over container
      let newItems: any = [...containers];
      const [removeditem] = newItems[activeContainerIndex].items.splice(
        activeitemIndex,
        1
      );
      newItems[overContainerIndex].items.push(removeditem);
      containers(newItems);
    }
  };
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    // Handling Container Sorting
    if (
      active.id.toString().includes("container") &&
      over?.id.toString().includes("container") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === active.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === over.id
      );
      // Swap the active and over container
      let newItems: any = [...containers];
      newItems = arrayMove(newItems, activeContainerIndex, overContainerIndex);
      containers(newItems);
    }

    // Handling item Sorting
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("item") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "item");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );
      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );
      const overitemIndex = overContainer.items.findIndex(
        (item) => item.id === over.id
      );

      // In the same container
      if (activeContainerIndex === overContainerIndex) {
        let newItems: any = [...containers];
        newItems[activeContainerIndex].items = arrayMove(
          newItems[activeContainerIndex].items,
          activeitemIndex,
          overitemIndex
        );
        containers(newItems);
      } else {
        // In different containers
        let newItems: any = [...containers];
        const [removeditem] = newItems[activeContainerIndex].items.splice(
          activeitemIndex,
          1
        );
        newItems[overContainerIndex].items.splice(
          overitemIndex,
          0,
          removeditem
        );
        containers(newItems);
      }
    }
    // Handling item dropping into Container
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("container") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "container");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );
      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );

      let newItems: any = [...containers];
      const [removeditem] = newItems[activeContainerIndex].items.splice(
        activeitemIndex,
        1
      );
      newItems[overContainerIndex].items.push(removeditem);
      containers(newItems);
    }
    setActiveId(null);
  }

  return (
    <div className="mx-auto max-w-7xl py-10">
      <ModalContainer />
      <div className="flex items-center justify-between gap-y-2">
        <h1 className="text-gray-800 text-3xl font-bold">
          Registro de ocorrência
        </h1>
        <div className="flex gap-6">
          <button className="flex text-gray-300 items-center gap-2 border border-gray-300 p-2 rounded-lg hover:text-gray-400/25 hover:border-gray-400">
            Filtro
          </button>
          <button
            onClick={() => openModal()}
            className="flex text-white bg-gray-900 items-center gap-2 border border-gray-50 p-2 rounded-lg hover:text-gray-100/25 hover:border-gray-400"
          >
            <Icons.Plus className="w-5 text-white" />
            Nova Ocorrência
          </button>
        </div>
      </div>
      <div className="mt-10">
        <div className="grid grid-cols-3 gap-6">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={containers.map((i) => i.id)}>
              {containers.map((container) => (
                <Container
                  id={container.id}
                  title={container.title}
                  key={container.id}
                  // onAddItem={() => {
                  //   setShowAddItemModal(true);
                  //   getContainerById(container.id);
                  // }}
                >
                  <SortableContext items={container.items.map((i) => i.id)}>
                    <div className="flex items-start flex-col gap-y-4">
                      {container.items.map((i) => (
                        <Items title={i.title} id={i.id} key={i.id} />
                      ))}
                    </div>
                  </SortableContext>
                </Container>
              ))}
            </SortableContext>
          </DndContext>
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
