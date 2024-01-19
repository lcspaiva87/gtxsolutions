
import { enqueueSnackbar } from "notistack";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { ListnUnit, addUnit, deleteUnit, updateUnit } from "@/data/unit";

export const useUnit = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation(addUnit, {
    onError: (erro) => {
      enqueueSnackbar('Erro ao Salvar Unidade  , tente novamente', {
        variant: 'error',
      })
      console.log("erro",erro)
      return
    },
    onSuccess: (_, data) => {
      enqueueSnackbar('Unidade  Salvada com sucesso!', { variant: 'success' })
      queryClient.invalidateQueries('unit')
    },
  })

  const removeMutation = useMutation(deleteUnit, {
    onError: () => {
      enqueueSnackbar('Erro ao remover Unidade, tente novamente', {
        variant: 'error',
      })
    },

    onSuccess: (_, id) => {
      queryClient.invalidateQueries(['unit'])
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
    refetch,
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
    unit: list ?? [],
    refetch
  }
}

