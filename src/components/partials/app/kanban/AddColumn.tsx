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
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import kabanStore from "./store";

type FormValues = {
  branch: number;
  unit: number;
  description: string;
  // cameras: number[];
  images: any[];
};

const FormValidationSchema = yup
  .object({
    images: yup.array(),
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
  const { columModal, toggleColumnModal, addColumnBoard } = kabanStore();
  const { createMutation } = useColumns();

  const {
    control,
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
    description, // cameras,
    images
  } // images,
  : FormValues) => {
    // console.log({ branch, unit, description, cameras, images }, "submit");
    const id = `container-${uuidv4()}`;
    // createMutation.mutate({ branch, unit, description, cameras, images })

    toggleColumnModal(false);
    reset();
    addColumnBoard({
      id: description,
      columnId: "0",
      title: "Nova ocorrência 19/01/2024",
      user: "user",
      message: description,
      startDate: "19/01/2024",
      endDate: "--/--/----",
      assignee: [{
        label: "Leonardo Amaro",
        image: "https://lh3.googleusercontent.com/a/ACg8ocJzFnZEmgQkVZhJn7GK1_8JS4XLkf4v3-Gi8ylaDETEUA=s288-c-no"
      }],
    })
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
                label: "Tereos",
                value: 1,
              }
            ]}
            register={register}
            {...register("branch", { required: "Filial é obrigatório" })}
            error={errors.branch}
            name="branch"
            placeholder="Selecione uma filial"
            readonly={undefined}
            value={undefined}
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
                label: "Mandu",
                value: 1,
              }
            ]}
            register={register}
            {...register("unit", { required: "Unidade é obrigatório" })}
            name="unit"
            placeholder="Selecione uma unidade"
            readonly={undefined}
            value={undefined}
            error={errors.images}
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
                label: "Escritório",
                value: 1,
              },
              {
                label: "Estacionamento",
                value: 2,
              }
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

          <Controller
            control={control}
            name="images"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <ImagesGroupSelect label="Anexar imagens" onChange={onChange}/>
            )}
          />

          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark  text-center">Add</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
