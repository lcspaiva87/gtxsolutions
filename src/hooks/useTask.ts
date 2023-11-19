'use client'

import { useMutation, useQuery, useQueryClient } from 'react-query'

import { Itask } from '@/@types/Task'
import { deleteTaskId, fetchTask, pathTask, postTask } from '@/data/tasks'
import { enqueueSnackbar } from 'notistack'

export const useTask = (id?: Itask[]) => {
  const queryClient = useQueryClient()

  const saveMutation = useMutation(pathTask, {
    onError: () => {
      enqueueSnackbar('Erro ao salvar Task, tente novamente', {
        variant: 'error',
      })
    },
  })
  const createMutation = useMutation(postTask, {
    onError: () => {
      enqueueSnackbar('Erro ao criar task , tente novamente', {
        variant: 'error',
      })
    },
    onSuccess: (_, data) => {
      queryClient.setQueryData(['task', undefined], (oldData: any) => [
        ...oldData,
        data,
      ])
      enqueueSnackbar('Task criada com sucesso!', { variant: 'success' })
    },
  })
  const removeMutation = useMutation(deleteTaskId, {
    onError: () => {
      enqueueSnackbar('Erro ao remover task, tente novamente', {
        variant: 'error',
      })
    },

    onSuccess: (_, id) => {
      queryClient.setQueryData(['task', undefined], (oldData: any) =>
        oldData.filter((item: Itask) => item.id !== id),
      )
      enqueueSnackbar('Task removido sucesso', { variant: 'success' })
    },
  })
  const {
    data: task,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['task', id],
    queryFn: () => fetchTask(),
  })
  return {
    tasks: task ?? [],
    isLoading,
    isError,
    saveMutation,
    removeMutation,
    createMutation,
  }
}
