import { Menu as RowMenu } from '@base-ui/react/menu'
import { ComponentProps, FC } from 'react'

type MenuProps = ComponentProps<typeof RowMenu.Root>

type CustomProps = {}

type Props = MenuProps & CustomProps

export const Menu: FC<Props> = (props) => {
  return <RowMenu.Root {...props} />
}
