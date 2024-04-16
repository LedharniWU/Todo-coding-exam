import axios from 'axios'
import { PostTodoRequest, Todo } from '../types/types'

export async function PostTodo(
  params: PostTodoRequest,
): Promise<Todo | undefined> {
  try {
    const rawResponse = await axios.post<Todo | undefined>(
      'http://localhost:3000/api/todos',
      params,
    )

    return rawResponse.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            console.error('⼊⼒値が不正')
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
