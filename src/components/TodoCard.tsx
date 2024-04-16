import { Todo } from '@/features/todo/types/types'
import Trashicon from '@/icons/Trashicon'
import { useState } from 'react'

import { Box } from '@mui/material'
import CompletedCheckBox from './CompletedCheckBox'
import { DeleteTodo } from '@/features/todo/api/DeleteTodo'

interface TodoCardProps {
  todo: Todo
  deleteTodofromViewList: (todoId: number) => void
}

export default function TodoCard({
  todo,
  deleteTodofromViewList,
}: TodoCardProps) {
  const [mouseIsOver, setMouseIsOver] = useState(false)

  // Style Class
  const topBoxStyle = `
    bg-mainBackgroundColor 
    p-2.5 
    h-[50px] 
    min-h-[50px] 
    items-center 
    flex text-left 
    rounded-xl 
    hover:ring-2 
    hover:ring-inset 
    hover:ring-rose-500 
    mb-2 
    cursor-grab 
    relative
  `

  const deleteButtonStyle = `
    stroke-gray-500
    hover:stroke-white
    hover:bg-columnBackgroundColor
    absolute
    right-4
    rounded
    px-1
    py-2
  `

  const onClickDelete = async (todoId: number) => {
    const response = await DeleteTodo(todoId)
    if (response) {
      deleteTodofromViewList(todoId)
    }
  }

  return (
    <Box
      className={topBoxStyle}
      onMouseEnter={() => {
        setMouseIsOver(true)
      }}
      onMouseLeave={() => {
        setMouseIsOver(false)
      }}
    >
      <CompletedCheckBox todo={todo} />
      {todo.id}
      {todo.title}
      {mouseIsOver && (
        <button
          onClick={() => onClickDelete(todo.id)}
          className={deleteButtonStyle}
        >
          <Trashicon />
        </button>
      )}
    </Box>
  )
}
