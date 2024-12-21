// eslint-disable-next-line no-underscore-dangle
declare const __newtype: unique symbol
export type newtype<Constructor, Type> = Type & {
  readonly [__newtype]: Constructor
}
export {}

// type TagId = newtype<'TagId', string>
