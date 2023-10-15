"use client";
import Modal from "../../modal/container";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";
import { InputCustomer } from "@/components/ui/inputs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Icons } from "@/components/icons";
import { useState } from "react";

import { PostColumns } from "@/data/columns";

type FormValues = {
  title: string;
};
const nameContainer = yup.object().shape({
  title: yup.string().required("nome obrigatório"),
});

export function ModalContainer() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(nameContainer),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit({ title }: FormValues) {
    const id = `container-${uuidv4()}`;
    await PostColumns({
      id: id,
      title: title,
    });
    reset({ title: "" });
    setIsOpen(false);

  }

  return (
    <>
      <Modal showModal={isOpen} setShowModal={() => setIsOpen(false)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col w-full items-start gap-y-4">
            <h1 className="text-gray-800 text-3xl font-bold">
              Adicione Titulo do card
            </h1>
            <InputCustomer
              type="text"
              name="title"
              placeholder="Titulo do card"
              required
              control={control}
            />
          </div>
          <div className="flex justify-between gap-3 mt-3">
            <button
              onClick={() => setIsOpen(false)}
              className="flex text-red-300 items-center gap-2 border border-red-300 p-2 rounded-lg hover:text-red-400 hover:border-red-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex text-green-300 items-center gap-2 border border-green-300 p-2 rounded-lg hover:text-green-400 hover:border-green-600"
            >
              Adicionar
            </button>
          </div>
        </form>
      </Modal>
      <div className="py-10 px-2 ">
        <div className="flex items-center justify-between gap-y-2">
          <h1 className="text-gray-800 text-3xl font-bold">
            Registro de ocorrência
          </h1>
          <div className="flex gap-6">
            <button className="flex text-gray-300 items-center gap-2 border border-gray-300 p-2 rounded-lg hover:text-gray-400/25 hover:border-gray-400">
              Filtro
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="flex text-white bg-gray-900 items-center gap-2 border border-gray-50 p-2 rounded-lg hover:text-gray-100/25 hover:border-gray-400"
            >
              <Icons.Plus className="w-5 text-white" />
              Nova Ocorrência
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
