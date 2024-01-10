"use client";
import Textinput from "@/components/ui/Textinput";
import { useUser } from "@/hooks/useUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import createUserStore from "./store";
import { useEffect } from "react";
import { generatePassword } from "@/utils/utils";

type FormValues = {
  id: string;
  name: string;
  email: string;
  dat_of_birth: Date;
  password: string;
  phone: string;
  branch: string;
  Position_in_the_Company: string;
  Sector_Department: string;
};

const FormValidationSchema = yup
  .object({
    id: yup.string(),
    name: yup.string().required("name is required"),
    email: yup.string().email().required("email is required"),
    dat_of_birth: yup.date().required("email is required"),
    password: yup.string().required("password is required"),
    phone: yup.string().required("phone is required"),
    branch: yup.string().required("phone is required"),
    Position_in_the_Company: yup
      .string()
      .required("Position_in_the_Company is required"),
    Sector_Department: yup.string().required("Sector_Department is required"),
  })
  .required();

export function FormRegister() {
  const { createUserMutation, createUserUpdateMutation } = useUser();
  const { modalAction, userInitialData } = createUserStore();

  let defaultValues: FormValues = {
    id: "0",
    name: "",
    email: "",
    branch: "",
    password: generatePassword(8),
    phone: "",
    Position_in_the_Company: "",
    Sector_Department: "",
    dat_of_birth: new Date(),
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
      email: "",
      branch: "",
      password: generatePassword(8),
      phone: "",
      Position_in_the_Company: "",
      Sector_Department: "",
      dat_of_birth: new Date(),
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
      return createUserMutation.mutate({
        name: data.name,
        email: data.email,
        password: data.password
      });
    }
    else {
      return createUserUpdateMutation.mutate({
        id: data.id,
        email: data.email,
        password: data.password
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(handleRegisterUser)}>
      <div className="p-[1rem] ">
        <label htmlFor="">Adicionando usuário</label>
        <div className="grid grid-cols-2  gap-[1rem] mt-[2rem]">
          <input {...register("id")} type="hidden" />

          <Textinput
            label="Nome Funcionario"
            placeholder="Nome Funcionario"
            register={register}
            {...register("name", { required: "Name is required" })}
            error={errors.name}
          />

          <Textinput
            label="Data de nascimento"
            placeholder="dat_of_birth"
            register={register}
            {...register("dat_of_birth", { required: "Name is required" })}
            error={errors.dat_of_birth}
          />
          <Textinput
            label="Email"
            placeholder="email"
            register={register}
            {...register("email", { required: "email is required" })}
            error={errors.email}
          />
          <Textinput
            label="Telefone"
            placeholder="(xx) xxxx-xxxx"
            register={register}
            {...register("phone", { required: "email is required" })}
            error={errors.phone}
          />

          <Textinput
            label="password"
            placeholder="Digite sua senha"
            register={register}
            {...register("password", { required: "email is required" })}
            error={errors.password}
            type="password"
          />
        </div>
      </div>
      <div className="p-[1rem] ">
        <label htmlFor="">Informações da Empresa</label>
        <div className="grid grid-cols-2  gap-[1rem] mt-[1rem]">
          <Textinput
            label="Filial"
            placeholder="Filial"
            register={register}
            {...register("branch", { required: "email is required" })}
            error={errors.branch}
          />
          <Textinput
            label="Cargo na Empresa:"
            placeholder="Cargo na Empresa:"
            register={register}
            {...register("Position_in_the_Company", {
              required: "email is required",
            })}
            error={errors.Position_in_the_Company}
          />
          <Textinput
            label="Setor/Departamento:"
            placeholder="Setor/Departamento:"
            register={register}
            {...register("Sector_Department", {
              required: "email is required",
            })}
            error={errors.Sector_Department}
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
            Registrar usuario
          </button>
        </div>
      </div>
    </form>
  );
}
