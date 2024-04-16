import { useState, ChangeEvent } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { PostTodo } from '@/features/todo/api/PostTodo'

type CreateNewTodoModelProps = {
  modelSwitch: boolean
  onClickModelSwitch: () => void
}

type PostTodoRequest = {
  title: string
}

export default function CreateNewTodoModel(props: CreateNewTodoModelProps) {
  const { modelSwitch, onClickModelSwitch } = props

  const [newTodoTitle, setNewTodoTitle] = useState('')

  const [attemptedSubmit, setAttemptedSubmit] = useState(false)

  const handleCancel = () => {
    onClickModelSwitch()
    setNewTodoTitle('')
    setAttemptedSubmit(false)
  }

  const handleChangeNewTodoTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event.target.value)
  }

  const handleCreateTodo = async () => {
    if (newTodoTitle === '') {
      setAttemptedSubmit(true)
    } else {
      const reponse = await PostTodo({ title: newTodoTitle })

      onClickModelSwitch()
      setAttemptedSubmit(false)
    }
    setNewTodoTitle('')
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

  const actionBoxStyle = `
    flex 
    justify-end 
    space-x-2 
    mt-4
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

  return (
    modelSwitch && (
      <div>
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
            <Box className={actionBoxStyle}>
              <Button
                onClick={handleCreateTodo}
                variant="contained"
                color="primary"
              >
                Create
              </Button>
              <Button
                onClick={handleCancel}
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    )
  )
}
