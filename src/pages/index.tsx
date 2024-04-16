import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'

// MUI
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

// Components
import NewTodoButton from '@/components/NewTodoButton'
import TodoListView from '@/components/TodoListView'

// API
import { GetTodos } from '@/features/todo/api/GetTodos'

// Types
import { Todo } from '@/features/todo/types/types'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [todoList, setTodoList] = useState<Todo[]>([])

  const addTodoToViewList = (newTodo: Todo) => {
    setTodoList((prevTodos) => {
      return [...prevTodos, newTodo]
    })
  }

  const deleteTodofromViewList = (todoId: number) => {
    setTodoList((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== todoId)
    })
  }

  const updateTodoById = (todoId: number, newTitle: string) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, title: newTitle }
        }
        return todo
      })
    })
  }

  useEffect(() => {
    const GetTodosFromServer = async () => {
      const todosResponse = await GetTodos()
      if (todosResponse != undefined) {
        setTodoList(todosResponse)
      }
    }

    GetTodosFromServer()
  }, [])

  return (
    <>
      <Head>
        <title>TODO</title>
        <meta name="description" content="Next14 React ToDoList" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        {typeof todoList === 'undefined' ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box>
              <NewTodoButton addTodoToViewList={addTodoToViewList} />
            </Box>
            <Box sx={{ mt: 2 }}>
              <TodoListView
                todoList={todoList}
                deleteTodofromViewList={deleteTodofromViewList}
                updateTodoById={updateTodoById}
              />
            </Box>
          </>
        )}
      </main>
    </>
  )
}
