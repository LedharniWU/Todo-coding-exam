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
  const [todoList, setTodoList] = useState<Todo[] | undefined>(undefined)

  /**
   * TodoListに新しいTODOを追加して、
   * 更新されたTodoListを返します。
   *
   * @param newTodo - 追加する新しいTodoオブジェクト
   * @returns 更新されたTodoList: Todo[]
   * @remarks
   * レンダリングルート:
   * index.tsx -> NewTodoButton.tsx -> CreateNewTodoModel.tsx
   */

  const addTodoToViewList = (newTodo: Todo) => {
    setTodoList((prevTodos) => {
      // prevTodosがundefinedの場合、空の配列[]を使用する
      const todos = prevTodos || []
      return [...todos, newTodo]
    })
  }

  /**
   * 指定されたTodoのIDを使用してTodoListからTodoを削除し、
   * 更新されたTodoListを返します。
   *
   * @param todoId - 削除するTodoのID
   * @returns 更新されたTodoList: Todo[]
   * @remarks
   * レンダリングルート:
   * index.tsx -> TodoListView.tsx -> TodoCard.tsx
   */

  const deleteTodofromViewList = (todoId: number) => {
    setTodoList((prevTodos) => {
      // prevTodosがundefinedの場合、空の配列[]を使用する
      const todos = prevTodos || []
      return todos.filter((todo) => todo.id !== todoId)
    })
  }

  /**
   * 指定されたTodoのIDを使用してTodoList内でTodoを検索し、
   * タイトルを変更した更新されたTodoListを返します。
   *
   * @param todoId - 変更するTodoのID
   * @param newTitle - 新しいタイトル
   * @returns 更新されたTodoList: Todo[]
   * @remarks
   * レンダリングルート:
   * index.tsx -> TodoListView.tsx -> TodoCard.tsx -> EditTodoModel.tsx
   */

  const updateTodoById = (todoId: number, newTitle: string) => {
    setTodoList((prevTodos) => {
      // prevTodosがundefinedの場合、空の配列[]を使用する
      const todos = prevTodos || []
      return todos.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, title: newTitle }
        }
        return todo
      })
    })
  }

  /**
   * サーバーからTODOリストを取得し、取得したTODOリストを状態に設定します。
   */
  useEffect(() => {
    const GetTodosFromServer = async () => {
      const todosResponse = await GetTodos()
      if (todosResponse && !('errorMessage' in todosResponse)) {
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
