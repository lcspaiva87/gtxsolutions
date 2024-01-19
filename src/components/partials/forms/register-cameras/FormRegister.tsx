"use client";
import Textinput from "@/components/ui/Textinput";
import { useCameras } from "@/hooks/useCameras";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import createCameraStore from "./store";

type FormValues = {
  id: string;
  ip: string;
  description: string;
  site: string;
  id_camera_group: string;
};

const FormValidationSchema = yup
  .object({
    id: yup.string(),
    description: yup.string().required("Descrição é obrigatório"),
    ip: yup.string().required("IP é obrigatório"),
    site: yup.string().required("Site é obrigatório"),
    id_camera_group: yup.string().required("Grupo é obrigatório"),
  })
  .required();

export function FormRegister() {
  const { createMutation,updateMutation  } = useCameras();
  const { modalAction, cameraInitialData } = createCameraStore();

  let defaultValues: FormValues = {
    id: "0",
    description: "",
    ip: "",
    site: "",
    id_camera_group: "",
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
      ip: "",
      site: "",
      id_camera_group: "",
    },
    mode: "all",
  });

  useEffect(() => {
    let formFields = Object.entries(defaultValues);
    formFields.forEach(([name, fieldValue]) => {
      if (cameraInitialData) {
        setValue(name, cameraInitialData ? cameraInitialData[name] : "");
      }
    });
  }, [cameraInitialData]);

  async function handleRegisterUser(data: any) {
    if (modalAction === "create") {
      return createMutation.mutate({
        ip: data.ip,
        description: data.description,
        id_camera_group: data.id_camera_group,
        site: data.site,
      });
    } else {
      return updateMutation.mutate({
        id: data.id,
        ip: data.ip,
        description: data.description,
        id_camera_group: data.id_camera_group,
        site: data.site,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(handleRegisterUser)}>
      <div className="p-[1rem] ">
        <label htmlFor="">Adicionando Câmeras </label>
        <div className="grid grid-cols-2  gap-[1rem] mt-[2rem]">
          <input {...register("id")} type="hidden" />

          <Textinput

            label="IP"
            placeholder="000.000.000.000"
            register={register}
            {...register("ip", { required: "Ip is required" })}
            error={errors.ip}
          />

          <Textinput
            label="Descrição"
            placeholder="Descrição"
            register={register}
            {...register("description", {
              required: "Descrição é obrigatório",
            })}
            error={errors.description}
          />
          <Textinput
            label="Grupo"
            placeholder="Mandu"
            register={register}
            {...register("id_camera_group", {
              required: "Grupo é obrigatório",
            })}
            error={errors.id_camera_group}
          />
          <Textinput
            label="Site"
            placeholder="https://site.com"
            register={register}
            {...register("site", { required: "site is required" })}
            error={errors.site}
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
            Registrar Câmera
          </button>
        </div>
      </div>
    </form>
  );
}
