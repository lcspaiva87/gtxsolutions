import Modal from "@/components/ui/Modal";
import { TextArea } from "@/components/ui/Textarea";
import { useTask } from "@/hooks/useTask";
import { yupResolver } from "@hookform/resolvers/yup";

import 'flatpickr/dist/flatpickr.min.css';
import { useState } from "react";
import Flatpickr from "react-flatpickr";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";
import { toggleTaskModal } from "../partials/app/kanban/store";
import { InputCustomer } from "../ui/inputs";
type FormValues = {
  company: string;
  camera: string;
  phone: string;
  responsible: string;
  message: string;
  priority: string;
  startDate:any
};
const FormSchema = yup.object().shape({
  company: yup.string().required("Digite o nome da empresa"),
  camera: yup.string().required("Digite o número da camera"),
  phone: yup.string().required("Digite o número da camera"),
  responsible: yup
    .string()
    .required("Digite o nome do responsavel pelo sentor"),
  message: yup.string().required("Digite a mensagem"),
  priority: yup.string().required("Digite a mensagem"),
  startDate: yup
  .date()
  .required("Start date is required")
  .min(new Date(), "Start date must be greater than today"),
});


export function FormCreateTask() {
  const { createMutation } = useTask();
  const [picker, setPicker] = useState(new Date());
  const { taskModal } = useSelector((state: any) => state.kanban);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      camera: "",
      company: "",
      message: "",
      phone: "",
      responsible: "",
      priority: "",
      startDate: "",
    },
  });
  async function onSubmit({
    camera,
    company,
    message,
    phone,
    responsible,
    priority,
  }: FormValues) {
    const id = uuidv4();
    try {
      // await createMutation.mutate({
      //   camera: camera,
      //   company: company,
      //   file: "fotos",
      //   message: message,
      //   phone: phone,
      //   responsible: responsible,
      //   avatar:
      //     "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80",
      //   id: id,
      //   columnId: idColumn,
      //   priority: priority,
      // });
    } catch (error) {
      console.error("Ocorreu um erro ao enviar a tarefa:", error);
    }
  }
  return (
    <Modal
      title="Create Project"
      labelClass="btn-outline-dark"
      activeModal={taskModal}
      onClose={() =>
        dispatch(
          toggleTaskModal({
            open: false,
          })
        )
      }
    >
      <form >
        <div className="flex flex-col w-full items-start gap-y-4">
          <h1 className="text-gray-800 text-lg font-bold">Relatório</h1>
          <Flatpickr
              className="form-control py-2"
              value={picker}
              onChange={(date) => setPicker(date)}
              id="default-picker"
            />
          <InputCustomer
            type="text"
            name="priority"
            placeholder="Nivel de prioridade"
            required
            control={control}
          />

          <InputCustomer
            type="text"
            name="company"
            placeholder="Empresa"
            required
            control={control}
          />
          <InputCustomer
            type="text"
            name="camera"
            placeholder="Camera"
            required
            control={control}
          />


          <InputCustomer
            type="text"
            name="phone"
            placeholder="Telefone"
            required
            control={control}
          />
          <InputCustomer
            type="text"
            name="responsible"
            placeholder="responsible"
            required
            control={control}
          />

          <div className="w-full">
            <div className="relative w-full ">
              <TextArea
                name="message"
                control={control}
                label="message"
                required
              />
            </div>
          </div>

          <div className=" w-full">
            <div className="extraOutline  bg-white w-full bg-whtie m-auto rounded-lg">
              <div
                className="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg"
                // style="width: 450px"
              >
                <svg
                  className="text-gray-500 w-24 mx-auto mb-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <div className="input_field flex flex-col w-full text-center">
                  <label>
                    <input
                      className="text-sm cursor-pointer hidden"
                      type="file"
                      multiple
                    />
                    <div className="text bg-gray-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">
                      Select
                    </div>
                  </label>

                  <div className="title text-gray-500 uppercase">
                    or drop files here
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-3 mt-3">
          <button className="flex text-red-300 items-center gap-2 border border-red-300 p-2 rounded-lg hover:text-red-400 hover:border-red-400">
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
