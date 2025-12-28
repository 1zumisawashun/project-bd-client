import * as RowDialog from '@radix-ui/react-dialog'
import { FC } from 'react'

type Props = {} & RowDialog.DialogProps
export const Dialog: FC<Props> = (props) => {
  return <RowDialog.Root {...props} />
}

Dialog.displayName = 'Dialog'
