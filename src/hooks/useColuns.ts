'use client'
import { Column } from '@/@types/Column'
import { DeleteColumns, PostColumns, fetchColumns } from '@/data/columns'
import { enqueueSnackbar } from 'notistack'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export const useColumns = (id?: Column[]) => {
  const queryClient = useQueryClient()
  const createMutation = useMutation({
    mutationFn: PostColumns,
    mutationKey: ['column', id],

    onError: () => {
      enqueueSnackbar('Erro ao criar coluna, tente novamente', {
        variant: 'error',
      })
    },
    onSuccess: (_, data) => {
      queryClient.setQueryData(['column', undefined], (oldData: any) => {
        if (Array.isArray(oldData)) {
          return [...oldData, data]
        } else {
          // Handle the case where oldData is not an array
          // For example, you could return a new array containing only the new data
          return [data]
        }
      })
      enqueueSnackbar('column created successfully', { variant: 'success' })
    },
  })

  const removeMutation = useMutation(DeleteColumns, {
    onError: () => {
      enqueueSnackbar('Erro ao remover coluna, tente novamente', {
        variant: 'error',
      })
    },

    onSuccess: (_, id) => {
      queryClient.setQueryData(['column', undefined], (oldData: any) =>
        oldData.filter((item: Column) => item.id !== id),
      )
      enqueueSnackbar('Coluna removida com sucesso', { variant: 'success' })
    },
  })

  const {
    data: column,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['column', id],
    queryFn: () => fetchColumns(),
  })
  return {
    columns: column ?? [],
    isLoading,
    isError,
    removeMutation,
    createMutation,
  }
}
