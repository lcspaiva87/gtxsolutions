
import { enqueueSnackbar } from "notistack";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { addEvent, deleteEvent, listEvent, updateEvent } from "@/data/event";

export const useEvent = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation(addEvent, {
    onError: () => {
      enqueueSnackbar('Erro ao Salvar Evento , tente novamente', {
        variant: 'error',
      })
    },
    onSuccess: (_, data) => {
      enqueueSnackbar('Evento Salvada com sucesso!', { variant: 'success' })
      queryClient.invalidateQueries(['event'])

    },
  })

  const removeMutation = useMutation(deleteEvent, {
    onError: () => {
      enqueueSnackbar('Erro ao remover Evento, tente novamente', {
        variant: 'error',
      })
    },

    onSuccess: (_, id) => {
      queryClient.setQueryData(['event', undefined], (oldData: any) =>
        oldData.filter((item: any) => item.id !== id),
      )
      enqueueSnackbar('Evento removido sucesso', { variant: 'success' })
    },
  })

  const updateMutation = useMutation(updateEvent, {
    onError: (erro) => {
      console.log(erro, "erro")
      enqueueSnackbar(erro?.message || 'Erro ao editar Evento', {
        variant: 'error',
      })
      console.log("erro",erro)
    },
    onSuccess: (response) => {
      enqueueSnackbar("Evento editado com sucesso", {
        variant: 'success',
      })
    }
  });



  const {
    isLoading,
    isError,
    data: list
  } = useQuery({
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

