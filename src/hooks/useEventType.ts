
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
      enqueueSnackbar('EventoType Salvada com sucesso!', { variant: 'success' })
      queryClient.invalidateQueries(['eventType'])
    },
  })

  const removeMutation = useMutation(deleteEventType, {
    onError: () => {
      enqueueSnackbar('Erro ao remover EventoType, tente novamente', {
        variant: 'error',
      })
    },

    onSuccess: (_, id) => {

      enqueueSnackbar('EventoType removido sucesso', { variant: 'success' })
      queryClient.invalidateQueries(['eventType'])
    },
  })

  const updateMutation = useMutation(updateEventType, {
    onError: (erro) => {

      enqueueSnackbar(erro?.message || 'Erro ao editar EventoType', {
        variant: 'error',
      })
      queryClient.invalidateQueries(['eventType'])
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

