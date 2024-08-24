import { compare, hash } from 'bcryptjs'

/**
 * what's different between bcrypt and bcryptjs?
 * @see https://github.com/kelektiv/node.bcrypt.js/issues/705
 */
export async function hashPassword(password: string) {
  const hashedPassword = await hash(password, 12)
  return hashedPassword
}

export async function isPasswordValid(
  password: string,
  hashedPassword: string,
) {
  const isValid = await compare(password, hashedPassword)
  return isValid
}
