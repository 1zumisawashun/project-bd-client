import { hash } from "bcryptjs";

/**
 * what's different between bcrypt and bcryptjs?
 * @see https://github.com/kelektiv/node.bcrypt.js/issues/705
 */
export const hashPassword = async (password: string) => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};
