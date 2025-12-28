import { FC } from 'react'

type Props = {
  children: string
}
export const Nl2br: FC<Props> = ({ children }) => {
  return (
    <>
      {children.split(/(\n)/g).map((t, index) => {
        return t === '\n' ? <br key={index} /> : t
      })}
    </>
  )
}
