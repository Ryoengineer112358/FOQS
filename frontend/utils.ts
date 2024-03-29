//未ログイン状態の場合、ログインページにリダイレクトする getServerSideProps を定義
import { GetServerSideProps } from 'next'

export const MAX_IMAGES = 5

export function convertDateTypeOnObject(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(convertDateTypeOnObject)
  } else if (obj !== null && typeof obj === 'object') {
    const result: { [key: string]: any } = {} // ここを変更
    for (const key in obj) {
      const value = obj[key]
      if (value && typeof value == 'string' && key.indexOf('_at') >= 0) {
        result[key] = new Date(value)
      } else {
        result[key] = convertDateTypeOnObject(value)
      }
    }
    return result
  } else {
    return obj
  }
}
