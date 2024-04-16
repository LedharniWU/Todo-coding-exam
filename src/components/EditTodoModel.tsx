import { ChangeEvent, useState } from 'react'

// API
import { PutTodo } from '@/features/todo/api/PutTodo'

// Types
import { PutTodoRequest, Todo } from '@/features/todo/types/types'

// MUI
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

interface EditTodoModelProps {
  todo: Todo
  modelSwitch: boolean
  onClickModelSwitch: () => void
  updateTodoById: (todoId: number, newTitle: string) => void
}

export default function EditTodoModel(props: EditTodoModelProps) {
  const { modelSwitch, onClickModelSwitch, todo, updateTodoById } = props

  const { id, title, completed } = todo

  const [newTodoTitle, setNewTodoTitle] = useState(title)

  const [attemptedSubmit, setAttemptedSubmit] = useState(false)

  const [helpMessage, setHelpMessage] = useState('')

  const handleChangeNewTodoTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event.target.value)
  }

  const handleEditTodo = async () => {
    if (newTodoTitle === '') {
      setAttemptedSubmit(true)
      setHelpMessage('Please input title')
    } else if (newTodoTitle === title) {
      setAttemptedSubmit(true)
      setHelpMessage('Nothing To Change')
    } else {
      const request: PutTodoRequest = {
        title: newTodoTitle,
        completed: completed,
      }
      const response = await PutTodo(id, request)

      if (response) {
        updateTodoById(id, newTodoTitle)
      }

      onClickModelSwitch()
      setAttemptedSubmit(false)
    }
  }

  const handleCancel = () => {
    onClickModelSwitch()
    setNewTodoTitle(title)
    setAttemptedSubmit(false)
  }

  return (
    <Modal open={modelSwitch} onClose={onClickModelSwitch}>
      <Box className={modalBoxStyle}>
        <Typography variant="h6" component="h2"></Typography>
        <Box className={inputBoxStyle}>
          <TextField
            {...inputStyle}
            label="Title"
            defaultValue={title}
            variant="outlined"
            onChange={handleChangeNewTodoTitle}
            helperText={attemptedSubmit ? helpMessage : ''}
          />
        </Box>
        <Box className={actionBoxStyle}>
          <Button onClick={handleEditTodo} variant="contained" color="primary">
            Edit
          </Button>
          <Button onClick={handleCancel} variant="outlined" color="secondary">
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

// Style Class
const modalBoxStyle = `
  absolute 
  top-1/2 
  left-1/2 
  -translate-x-1/2 
  -translate-y-1/2
  w-96 
  border-2 
  border-black 
  shadow-xl p-4
  bg-mainBackgroundColor 
  border-columnBackgroundColor 
  rounded-lg 
  ring-rose-500
`
const inputBoxStyle = `
  mt-4
`

const inputStyle = {
  className: 'w-full text-white',
  sx: {
    '& .MuiInputBase-root': {
      color: 'white',
      '& fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
  },
  InputLabelProps: {
    style: { color: 'white' },
  },
  FormHelperTextProps: {
    style: { color: 'green' },
  },
}

const actionBoxStyle = `
    flex 
    justify-end 
    space-x-2 
    mt-4
  `
