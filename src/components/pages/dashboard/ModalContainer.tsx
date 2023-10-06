import Modal from "../../modal/container";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";
import { useModalContainerStore } from "@/store/ModalContainerStore";
import { InputCustomer } from "@/components/ui/inputs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
type FormValues = {
  title: string;
};
const nameContainer = yup.object().shape({
  title: yup.string().required("nome obrigatório"),
});

export function ModalContainer() {
  const { isOpen, closeModal, addContainer, containers } =useModalContainerStore();
  const {
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(nameContainer),
    defaultValues: {
      title: "",
    },
  });
  async function onSubmit({ title }: FormValues) {
    const id = `container-${uuidv4()}`;
    const newContainer = {
      id: id,
      title: title,
      items: [],
    };
    addContainer(newContainer);
    closeModal();
    reset({ title: '' });
  }


  return (
    <Modal showModal={isOpen} setShowModal={() => closeModal()}>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <div className="flex flex-col w-full items-start gap-y-4">
          <h1 className="text-gray-800 text-3xl font-bold">
            Adicione Titulo do card
          </h1>
          <InputCustomer
            type="text"
            name="title"
            placeholder="Titulo do card"
            required
            control={control}
            //disabled={loading}
          />
        </div>
        <div className="flex justify-between gap-3 mt-3">
          <button
            onClick={() => closeModal()}
            className="flex text-red-300 items-center gap-2 border border-red-300 p-2 rounded-lg hover:text-red-400 hover:border-red-400"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex text-green-300 items-center gap-2 border border-green-300 p-2 rounded-lg hover:text-green-400 hover:border-green-600"
          >
            Adicionar
          </button>
        </div>
      </form>
    </Modal>
  );
}
