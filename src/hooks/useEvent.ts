
import { enqueueSnackbar } from "notistack";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { addEvent, deleteEvent, listEvent, updateEvent } from "@/data/event";

export const useEvent = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation(addEvent, {
    onError: () => {
      enqueueSnackbar('Ocorreu um erro ao criar a natureza da ocorrência, tente novamente', {
        variant: 'error',
      })
    },
    onSuccess: (_, data) => {
      enqueueSnackbar('Natureza da ocorrência adicionada com sucesso!', { variant: 'success' })
      queryClient.invalidateQueries("event");
    },
  })

  const removeMutation = useMutation(deleteEvent, {
    onError: () => {
      enqueueSnackbar('Ocorreu um erro ao editar a natureza da ocorrência, tente novamente', {
        variant: 'error',
      })
    },

    onSuccess: (_, id) => {
      enqueueSnackbar('Natureza da ocorrência removida com sucesso!', { variant: 'success' });
      queryClient.invalidateQueries("event");
    },
  })

  const updateMutation = useMutation(updateEvent, {
    onError: (erro) => {
      console.log(erro, "erro")
      enqueueSnackbar('Ocorreu um erro ao editar a natureza da ocorrência, tente novamente', {
        variant: 'error',
      })
      console.log("erro",erro)

    },
    onSuccess: (response) => {
      enqueueSnackbar('Natureza da ocorrência editada com sucesso!', {
        variant: 'success',
      })
      queryClient.invalidateQueries("event");
    }
  });



  const {
    isLoading,
    isError,
    data: list
  } = useQuery({
    queryKey: ['event'],
    queryKey: ['event'],
    queryFn: () => listEvent()
  })

  return {
    isLoading,
    isError,
    createMutation,
    removeMutation,
    updateMutation,
    event: list ?? []
  }
}

