/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */

import * as RowDialog from '@radix-ui/react-dialog'

type Props = {} & RowDialog.DialogProps
export const Dialog: React.FC<Props> = (props) => {
  return <RowDialog.Root {...props} />
}

Dialog.displayName = 'Dialog'
