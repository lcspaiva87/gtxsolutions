
import { enqueueSnackbar } from "notistack";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { addDepartments, deleteDepartments, listDepartments, updateDepartments } from "@/data/departments";

export const useDepartments = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation(addDepartments, {
    onError: () => {
      enqueueSnackbar('Ocorreu um erro ao adicionar o departamento, tente novamente', {
        variant: 'error',
      })
    },
    onSuccess: (_, data) => {
      enqueueSnackbar('Departamento adicionado com sucesso!', { variant: 'success' });
      queryClient.invalidateQueries("departament");
    },
  })

  const removeMutation = useMutation(deleteDepartments, {
    onError: () => {
      enqueueSnackbar('Ocorreu um erro ao remover o departamento, tente novamente', {
        variant: 'error',
      })
    },

    onSuccess: (_, id) => {
      enqueueSnackbar('Departamento removido com sucesso!', { variant: 'success' });
      queryClient.invalidateQueries("departament");
    },
  })

  const updateMutation = useMutation(updateDepartments, {
    onError: (erro) => {
      console.log(erro, "erro")
      enqueueSnackbar('Ocorreu um erro ao editar o departamento, tente novamente', {
        variant: 'error',
      })
      console.log("erro",erro)
    },
    onSuccess: (response) => {
      enqueueSnackbar('Departamento editado com sucesso!', {
        variant: 'success',
      })
      queryClient.invalidateQueries("departament");
    }
  });

  const {
    isLoading,
    isError,
    data: list
  } = useQuery({
    queryKey: ['departament'],
    queryFn: () => listDepartments()
  })

  return {
    isLoading,
    isError,
    createMutation,
    removeMutation,
    updateMutation,
    departments: list ?? []
  }
}

