import { useState } from 'react'

// Types
import { Todo } from '@/features/todo/types/types'

// Icon.tsx
import Plusicon from '@/icons/Plusicon'

// Components
import CreateNewTodoModel from './CreateNewTodoModel'

interface NewTodoButtonProps {
  addTodoToViewList: (newTodo: Todo) => void
}

export default function NewTodoButton(props: NewTodoButtonProps) {
  const { addTodoToViewList } = props

  const [modelSwitch, setModelSwitch] = useState(false)

  const onClickModelSwitch = () => {
    setModelSwitch(!modelSwitch)
  }

  return (
    <div>
      <button onClick={onClickModelSwitch} className={openModelButtonStyle}>
        <Plusicon />
        Add TODO
      </button>
      <CreateNewTodoModel
        modelSwitch={modelSwitch}
        onClickModelSwitch={onClickModelSwitch}
        addTodoToViewList={addTodoToViewList}
      />
    </div>
  )
}

// Style Class
const openModelButtonStyle = `
    h-[60px]
    w-[350px]
    min-w-[350px]
    cursor-pointer
    rounded-lg
    bg-mainBackgroundColor
    border-2
    border-columnBackgroundColor
    p-4
    ring-rose-500
    hover:ring-2
    flex
    gap-2
  `
