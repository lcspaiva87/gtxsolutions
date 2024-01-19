
import { enqueueSnackbar } from "notistack";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { addCamera, deleteCamera, ListCameras, updateCamera } from "@/data/cameras";

export const useCameras = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation(addCamera, {
    onError: () => {
      enqueueSnackbar('Erro ao Salvar Camera , tente novamente', {
        variant: 'error',
      })
    },
    onSuccess: (_, data) => {
      enqueueSnackbar('Camera Salvada com sucesso!', { variant: 'success' })
      queryClient.invalidateQueries('cameras')
    },
  })

  const removeMutation = useMutation(deleteCamera, {
    onError: () => {
      enqueueSnackbar('Erro ao remover task, tente novamente', {
        variant: 'error',
      })
    },

    onSuccess: (_, id) => {

      enqueueSnackbar('camera removido sucesso', { variant: 'success' })
      queryClient.invalidateQueries('cameras')
    },
  })

  const updateMutation = useMutation(updateCamera, {
    onError: (erro) => {
      console.log(erro, "erro")
      enqueueSnackbar(erro?.message || 'Erro ao editar usuário', {
        variant: 'error',
      })
      console.log("erro",erro)
    },
    onSuccess: (response) => {
      enqueueSnackbar("Usuário editado com sucesso", {
        variant: 'success',
      })
    }
  });



  const {
    isLoading,
    isError,
    data: list
  } = useQuery({
    queryKey: ['cameras'],
    queryFn: () => ListCameras()
  })

  return {
    isLoading,
    isError,
    createMutation,
    removeMutation,
    updateMutation,
    camera: list ?? []
  }
}

