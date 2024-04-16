import { useState } from 'react'

// Types
import { Todo } from '@/features/todo/types/types'

// Icon.tsx
import Trashicon from '@/icons/Trashicon'
import Editicon from '@/icons/Editicon'

// MUI
import { Box } from '@mui/material'
import { DeleteTodo } from '@/features/todo/api/DeleteTodo'

// Componets
import CompletedCheckBox from './CompletedCheckBox'
import EditTodoModel from './EditTodoModel'

interface TodoCardProps {
  todo: Todo
  deleteTodofromViewList: (todoId: number) => void
  updateTodoById: (todoId: number, newTitle: string) => void
}

export default function TodoCard(props: TodoCardProps) {
  const { todo, deleteTodofromViewList, updateTodoById } = props

  const [mouseIsOver, setMouseIsOver] = useState(false)

  const onClickDelete = async (todoId: number) => {
    const response = await DeleteTodo(todoId)
    if (response) {
      deleteTodofromViewList(todoId)
    }
  }

  const [modelSwitch, setModelSwitch] = useState(false)

  const onClickModelSwitch = () => {
    setModelSwitch(!modelSwitch)
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
      <Box>ID:{todo.id}</Box>
      <Box className={titleStyle}>{todo.title}</Box>
      {mouseIsOver && (
        <button
          onClick={() => onClickDelete(todo.id)}
          className={deleteButtonStyle}
        >
          <Trashicon />
        </button>
      )}
      {mouseIsOver && (
        <button onClick={onClickModelSwitch} className={editButtonStyle}>
          <Editicon />
        </button>
      )}
      <EditTodoModel
        todo={todo}
        modelSwitch={modelSwitch}
        onClickModelSwitch={onClickModelSwitch}
        updateTodoById={updateTodoById}
      />
    </Box>
  )
}

// Style Class
const topBoxStyle = `
    bg-mainBackgroundColor 
    p-2.5 
    min-h-[100px] 
    items-center 
    flex text-left 
    rounded-xl 
    hover:ring-2 
    hover:ring-inset 
    hover:ring-rose-500 
    mb-2 
    cursor-grab 
    relative
    gap-y-2
  `

const titleStyle = `
    pl-2
    pr-10
  `

const deleteButtonStyle = `
    stroke-gray-500
    hover:stroke-white
    hover:bg-columnBackgroundColor
    absolute
    right-4
    bottom-2
    rounded
    px-1
    py-2
  `

const editButtonStyle = `
    stroke-gray-500
    hover:stroke-white
    hover:bg-columnBackgroundColor
    absolute
    right-4
    top-2
    rounded
    px-1
    py-2
  `
