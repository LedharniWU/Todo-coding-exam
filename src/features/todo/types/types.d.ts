export type Todo = {
  id: number
  title: string
  completed: number
}

export type PostTodoRequest = {
  title: string
}

export type PostTodoResponse = {
  id: number
  title: string
  completed: boolean
}

export type PutTodoRequest = {
  title: string
  completed: boolean
}

export type PutTodoResponse = {
  message: string
  id: string
  changes: number
}

export type DeleteTodoResponse = {
  message: string
}
