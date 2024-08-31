const THEME_OPTIONS = ['primary', 'danger'] as const
export type Theme = (typeof THEME_OPTIONS)[number] | (string & {})

const VARIANT_OPTIONS = ['contained', 'outlined', 'ghost'] as const
export type Variant = (typeof VARIANT_OPTIONS)[number] | (string & {})

const SIZE_OPTIONS = ['small', 'medium', 'large'] as const
export type Size = (typeof SIZE_OPTIONS)[number] | (string & {})

const SHAPE_OPTIONS = ['rounded', 'circle'] as const
export type Shape = (typeof SHAPE_OPTIONS)[number] | (string & {})
