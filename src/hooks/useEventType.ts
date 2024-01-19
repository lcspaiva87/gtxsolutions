
import { enqueueSnackbar } from "notistack";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { addEventType, deleteEventType, listEventType, updateEventType } from "@/data/eventType";

export const useEventType = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation(addEventType, {
    onError: () => {
      enqueueSnackbar('Ocorreu um erro ao criar a tipo de ocorrência, tente novamente', {
        variant: 'error',
      })
    },
    onSuccess: (_, data) => {
      enqueueSnackbar('Tipo de ocorrência adicionada com sucesso!', { variant: 'success' });
      queryClient.invalidateQueries("event_type");
    },
  })

  const removeMutation = useMutation(deleteEventType, {
    onError: () => {
      enqueueSnackbar('Ocorreu um erro ao remover o tipo de ocorrência, tente novamente', {
        variant: 'error',
      })
    },

    onSuccess: (_, id) => {
      enqueueSnackbar('Tipo de ocorrência removido com sucesso!', { variant: 'success' });
      queryClient.invalidateQueries("event_type");
    },
  })

  const updateMutation = useMutation(updateEventType, {
    onError: (erro) => {
      console.log(erro, "erro")
      enqueueSnackbar('Ocorreu um erro ao editar o tipo de ocorrência, tente novamente', {
        variant: 'error',
      })
      console.log("erro",erro)
    },
    onSuccess: (response) => {
      enqueueSnackbar('Tipo de ocorrência editado com sucesso!', {
        variant: 'success',
      })
      queryClient.invalidateQueries("event_type");
    }
  });

  const {
    isLoading,
    isError,
    data: list
  } = useQuery({
    queryKey: ['event_type'],
    queryFn: () => listEventType()
  })

  return {
    isLoading,
    isError,
    createMutation,
    removeMutation,
    updateMutation,
    eventType: list ?? []
  }
}

