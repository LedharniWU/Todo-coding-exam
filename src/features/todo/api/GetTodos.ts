import axios from 'axios'
import { Todo, errorMessage } from '../types/types'

type TodosResponse = Todo[]

export async function GetTodos(): Promise<TodosResponse | errorMessage> {
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
            return { errorMessage: '予期しないエラー 500' }
          default:
            console.error(`エラーが発生しました: ${error.response.status}`)
            return {
              errorMessage: `エラーが発生しました: ${error.response.status}`,
            }
        }
      } else {
        console.error('ネットワーク通信エラー')
        return { errorMessage: 'ネットワーク通信エラー' }
      }
    } else {
      console.error('予期しないエラーが発生しました。:', error)
      return { errorMessage: `予期しないエラーが発生しました。: ${error}` }
    }
  }
}
