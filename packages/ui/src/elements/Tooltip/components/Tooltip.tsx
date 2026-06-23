import { Tooltip as RowTooltip } from '@base-ui/react/tooltip'
import { ComponentProps, FC } from 'react'

type TooltipProps = ComponentProps<typeof RowTooltip.Root>

type CustomProps = {}

type Props = TooltipProps & CustomProps

export const Tooltip: FC<Props> = (props) => {
  return (
    <RowTooltip.Provider>
      <RowTooltip.Root {...props} />
    </RowTooltip.Provider>
  )
}
