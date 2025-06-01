import { IconButton } from '@/components/buttons/IconButton'
import { Action } from '@/functions/types'
import { Cross1Icon } from '@radix-ui/react-icons'
import clsx from 'clsx'
import { ComponentProps } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'label-action'
type Props = { action?: Action } & ComponentProps<typeof IconButton>

const icons = {
  delete: Cross1Icon,
} satisfies Record<Action, unknown>

export const LabelAction: React.FC<Props> = ({
  action = 'delete',
  className,
  ...rest
}) => {
  const Icon = icons[action]
  return (
    <IconButton
      className={clsx(styles[`${BLOCK_NAME}-button`], className)}
      shape="circle"
      {...rest}
    >
      <Icon className={styles[`${BLOCK_NAME}-icon`]} />
    </IconButton>
  )
}
