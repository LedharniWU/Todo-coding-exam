import axios from 'axios'
import { PutTodoRequest, PutTodoResponse, errorMessage } from '../types/types'

export async function PutTodo(
  id: number,
  params: PutTodoRequest,
): Promise<PutTodoResponse | errorMessage> {
  try {
    const rawResponse = await axios.put<PutTodoResponse>(
      `http://localhost:3000/api/todos/${id}`,
      params,
    )

    return rawResponse.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            console.error('⼊⼒値が不正')
            return { errorMessage: '⼊⼒値が不正 400' }
          case 404:
            console.error('指定されたタスクは存在しない')
            return { errorMessage: '指定されたタスクは存在しない 404' }
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
