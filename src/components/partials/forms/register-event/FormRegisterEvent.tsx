"use client";
import Textinput from "@/components/ui/Textinput";
import { useEvent } from "@/hooks/useEvent";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import createUserStore from "./store";

type FormValues = {
  id: string;
  description: string;
};

const FormValidationSchema = yup
  .object({
    id: yup.string(),
    description: yup.string().email().required("email is required"),

  })
  .required();

export function FormRegisterEvent() {
  const { createMutation,updateMutation } = useEvent();
  const { modalAction, userInitialData } = createUserStore();

  let defaultValues: FormValues = {
    id: "0",
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
    if (modalAction === "create") {
      return createMutation.mutate({
        description: data.description,

      });
    } else {
      return updateMutation.mutate({
        id: data.id,
        description: data.description,

      });
    }
  }

  return (
    <form onSubmit={handleSubmit(handleRegisterUser)}>
      <div className="p-[1rem] ">
        <label htmlFor="">Cadastro de Tipo de ocorrência</label>
        <div className="grid grid-cols-2  gap-[1rem] mt-[2rem]">
          <input {...register("id")} type="hidden" />
          <Textinput
            label="descriçao"
            placeholder="Seg. patrimonial, Seg. de Processo etc."
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
            Registrar Ocorrência
          </button>
        </div>
      </div>
    </form>
  );
}
