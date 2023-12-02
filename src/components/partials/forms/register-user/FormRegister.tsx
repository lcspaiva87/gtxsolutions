"use client";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { MultiSelect } from "@/components/ui/MultiSelect";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import createUserStore from "./store";
interface Icompany {
  id: string;
  value: string;
  label: string;
}

type FormValues = {
  name: string;
  email: string;
  dat_of_birth: Date;
  password: string;
  phone: string;
  branch: string;
  Position_in_the_Company: string;
  Sector_Department: string;
  valuesOption: any;
};
const FormValidationSchema = yup
  .object({
    name: yup.string().required("name is required"),
    email: yup.string().email().required("email is required"),
    dat_of_birth: yup.date().required("email is required"),
    password: yup.string().required("password is required"),
    phone: yup.string().required("phone is required"),
    branch: yup.string().required("phone is required"),
    valuesOption: yup.array().required("valuesOption is required"),
    Position_in_the_Company: yup
      .string()
      .required("Position_in_the_Company is required"),
    Sector_Department: yup.string().required("Sector_Department is required"),
  })
  .required();
export function FormRegister() {
  const {
    register,
    reset,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      branch: "",
      password: "",
      phone: "",
      Position_in_the_Company: "",
      Sector_Department: "",
      dat_of_birth: new Date(),
      valuesOption: [],
    },
    mode: "all",
  });

  async function handleRegisterUser(data: FormValues) {
    console.log("data", data);
  }
  const { company } = createUserStore();

  const options:Icompany[]= [
    { id: '1', value: "option1", label: "Opção 1" },
    { id: '2', value: "option2", label: "Opção 2" },
    { id: '3', value: "option3", label: "Opção 3" },
    // Adicione mais opções conforme necessário
  ];
  return (
    <form onSubmit={handleSubmit(handleRegisterUser)}>
      <div className="p-[1rem] ">
        <label htmlFor="">Dados do usario</label>
        <div className="grid grid-cols-2  gap-[1rem] mt-[1rem]">
          <Input
            type="text"
            name="name"
            control={control}
            placeholder="nome completo"
          />
          <Input type="date" name="dat_of_birth" control={control} />

          <Input
            type="email"
            name="email"
            control={control}
            placeholder="Digite seu email"
          />
          <Input
            type="text"
            name="phone"
            placeholder="(xx) xxxx-xxxx"
            control={control}
          />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
            control={control}
          />
        </div>
      </div>
      <div className="p-[1rem] ">
        <label htmlFor="">Informações da Empresa</label>
        <div className="grid grid-cols-2  gap-[1rem] mt-[1rem]">
          <Input
            type="text"
            name="branch"
            control={control}
            placeholder="Filial"
          />
          <Input
            type="text"
            name="Position_in_the_Company"
            control={control}
            placeholder="Cargo na Empresa:"
          />
          <Input
            type="text"
            name="Sector_Department"
            control={control}
            placeholder="Setor/Departamento:"
          />
          <MultiSelect   />
        </div>
      </div>
      <div className="flex  items-center justify-center">
        <div className="flex w-[15rem] ">
          <Button
            className="mt-4 w-[35rem] py-3 "
            type="submit"
            disabled={false || !errors}
          >
            {/* {false ? <LoadingSpinner className="mx-auto" /> : ' Sign in'} */}
            Registrar usuario{" "}
          </Button>
        </div>
      </div>
    </form>
  );
}
