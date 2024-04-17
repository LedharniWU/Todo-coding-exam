import { useState } from 'react'

// API
import { PutTodo } from '@/features/todo/api/PutTodo'

// Types
import { Todo } from '@/features/todo/types/types'
import { PutTodoRequest } from '@/features/todo/types/types'

// MUI
import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'

interface CompletedCheckBoxProps {
  todo: Todo
}

export default function CompletedCheckBox(props: CompletedCheckBoxProps) {
  const { todo } = props

  const [completed, setCompleted] = useState(
    todo.completed === 0 ? false : true
  )

  const handleChange = async () => {
    setCompleted(!completed)

    const request: PutTodoRequest = {
      title: todo.title,
      completed: !completed ? 1 : 0,
    }

    await PutTodo(todo.id, request)
  }

  return (
    <Box>
      <Checkbox
        className={checkBoxStyle}
        checked={completed}
        onChange={handleChange}
      />
    </Box>
  )
}

const checkBoxStyle = `text-blue-500 hover:text-lime-300`
