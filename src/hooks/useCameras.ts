
import { enqueueSnackbar } from "notistack";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { addCamera, deleteCamera, ListCameras, updateCamera } from "@/data/cameras";

export const useCameras = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation(addCamera, {
    onError: () => {
      enqueueSnackbar('Ocorreu um erro ao adicionar a câmera, tente novamente', {
        variant: 'error',
      })
    },
    onSuccess: (_, data) => {
      enqueueSnackbar('Camera adicionada com sucesso!', { variant: 'success' });
      queryClient.invalidateQueries("camera");
    },
  })

  const removeMutation = useMutation(deleteCamera, {
    onError: () => {
      enqueueSnackbar('Ocorreu um erro ao remover a câmera, tente novamente', {
        variant: 'error',
      })
    },

    onSuccess: (_, id) => {
      enqueueSnackbar('Camera removida sucesso', { variant: 'success' });
      queryClient.invalidateQueries("camera");
    },
  })

  const updateMutation = useMutation(updateCamera, {
    onError: (erro) => {
      console.log(erro, "erro")
      enqueueSnackbar("Ocorreu um erro ao editar a câmera, tente novamente", {
        variant: 'error',
      })

      console.log("erro",erro)
    },
    onSuccess: (response) => {
      enqueueSnackbar("Camera editada com sucesso", {
        variant: 'success',
      })
      
      queryClient.invalidateQueries("camera");
    }
  });

  const {
    isLoading,
    isError,
    data: list
  } = useQuery({
    queryKey: ['camera'],
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

