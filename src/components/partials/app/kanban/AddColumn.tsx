"use client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Modal from "@/components/ui/Modal";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import ImagesGroupSelect from "@/components/ui/ImagesGroupSelect";

import { useColumns } from "@/hooks/useColuns";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import kabanStore from "./store";

type FormValues = {
  branch: number;
  unit: number;
  description: string;
  // cameras: number[];
  // images: any[];
};

const FormValidationSchema = yup
  .object({
    unit: yup.number().required("Unidade é obrigatório"),
    branch: yup.number().required("Filial é obrigatório"),
    description: yup
      .string()
      .min(10, "Minimo 10 caracteres")
      .required("Descrição é obrigatório"),
  })
  .required();

export default function AddColumn() {
  const [color, setColor] = useState("#4669fa");
  const { columModal, toggleColumnModal } = kabanStore();
  const { createMutation } = useColumns();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });

  const onSubmit = ({
    branch,
    unit,
    description,
    // cameras,
    // images,
  }: FormValues) => {
    // console.log({ branch, unit, description, cameras, images }, "submit");
    const id = `container-${uuidv4()}`;
    // createMutation.mutate({ branch, unit, description, cameras, images })

    toggleColumnModal(false);
    reset();
  };

  return (
    <div>
      <Modal
        title="Criar nova ocorrência"
        labelClass="btn-outline-dark"
        activeModal={columModal}
        onClose={() => toggleColumnModal(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <Select
            label="Filial"
            options={[
              {
                label: "test1",
                value: "test1",
              },
              {
                label: "test2",
                value: "test2",
              },
              {
                label: "test3",
                value: "test3",
              },
            ]}
            register={register}
            {...register("branch", { required: "Filial é obrigatório" })}
            name="branch"
            placeholder="Selecione uma filial"
            readonly={undefined}
            value={undefined}
            error={undefined}
            icon={undefined}
            disabled={undefined}
            id={undefined}
            horizontal={undefined}
            validate={undefined}
            msgTooltip={undefined}
            description={undefined}
            onChange={undefined}
            defaultValue={undefined}
            size={undefined}
          />
          <Select
            label="Unidade"
            options={[
              {
                label: "test1",
                value: "test1",
              },
              {
                label: "test2",
                value: "test2",
              },
              {
                label: "test3",
                value: "test3",
              },
            ]}
            register={register}
            {...register("unit", { required: "Unidade é obrigatório" })}
            name="unit"
            placeholder="Selecione uma unidade"
            readonly={undefined}
            value={undefined}
            error={undefined}
            icon={undefined}
            disabled={undefined}
            id={undefined}
            horizontal={undefined}
            validate={undefined}
            msgTooltip={undefined}
            description={undefined}
            onChange={undefined}
            defaultValue={undefined}
            size={undefined}
          />
          <Select
            label="Cameras"
            options={[
              {
                label: "test1",
                value: "test1",
              },
              {
                label: "test2",
                value: "test2",
              },
              {
                label: "test3",
                value: "test3",
              },
            ]}
            register={register}
            // {...register("cata", { required: "cata is required" })}
            name="cata"
            placeholder="Selecione uma filial"
            readonly={undefined}
            value={undefined}
            error={undefined}
            icon={undefined}
            disabled={undefined}
            id={undefined}
            horizontal={undefined}
            validate={undefined}
            msgTooltip={undefined}
            description={undefined}
            onChange={undefined}
            defaultValue={undefined}
            size={undefined}
          />
          <Textarea
            label="Descrição"
            placeholder="Descrição da ocorrência"
            register={register}
            {...register("description", {
              required: "Description é obrigatório",
            })}
            error={errors.description}
          />

          <ImagesGroupSelect label="Anexar imagens"></ImagesGroupSelect>

          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark  text-center">Add</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
