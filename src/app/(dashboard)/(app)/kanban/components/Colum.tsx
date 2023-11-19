'use client'
import { Itask } from '@/@types/Task'
import { useColumns } from '@/hooks/useColuns'
import { useTask } from '@/hooks/useTask'
import { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { ColumItem } from './ColumItem'
type Column = {
  id: string
  title: string
}

const reorderColumnList = (
  columns: Column[],
  tasks: Itask[],
  sourceColId: string,
  destinationColId: string,
  startIndex: number,
  endIndex: number,
) => {
  let removed: any // Define removed here

  const updatedColumns = columns.map((col) => {
    if (col.id === sourceColId) {
      const sourceTasks = tasks.filter((task) => task.columnId === sourceColId)
      ;[removed] = sourceTasks.splice(startIndex, 1)

      return { ...col, tasks: sourceTasks }
    } else if (col.id === destinationColId) {
      const destinationTasks = tasks.filter(
        (task) => task.columnId === destinationColId,
      )
      destinationTasks.splice(endIndex, 0, removed)

      return { ...col, tasks: destinationTasks }
    }
    return col
  })

  return updatedColumns
}

const Column = () => {
  const { columns: initialColumns, removeMutation: deleteColumnMutation } =
    useColumns()
  const { tasks: initialTasks, saveMutation, removeMutation } = useTask()
  const [columns, setColumns] = useState(initialColumns)
  const [tasks, setTasks] = useState(initialTasks)

  useEffect(() => {
    if (initialColumns) {
      setColumns(initialColumns)
    }
  }, [initialColumns])

  useEffect(() => {
    if (initialTasks) {
      setTasks(initialTasks)
    }
  }, [initialTasks])
  const filterTasks = (columnId: string) =>
    tasks.filter((task) => task.columnId === columnId)
  const onDragEnd = (result: any) => {
    const { destination, source } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const updatedColumns = reorderColumnList(
      columns,
      tasks,
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
    )

    // Update the columnId of the task
    const task = tasks.find((task) => task.id === result.draggableId)
    if (task) {
      saveMutation.mutate({ id: task.id, columnId: destination.droppableId })
      task.columnId = destination.droppableId
    }

    // setColumns(updatedColumns)
  }
  return (
    <>
      <div className="  flex w-full items-center overflow-x-auto overflow-y-hidden pr-[7rem]">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-4">
            {columns.map((column) => {
              // Filtra as tarefas correspondentes a esta coluna
              const tasksInColumn = filterTasks(column.id)
              return (
                <ColumItem
                  key={column.id}
                  column={column}
                  tasks={tasksInColumn}
                />
              )
            })}
          </div>
        </DragDropContext>
      </div>
      {!columns?.length && (
        <div className="w-full flex h-[45rem] lg:h-[35rem] justify-center items-center ">
          <div className="flex items-center justify-center">
            <span>nao tem task disponivel</span>
          </div>
        </div>
      )}
    </>
  )
}

export default Column
