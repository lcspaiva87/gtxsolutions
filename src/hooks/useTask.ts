'use client'

import {  useMutation, useQuery, useQueryClient } from "react-query";

import { deleteTaskId, fetchTask, pathTask } from "@/data/tasks";
import { Itask } from "@/@types/Task";
import { enqueueSnackbar } from "notistack";

export const useTask = (id?:Itask[]) => {
  const queryClient = useQueryClient();

  const saveMutation = useMutation(pathTask, {
    onError: () => {
      enqueueSnackbar("Erro ao salvar pathTask, tente novamente", {
        variant: "error",
      });
    },
})

const removeMutation = useMutation(deleteTaskId, {
  onError: () => {
    enqueueSnackbar("Erro ao remover produto, tente novamente", {
      variant: "error",
    });
  },
  onSuccess: (_, id) => {
    queryClient.setQueryData(["task", undefined], (oldData: any) =>
      oldData.filter((item:Itask ) => item.id !== id)
    );
    enqueueSnackbar("Task removido sucesso", { variant: "success" });
  },
});
    const {
      data: task,
      isLoading,
      isError,
    } = useQuery({
      queryKey: ["task", id],
      queryFn: () => fetchTask(),
    });
    return {
      tasks: task ?? [],
      isLoading,
      isError,
      saveMutation,
      removeMutation

    };
};


