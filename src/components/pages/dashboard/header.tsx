import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Icons } from "../../icons";
import { InputCustomer } from "../../ui/inputs";
import * as yup from "yup";
import clsx from "clsx";

type FormValues = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(8, "A senha deve ter pelo menos 8 caracteres"),
});
export function Header() {
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <div className="bg-gray-900  h-[5rem] justify-center items-center flex">
      <div className="w-[28rem]">
        <div
          className={clsx(
            "flex w-full items-center gap-2 rounded-lg border border-secondary-300 p-2 ring-primary-200 transition-colors focus-within:border focus-within:border-primary focus-within:ring"
          )}
        >
          <Icons.Search className="w-5 text-gray-50" />
          <input
            placeholder="Digite o status o nome do cards"
            className="text-gray-50 w-full border-none bg-transparent p-0 text-label placeholder:text-secondary-400 focus:outline-none focus:ring-0"
          />
        </div>
      </div>
    </div>
  );
}
