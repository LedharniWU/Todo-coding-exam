import { useState, ChangeEvent } from 'react'

// API
import { PostTodo } from '@/features/todo/api/PostTodo'

// Types
import { PostTodoRequest, Todo } from '@/features/todo/types/types'

// Mui
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

interface CreateNewTodoModelProps {
  modelSwitch: boolean
  onClickModelSwitch: () => void
  addTodoToViewList: (newTodo: Todo) => void
}

export default function CreateNewTodoModel(props: CreateNewTodoModelProps) {
  const { modelSwitch, onClickModelSwitch, addTodoToViewList } = props

  const [newTodoTitle, setNewTodoTitle] = useState('')

  const [attemptedSubmit, setAttemptedSubmit] = useState(false)

  const [errorMessage, setErrorMessage] = useState('')

  const handleCancel = () => {
    onClickModelSwitch()
    setNewTodoTitle('')
    setAttemptedSubmit(false)
    setErrorMessage('')
  }

  const handleChangeNewTodoTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event.target.value)
  }

  const handleCreateTodo = async () => {
    if (newTodoTitle === '') {
      setAttemptedSubmit(true)
      return
    }

    const request: PostTodoRequest = { title: newTodoTitle }
    const response = await PostTodo(request)

    if (response && !('errorMessage' in response)) {
      const todo: Todo = {
        id: response.id,
        title: response.title,
        completed: response.completed ? 1 : 0,
      }
      addTodoToViewList(todo)
      onClickModelSwitch()
      setAttemptedSubmit(false)
    } else if (response) {
      setErrorMessage(response.errorMessage)
    }

    setNewTodoTitle('')
  }

  return (
    <Modal open={modelSwitch} onClose={onClickModelSwitch}>
      <Box className={modalBoxStyle}>
        <Typography variant="h6" component="h2">
          Create New TODO
        </Typography>
        <Box className={inputBoxStyle}>
          <TextField
            {...inputStyle}
            label="Title"
            variant="outlined"
            value={newTodoTitle}
            onChange={handleChangeNewTodoTitle}
            helperText={attemptedSubmit ? 'Please input title' : ''}
          />
        </Box>
        {errorMessage && (
          <Box className={errorMessageBoxStyle}>{errorMessage}</Box>
        )}
        <Box className={actionBoxStyle}>
          <Button
            onClick={handleCreateTodo}
            variant="contained"
            color="primary"
          >
            Create
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

const errorMessageBoxStyle = `
  text-center
  text-red-600
`
