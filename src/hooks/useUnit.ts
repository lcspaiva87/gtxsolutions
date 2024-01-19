
import { enqueueSnackbar } from "notistack";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { ListnUnit, addUnit, deleteUnit, updateUnit } from "@/data/unit";

export const useUnit = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation(addUnit, {
    onError: (erro) => {
      enqueueSnackbar('Ocorreu um erro ao adicionar a unidade, tente novamente', {
        variant: 'error',
      })
      console.log("erro", erro);
      return
    },
    onSuccess: (_, data) => {
      enqueueSnackbar('Unidade adicionada com sucesso!', { variant: 'success' })
      queryClient.invalidateQueries('unit')
    },
  })

  const removeMutation = useMutation(deleteUnit, {
    onError: () => {
      enqueueSnackbar('Ocorreu um erro ao remover a unidade, tente novamente', {
        variant: 'error',
      })
    },

    onSuccess: (_, id) => {
      queryClient.invalidateQueries(['unit'])
      enqueueSnackbar('Unidade removida com sucesso!', { variant: 'success' })
    },
  })

  const updateMutation = useMutation(updateUnit, {
    onError: (erro) => {
      console.log(erro, "erro")
      enqueueSnackbar('Ocorreu um erro ao adicionar a editar, tente novamente', {
        variant: 'error',
      })
      console.log("erro",erro)
    },
    onSuccess: (response) => {
      enqueueSnackbar("Unidade editado com sucesso", {
        variant: 'success',
      })
      queryClient.invalidateQueries('unit')
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

