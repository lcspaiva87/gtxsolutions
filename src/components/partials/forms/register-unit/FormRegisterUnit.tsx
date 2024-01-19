"use client";
import Textinput from "@/components/ui/Textinput";
import { useUnit } from "@/hooks/useUnit";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import creatIunitStore from "./store";

type FormValues = {
  name: string;
  email: string;
};

const FormValidationSchema = yup
  .object({
    name: yup.string().required("name is required"),
    email: yup.string().email().required("email is required"),
  })
  .required();

export function FormRegisterUnit() {
  const { createMutation, updateMutation, refetch } = useUnit();
  const { modalAction, unitInitialData } = creatIunitStore();
  let defaultValues: FormValues = {
    name: "",
    email: "",
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
      name: "",
      email: "",
    },
    mode: "all",
  });

  useEffect(() => {
    let formFields = Object.entries(defaultValues);
    console.log("formFields", formFields); // Corrigido para usar formFields ao invés de userInitialData
    formFields.forEach(([name, fieldValue]) => {
      if (unitInitialData) {
        setValue(name, unitInitialData ? unitInitialData[name] : "");
      }
    });
  }, [unitInitialData]);

  async function handleRegisterUser({email,name}: FormValues) {
    if (modalAction === "create") {
    await createMutation.mutate({
        name: name,
        email: email,
      });
      reset()
    } else {
      return await updateMutation.mutate({
        id: "",
        email: "",
        name: ""
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(handleRegisterUser)}>
      <div className="p-[1rem] ">
        <label htmlFor="">Cadastro de Unidades</label>
        <div className="grid grid-cols-2  gap-[1rem] mt-[2rem]">
          <Textinput
            label="Nome"
            placeholder="Digite o nome da unidade"
            register={register}
            {...register("name", { required: "description is required" })}
            error={errors.name}
          />
        </div>
        <div className="grid grid-cols-2  gap-[1rem] mt-[2rem]">
          <input {...register("email")} type="hidden" />
          <Textinput
            label="Email"
            placeholder="Digite o email da unidade"
            register={register}
            {...register("email", { required: "description is required" })}
            error={errors.email}
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
            Registrar Unidade
          </button>
        </div>
      </div>
    </form>
  );
}
