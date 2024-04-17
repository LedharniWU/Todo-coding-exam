import axios from 'axios'
import { PostTodoRequest, Todo, errorMessage } from '../types/types'

export async function PostTodo(
  params: PostTodoRequest
): Promise<Todo | errorMessage> {
  try {
    const rawResponse = await axios.post<Todo>(
      'http://localhost:3000/api/todos',
      params
    )

    return rawResponse.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            console.error('⼊⼒値が不正')
            return { errorMessage: '⼊⼒値が不正 400' }
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
