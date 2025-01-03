import { Label } from '@/components/elements/Label'
import NextLink, { LinkProps } from 'next/link'
import {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
} from 'react'

type Props = ComponentPropsWithoutRef<'a'> & {
  disabled?: boolean
  theme?: ComponentProps<typeof Label>['theme']
} & LinkProps
type Ref = ElementRef<'a'>
export const LabelAnchorButton = forwardRef<Ref, Props>(
  ({ children, disabled, className, theme = 'primary', ...props }, ref) => {
    return (
      <NextLink
        {...props}
        className={className}
        aria-disabled={disabled}
        ref={ref}
      >
        <Label theme={theme}>{children}</Label>
      </NextLink>
    )
  },
)

LabelAnchorButton.displayName = 'LabelAnchorButton'
