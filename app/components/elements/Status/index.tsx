import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react'
import clsx from 'clsx'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import styles from './index.module.scss'
import { HStack } from '../../layouts/HStack'
import { Description, Title } from '../Typography'

const BLOCK_NAME = 'status'
type Props = ComponentPropsWithoutRef<'div'> & {
  status?: _Status
  title: string
  children: React.ReactNode
}
type Ref = ElementRef<'div'>

const STATUS_OPTIONS = [
  'empty',
  'loading',
  'error',
  'success',
  'warning',
  'info',
] as const

export type _Status = (typeof STATUS_OPTIONS)[number] | (string & {})

export const Status = forwardRef<Ref, Props>(
  ({ className, status = 'empty', title, children, ...props }, ref) => {
    return (
      <div
        data-status={status}
        {...props}
        ref={ref}
        className={clsx(styles[`${BLOCK_NAME}`], className)}
      >
        <HStack align="center" gap={2}>
          <InfoCircledIcon className={styles[`${BLOCK_NAME}-icon`]} />

          <Title>{title}</Title>
        </HStack>

        <Description>{children}</Description>
      </div>
    )
  },
)

Status.displayName = 'Status'
