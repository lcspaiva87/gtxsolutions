"use client";
import Textinput from "@/components/ui/Textinput";
import { useEventType } from "@/hooks/useEventType";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import createUserStore from "./store";

type FormValues = {
  id: string;
  name: string;
  description: string;

};

const FormValidationSchema = yup
  .object({
    id: yup.string(),
    name: yup.string().required("name is required"),
    description: yup.string().required("description is required"),
  })
  .required();

export function FormRegisterEventType() {
  const { createMutation, updateMutation } = useEventType();
  const { modalAction, userInitialData } = createUserStore();

  let defaultValues: FormValues = {
    id: "0",
    name: "",
    description: "",
  };

  const {
    register,
    reset,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
    defaultValues: {
      id: "0",
      name: "",
      description: "",
    },
    mode: "all",
  });

  useEffect(() => {
    let formFields = Object.entries(defaultValues);
    formFields.forEach(([fieldName, fieldValue]) => {
      if (userInitialData) {
      }
      setValue(fieldName, userInitialData ? [fieldName] : "");
    });
  }, [userInitialData]);

  async function handleRegisterUser(data: any) {
    if(modalAction === "create") {
      return createMutation.mutate({
        name: data.name,
        description: data.description,
      });
    }
    else {
      return updateMutation.mutate({
        id: data.id,
        name: data.name,
        description: data.description,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(handleRegisterUser)}>
      <div className="p-[1rem] ">
        <label htmlFor="">Cadastro de Tipo de ocorrência.</label>
        <div className="grid grid-cols-2  gap-[1rem] mt-[2rem]">
          <input {...register("id")} type="hidden" />

          <Textinput
            label="Titulo da ocorrência "
            placeholder="Nome Funcionario"
            register={register}
            {...register("name", { required: "Name is required" })}
            error={errors.name}
          />

          <Textinput
            label="Descrição"
            placeholder="Digire a descrição"
            register={register}
            {...register("description", { required: "description is required" })}
            error={errors.description}
          />

        </div>
      </div>

      <div className="flex  items-center justify-start p-[1rem]">
        <div className="ltr:text-right rtl:text-left">
          <button
            className="btn bg-sky-700 hover:bg-sky-600 text-center"
            type="submit"
          >
            {" "}
            Registrar ocorrência
          </button>
        </div>
      </div>
    </form>
  );
}
