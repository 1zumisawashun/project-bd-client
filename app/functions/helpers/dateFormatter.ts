import { formatDistanceToNow, format } from 'date-fns'
import { ja } from 'date-fns/locale'

export const formatDateToDistanceToNow = (date: Date) => {
  return formatDistanceToNow(date, { addSuffix: true, locale: ja })
}

export const formatDateToJapaneseDate = (date: Date) => {
  return format(date, 'yyyy年MM月dd日')
}

export const formatDateToSlashDate = (date: Date) => {
  return format(date, 'yyyy/MM/dd')
}
