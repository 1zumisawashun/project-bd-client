import { Cross1Icon } from '@radix-ui/react-icons'
import clsx from 'clsx'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { IconButton } from '@/components/buttons/IconButton'
import { Theme } from '@/functions/types'
import styles from './index.module.css'

const BLOCK_NAME = 'label'

type LabelProps = ComponentPropsWithoutRef<'span'>

type CustomProps = { theme?: Theme; onClick?: () => void }

type Props = LabelProps & CustomProps

type Ref = ElementRef<'span'>

export const Label = forwardRef<Ref, Props>(
  (
    {
      // native props
      className,
      // custom props
      theme = 'primary',
      onClick,
      // other props
      ...props
    },
    ref,
  ) => {
    return (
      <span
        {...props}
        // native props
        className={clsx(styles[`${BLOCK_NAME}`], className)}
        ref={ref}
        // custom props
        data-theme={theme}
      >
        {props.children}
        {onClick && (
          <IconButton
            className={styles[`${BLOCK_NAME}-button`]!}
            onClick={onClick}
            shape="circle"
            theme={theme}
          >
            <Cross1Icon className={styles[`${BLOCK_NAME}-icon`]} />
          </IconButton>
        )}
      </span>
    )
  },
)

Label.displayName = 'Label'
