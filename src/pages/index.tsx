import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import NewTodoButton from '@/components/NewTodoButton'
import { useEffect, useState } from 'react'
import { GetTodos } from '@/features/todo/api/GetTodos'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const inter = Inter({ subsets: ['latin'] })

type Todo = {
  id: number
  title: string
  completed: number
}

export default function Home() {
  const [todoList, setTodoList] = useState<Todo[] | undefined>()

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
            <NewTodoButton />
          </>
        )}
      </main>
    </>
  )
}
