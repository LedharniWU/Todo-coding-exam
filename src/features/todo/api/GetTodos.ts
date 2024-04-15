import axios from 'axios'

type Todo = {
  id: number
  title: string
  completed: number
}

type TodosResponse = Todo[]

export async function GetTodos(): Promise<TodosResponse | undefined> {
  try {
    const rawResponse = await axios.get<TodosResponse>(
      'http://localhost:3000/api/todos',
    )

    return rawResponse.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        switch (error.response.status) {
          case 500:
            console.error('予期しないエラー')
            break
          default:
            console.error(`エラーが発生しました: ${error.response.status}`)
        }
      } else {
        console.error('ネットワーク通信エラー')
      }
    } else {
      console.error('予期しないエラーが発生しました。:', error)
    }
  }

  return undefined
}
