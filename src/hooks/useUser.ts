import { LoginUser } from "@/data/user"
import { enqueueSnackbar } from "notistack"
import { useMutation, useQuery, useQueryClient } from "react-query"

export const useUser = () =>{
  const queryClient = useQueryClient()
  const createMutation = useMutation({
    mutationFn:LoginUser,
    mutationKey: ['user'],
    onError: () => {
      enqueueSnackbar('Erro ao tentar fazer login', {
        variant: 'error',
      })

    },
    onSuccess: (_, data) => {
      console.log(data)
    }
  })
  const {
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user'],

  })
  return {

    isLoading,
    isError,
    createMutation,
  }
}

