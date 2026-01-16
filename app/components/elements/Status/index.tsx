import { InfoCircledIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { HStack } from '../../layouts/HStack'
import { Description, Title } from '../Typography'
import styles from './index.module.css'

const BLOCK_NAME = 'status'

type StatusProps = ComponentPropsWithoutRef<'div'>

type CustomProps = {
  status?: _Status
  title: string
}

type Props = StatusProps & CustomProps

type Ref = ElementRef<'div'>

const _STATUS_OPTIONS = [
  'empty',
  'loading',
  'error',
  'success',
  'warning',
  'info',
] as const

export type _Status = (typeof _STATUS_OPTIONS)[number]

export const Status = forwardRef<Ref, Props>(
  ({ className, status = 'empty', title, children, ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={clsx(styles[`${BLOCK_NAME}`], className)}
        data-status={status}
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
