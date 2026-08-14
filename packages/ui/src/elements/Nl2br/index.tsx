import { FC } from 'react'

type Nl2brProps = {
  children: string
}

export const Nl2br: FC<Nl2brProps> = ({ children }) => {
  return (
    <>
      {children.split(/(\n)/g).map((t, index) => {
        return t === '\n' ? <br key={index} /> : t
      })}
    </>
  )
}
