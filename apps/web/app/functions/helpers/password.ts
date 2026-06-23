import { compare, hash } from 'bcryptjs'

/**
 * what's different between bcrypt and bcryptjs?
 * @see https://github.com/kelektiv/node.bcrypt.js/issues/705
 */
export const hashPassword = async (password: string) => {
  const hashedPassword = await hash(password, 12)
  return hashedPassword
}

export const isPasswordValid = async (
  password: string,
  hashedPassword: string,
) => {
  const isValid = await compare(password, hashedPassword)
  return isValid
}
