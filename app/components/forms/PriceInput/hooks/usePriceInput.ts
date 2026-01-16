import { useDisclosure } from '@/functions/hooks/useDisclosure'
import { ChangeEventHandler, FocusEventHandler } from 'react'

type PriceInputHandlerReturnType = {
  onFocus: FocusEventHandler<HTMLInputElement>
  onChange: ChangeEventHandler<HTMLInputElement>
  onBlur: FocusEventHandler<HTMLInputElement>
}

type UsePriceInput = {
  value: number
  onChange: (value?: number) => void
  onBlur: () => void
}

const transformFullWidthNumbers = (value: string) => {
  const fullWidthNumbers = '０１２３４５６７８９'
  const halfWidthNumbers = '0123456789'

  return value.replace(
    /[０-９]/g,
    (char) => halfWidthNumbers[fullWidthNumbers.indexOf(char)]!,
  )
}

const transformCleanValue = (value: string) => {
  // 大文字数字を半角数字に変換し、半角数字以外の文字列を削除する
  return value.replace(/\D+/g, '')
}

export const usePriceInput = ({ value, onChange, onBlur }: UsePriceInput) => {
  const { isOpen, open, close } = useDisclosure()

  const priceWithoutComma = value ?? ''
  const priceWithComma = value?.toLocaleString() ?? ''
  const price = isOpen ? priceWithoutComma : priceWithComma

  const priceInputHandler = (): PriceInputHandlerReturnType => {
    return {
      onChange: (e) => {
        if (!e.target.value) {
          onChange(undefined)
          return
        }

        const fullWidthNumbers = transformFullWidthNumbers(e.target.value)
        const cleanValue = transformCleanValue(fullWidthNumbers)
        const numberValue = Number(cleanValue)

        if (Number.isNaN(numberValue)) {
          throw new Error('Invalid number')
        }

        onChange(numberValue)
      },
      onFocus: () => {
        // 価格表示を編集モードに切り替え
        open()
      },
      onBlur: () => {
        // 価格表示をカンマ区切りモードに切り替え
        close()
        onBlur()
      },
    }
  }

  return { price, priceInputHandler }
}
