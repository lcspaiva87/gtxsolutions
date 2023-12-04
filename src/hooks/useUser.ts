
import { LoginUser, RefreshToken } from "@/data/user";
import nookies, { setCookie } from "nookies";
import { enqueueSnackbar } from "notistack";
import { useMutation, useQuery, useQueryClient } from "react-query";
export const useUser = () =>{
  const queryClient = useQueryClient()

  const createMutation = useMutation(LoginUser,{
    onError: (erro) => {
      enqueueSnackbar('Erro ao tentar fazer login', {
        variant: 'error',
      })
      console.log("erro",erro)
    },
    onSuccess: ( data) => {
      const{token,refreshToken} =data
      const {refresh_Token} = refreshToken

      setCookie(undefined,'auth_token',token,{
        maxAge: 60 * 60 * 24, // 1 hour
        path: '/',
      })

      nookies.set(undefined,'refresh_token',refresh_Token,{
        maxAge: 60 * 60 * 24, // 1 hour
        path: '/',
        sameSite:'lax'
      })

    }
  })
  const RefreshTokenMutation = useMutation(RefreshToken,{
    onError: (erro) => {
      enqueueSnackbar('Erro ao tentar fazer login', {
        variant: 'error',
      })

    },
    onSuccess: ( data) => {
      const{token,refreshToken} =data
      const {refresh_Token} = refreshToken

      console.log("refresh_Token",refresh_Token)
      setCookie(undefined,'auth_token',token,{
        maxAge: 60 * 60 * 24, // 1 hour
        path: '/',
      })
      nookies.set(undefined,'refresh_token',refresh_Token,{
        maxAge: 60 * 60 * 24, // 1 hour
        path: '/',
        httpOnly:true,
        sameSite:'lax'
      })

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

