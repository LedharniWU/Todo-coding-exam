import React, { ChangeEvent, useState } from 'react'
import Checkbox from '@mui/material/Checkbox'
import { Todo } from '@/features/todo/types/types'

import { PutTodo } from '@/features/todo/api/PutTodo'
import { PutTodoRequest, PutTodoResponse } from '@/features/todo/types/types'

interface CompletedCheckBoxProps {
  todo: Todo
}

export default function CompletedCheckBox(props: CompletedCheckBoxProps) {
  const { todo } = props

  const [completed, setCompleted] = useState(
    todo.completed === 0 ? false : true,
  )

  const handleChange = async () => {
    setCompleted(!completed)

    const request: PutTodoRequest = {
      title: todo.title,
      completed: !completed ? 1 : 0,
    }

    const reponse = await PutTodo(todo.id, request)
  }

  return <Checkbox checked={completed} onChange={handleChange} />
}
