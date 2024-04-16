import React from 'react'

// Types
import { Todo } from '@/features/todo/types/types'

import { DndContext } from '@dnd-kit/core'

import TodoCard from './TodoCard'

import { Box } from '@mui/material'

type TodoListViewProps = {
  todoList: Todo[]
  deleteTodofromViewList: (todoId: number) => void
}

export default function TodoListView(props: TodoListViewProps) {
  const { todoList, deleteTodofromViewList } = props

  // Style Class
  const topBoxStyle = `
    bg-columnBackgroundColor
    w-[350px]
    h-[500px]
    max-h-[500px]
    rounded-md
    flex
    flex-col
  `
  const titleBoxStyle = `
    bg-mainBackgroundColor
    text-md
    h-[60px]
    rounded-md
    rounded-b-none
    p-3
    font-bold
    border-columnBackgroundColor
    border-4
    justify-center
    items-center
    text-center
  `
  const todoCardBoxStyle = `
    flex
    flex-grow
    flex-col
    p-2
    overflow-x-hidden
    overflow-y-auto
    text-center
  `

  return (
    <Box className={topBoxStyle}>
      <Box className={titleBoxStyle}>TodoListView</Box>

      <Box className={todoCardBoxStyle}>
        {todoList.length > 0 ? (
          <>
            {todoList.map((todo: Todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                deleteTodofromViewList={deleteTodofromViewList}
              />
            ))}
          </>
        ) : (
          <>
            <p>No Todo found. Please create a new Todo.</p>
          </>
        )}
      </Box>
    </Box>
  )
}
