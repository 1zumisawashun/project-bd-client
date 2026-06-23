import { format, formatDistanceToNow } from 'date-fns'
import { ja } from 'date-fns/locale'
import { DATE_FORMAT } from '../constants/dateFormat'

export const formatDateToDistanceToNow = (date: Date) => {
  return formatDistanceToNow(date, { addSuffix: true, locale: ja })
}

export const formatDateToDate = (date: Date) => {
  return format(date, DATE_FORMAT.DATE)
}

export const formatDateToJapaneseDate = (date: Date) => {
  return format(date, DATE_FORMAT.DATE_JAPANESE)
}
