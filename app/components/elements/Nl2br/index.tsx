/* eslint-disable react/no-array-index-key */

type Props = {
  children: string
}
export const Nl2br: React.FC<Props> = ({ children }) => {
  return (
    <>
      {children.split(/(\n)/g).map((t, index) => {
        return t === '\n' ? <br key={index} /> : t
      })}
    </>
  )
}
