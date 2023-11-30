import { Input } from "@/components/ui/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
type FormValues = {
  name: string;
  email: string;
  dat_of_birth: string;
  passowrd: string;
  phone: string;
  branch: string;
  Position_in_the_Company:string
  Sector_Department: string
};
const FormValidationSchema = yup
  .object({
    name: yup.string().required("name is required"),
    email: yup.string().email().required("email is required"),
    dat_of_birth: yup.date().required("email is required"),
    passowrd: yup.string().required("passowrd is required"),
    phone: yup.string().required("phone is required"),
    branch: yup.string().required("branch is required"),
    Position_in_the_Company: yup.string().required("Position_in_the_Company is required"),
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
      passowrd  : "",
      phone: "",
      Position_in_the_Company: "",
      Sector_Department: "",
      dat_of_birth: new Date(),
    },
    mode: "all",
  });
  return (
    <form>
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
            name="Telefone"
            placeholder="(xx) xxxx-xxxx"
            control={control}
          />
          <Input
            type="password"
            name="Senha"
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
            name="name"
            control={control}
            placeholder="Filial"
          />
          <Input
            type="text"
            name="name"
            control={control}
            placeholder="Cargo na Empresa:"
          />
           <Input
            type="text"
            name="name"
            control={control}
            placeholder="Setor/Departamento:"
          />
        </div>
      </div>
    </form>
  );
}
