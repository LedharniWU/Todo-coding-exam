import axios from 'axios'
import { DeleteTodoResponse } from '../types/types'

export async function DeleteTodo(
  id: number,
): Promise<DeleteTodoResponse | undefined> {
  try {
    const rawResponse = await axios.delete(
      `http://localhost:3000/api/todos/${id}`,
    )

    return rawResponse.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            console.error('⼊⼒値が不正')
            break
          case 404:
            console.error('指定されたタスクは存在しない')
            break
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
