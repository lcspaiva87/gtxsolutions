"use client";
import Textinput from "@/components/ui/Textinput";
import { useDepartments } from "@/hooks/useDepartments";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import createUserStore from "./store";

type FormValues = {
  id: string;
  name: string;
};

const FormValidationSchema = yup
  .object({
    id: yup.string(),
    name: yup.string().required("name is required"),
  })
  .required();

export function FormRegister() {
  const { createMutation, updateMutation } = useDepartments();
  const { modalAction, userInitialData } = createUserStore();

  let defaultValues: FormValues = {
    id: "0",
    name: "",
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
    },
    mode: "all",
  });

  useEffect(() => {
    let formFields = Object.entries(defaultValues);
    formFields.forEach(([name, fieldValue]) => {
      if (userInitialData) {
      }
      setValue(name, userInitialData ? [name] : "");
    });
  }, [userInitialData]);

  async function handleRegisterUser(data: any) {
    if (modalAction === "create") {
      return createMutation.mutate({
        name: data.name,

      });
    } else {
      return updateMutation.mutate({
        id: data.id,
        name: data.ip,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(handleRegisterUser)}>
      <div className="p-[1rem] ">
        <label htmlFor="">Cadastro de Setores </label>
        <div className="grid grid-cols-2  gap-[1rem] mt-[2rem]">
          <input {...register("id")} type="hidden" />

          <Textinput
            label="Departamento"
            placeholder="Portaria Social"
            register={register}
            {...register("name", { required: "name is required" })}
            error={errors.name}
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
            Registrar Setores
          </button>
        </div>
      </div>
    </form>
  );
}
