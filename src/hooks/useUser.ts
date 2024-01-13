
import { addUser, ListnUser, LoginUser, RefreshToken, updateUser } from "@/data/user";
import nookies, { setCookie } from "nookies";
import { enqueueSnackbar } from "notistack";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { ErrorResult, SuccessResult } from "@/@types/Request";
import { useRouter } from "next/navigation";

export const useUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const createMutation = useMutation(LoginUser, {
    onError: (erro) => {
      console.log(erro, "erro")
      enqueueSnackbar(erro?.message || 'Erro ao tentar fazer login', {
        variant: 'error',
      })
      console.log("erro",erro)
    },
    onSuccess: (response) => {
      const{ data: token } = response;
      // const {refresh_Token} = refreshToken

      setCookie(undefined,'auth_token',token,{
        maxAge: 10 * 24 * 60 * 60 * 24, // 10 dias
        path: '/',
      });

      router.push("/kanban")

      // nookies.set(undefined,'refresh_token',refresh_Token,{
      //   maxAge: 60 * 60 * 24, // 1 hour
      //   path: '/',
      //   sameSite:'lax'
      // })
    }
  })

  const createUserMutation = useMutation(addUser, {
    onError: (erro) => {
      console.log(erro, "erro")
      enqueueSnackbar(erro?.message || 'Erro ao criar usuário', {
        variant: 'error',
      })
      console.log("erro",erro)
    },
    onSuccess: (response) => {
      const{ data: token } = response;

      console.log("add user response", response);
      enqueueSnackbar("Usuário adicionado com sucesso", {
        variant: 'success',
      })
    }
  });

  const createUserUpdateMutation = useMutation(updateUser, {
    onError: (erro) => {
      console.log(erro, "erro")
      enqueueSnackbar(erro?.message || 'Erro ao editar usuário', {
        variant: 'error',
      })
      console.log("erro",erro)
    },
    onSuccess: (response) => {
      const{ data: token } = response;

      enqueueSnackbar("Usuário editado com sucesso", {
        variant: 'success',
      })
    }
  });

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
    data: list
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => ListnUser() 
  })
  
  return {
    isLoading,
    isError,
    createMutation,
    createUserMutation,
    createUserUpdateMutation,
    RefreshTokenMutation,
    users: list ?? []
  }
}

