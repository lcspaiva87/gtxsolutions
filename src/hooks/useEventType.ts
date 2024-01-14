
import { enqueueSnackbar } from "notistack";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { addEventType, deleteEventType, listEventType, updateEventType } from "@/data/eventType";

export const useEventType = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation(addEventType, {
    onError: () => {
      enqueueSnackbar('Erro ao Salvar EventoType , tente novamente', {
        variant: 'error',
      })
    },
    onSuccess: (_, data) => {
      queryClient.setQueryData(['eventType', undefined], (oldData: any) => [
        ...oldData,
        data,
      ])
      enqueueSnackbar('EventoType Salvada com sucesso!', { variant: 'success' })
    },
  })

  const removeMutation = useMutation(deleteEventType, {
    onError: () => {
      enqueueSnackbar('Erro ao remover EventoType, tente novamente', {
        variant: 'error',
      })
    },

    onSuccess: (_, id) => {
      queryClient.setQueryData(['eventType', undefined], (oldData: any) =>
        oldData.filter((item: any) => item.id !== id),
      )
      enqueueSnackbar('EventoType removido sucesso', { variant: 'success' })
    },
  })

  const updateMutation = useMutation(updateEventType, {
    onError: (erro) => {
      console.log(erro, "erro")
      enqueueSnackbar(erro?.message || 'Erro ao editar EventoType', {
        variant: 'error',
      })
      console.log("erro",erro)
    },
    onSuccess: (response) => {
      enqueueSnackbar("EventoType editado com sucesso", {
        variant: 'success',
      })
    }
  });



  const {
    isLoading,
    isError,
    data: list
  } = useQuery({
    queryKey: ['eventType'],
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

