import { Autocomplete as RowAutocomplete } from '@base-ui/react/autocomplete'
import clsx from 'clsx'
import { ComponentProps, ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'autocomplete-menu'

type AutocompleteMenuProps = ComponentProps<typeof RowAutocomplete.Positioner>

type CustomProps = {}

type Props = AutocompleteMenuProps & CustomProps

type Ref = ElementRef<'div'>

type Tag = {
  id: string
  value: string
}

export const AutocompleteMenu = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => {
    return (
      <RowAutocomplete.Portal>
        <RowAutocomplete.Positioner
          {...props}
          className={clsx(styles[`${BLOCK_NAME}`], className)}
          ref={ref}
          sideOffset={4}
        >
          <RowAutocomplete.Popup className={styles[`${BLOCK_NAME}-popup`]!}>
            <RowAutocomplete.Empty className={styles[`${BLOCK_NAME}-empty`]!}>
              No tags found.
            </RowAutocomplete.Empty>
            <RowAutocomplete.List className={styles[`${BLOCK_NAME}-list`]!}>
              {(tag: Tag) => (
                <RowAutocomplete.Item
                  key={tag.id}
                  className={styles[`${BLOCK_NAME}-item`]!}
                  value={tag}
                >
                  {tag.value}
                </RowAutocomplete.Item>
              )}
            </RowAutocomplete.List>
          </RowAutocomplete.Popup>
        </RowAutocomplete.Positioner>
      </RowAutocomplete.Portal>
    )
  },
)

AutocompleteMenu.displayName = 'AutocompleteMenu'
