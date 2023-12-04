import { LoginUser, RefreshToken } from "@/data/user"
import { setCookie } from "nookies"
import { enqueueSnackbar } from "notistack"
import { useMutation, useQuery, useQueryClient } from "react-query"
export const useUser = () =>{
  const queryClient = useQueryClient()

  const createMutation = useMutation(LoginUser,{
    onError: (erro) => {
      enqueueSnackbar('Erro ao tentar fazer login', {
        variant: 'error',
      })

    },
    onSuccess: ( data) => {
      setCookie(undefined,'auth_token',data.token,{
        maxAge: 60 * 60 * 24, // 1 hour
        path: '/',
      })
      // router.push('/home')
      console.log("data",data)
    }
  })
  const RefreshTokenMutation = useMutation(RefreshToken,{
    onError: (erro) => {
      enqueueSnackbar('Erro ao tentar fazer login', {
        variant: 'error',
      })

    },
    onSuccess: ( data) => {
      setCookie(undefined,'auth_token',data.token,{
        maxAge: 60 * 60 * 24, // 1 hour
        path: '/',
      })
      // router.push('/home')
      console.log("data",data)
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
    RefreshTokenMutation
  }
}

