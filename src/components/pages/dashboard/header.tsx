import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Icons } from "../../icons";
import * as yup from "yup";
import clsx from "clsx";
import * as Avatar from "@radix-ui/react-avatar";
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
    <div className="bg-gray-100  h-[5rem] justify-between items-center flex p-2">
      <h1 className="text-gray-900 font-bold text-3xl ">Dashboard</h1>
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

      <div className="flex justify-betweenr gap-2 ">
        <button className="relative inline-flex items-center text-sm font-medium text-center text-white border-none ">
          <Icons.Bell className="text-gray-900 relative " />
          <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 ">
            8
          </div>
        </button>
        <Avatar.Root className="AvatarRoot">
          <Avatar.Image
            className="w-10 h-10 rounded-full object-cover "
            src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
            alt="Colm Tuite"
          />
          <Avatar.Fallback className="AvatarFallback" delayMs={600}>
            CT
          </Avatar.Fallback>
        </Avatar.Root>
        <div>
          <h1 className="font-medium text-gray-900">Lucas paiva</h1>
          <span className="font-light text-gray-900">Analista 1</span>
        </div>
      </div>
    </div>
  );
}
