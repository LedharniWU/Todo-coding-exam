import Plusicon from '@/icons/Plusicon'
import { useState } from 'react'

import CreateNewTodoModel from './CreateNewTodoModel'

export default function NewTodoButton() {
  const [modelSwitch, setModelSwitch] = useState(false)

  const onClickModelSwitch = () => {
    setModelSwitch(!modelSwitch)
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

  return (
    <div>
      <button onClick={onClickModelSwitch} className={openModelButtonStyle}>
        <Plusicon />
        Add TODO
      </button>
      <CreateNewTodoModel
        modelSwitch={modelSwitch}
        onClickModelSwitch={onClickModelSwitch}
      />
    </div>
  )
}
