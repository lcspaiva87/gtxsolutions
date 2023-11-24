import { Column } from '@/@types/Column'
import { del, get, post } from './client/http-client'

export const fetchColumns = async (): Promise<Column[]> => {
  const response = await get('/columns')

  return response
}

export const PostColumns = async ({ id, title, color }: Column) => {
  const response = await post('/columns', {
    id,
    color,
    title,
  })
  return response
}

export const DeleteColumns = async (id: number | string) => {
  const response = await del(`/columns/${id}`)
  return response
}
