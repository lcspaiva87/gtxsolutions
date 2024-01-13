
import { enqueueSnackbar } from "notistack";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { ListnUnit, addUnit, updateUnit } from "@/data/unit";

export const useEvent = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation(addUnit, {
    onError: () => {
      enqueueSnackbar('Erro ao Salvar Unidade  , tente novamente', {
        variant: 'error',
      })
    },
    onSuccess: (_, data) => {
      queryClient.setQueryData(['unit', undefined], (oldData: any) => [
        ...oldData,
        data,
      ])
      enqueueSnackbar('Unidade  Salvada com sucesso!', { variant: 'success' })
    },
  })

  const removeMutation = useMutation(ListnUnit, {
    onError: () => {
      enqueueSnackbar('Erro ao remover Unidade, tente novamente', {
        variant: 'error',
      })
    },

    onSuccess: (_, id) => {
      queryClient.setQueryData(['unit', undefined], (oldData: any) =>
        oldData.filter((item: any) => item.id !== id),
      )
      enqueueSnackbar('Unidade removido sucesso', { variant: 'success' })
    },
  })

  const updateMutation = useMutation(updateUnit, {
    onError: (erro) => {
      console.log(erro, "erro")
      enqueueSnackbar(erro?.message || 'Erro ao editar Evento', {
        variant: 'error',
      })
      console.log("erro",erro)
    },
    onSuccess: (response) => {
      enqueueSnackbar("Unidade editado com sucesso", {
        variant: 'success',
      })
    }
  });



  const {
    isLoading,
    isError,
    data: list
  } = useQuery({
    queryKey: ['unit'],
    queryFn: () => ListnUnit()
  })

  return {
    isLoading,
    isError,
    createMutation,
    removeMutation,
    updateMutation,
    unit: list ?? []
  }
}

