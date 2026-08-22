"use server";

import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { signIn as NextAuthSignIn } from "@project-bd-client/auth";
import { Schema } from "@project-bd-client/auth/credentials-schema";

type SignInProps = Partial<Schema> & {
  provider: Parameters<typeof NextAuthSignIn>[0];
};

export const signIn = async ({ provider, ...props }: SignInProps) => {
  try {
    await NextAuthSignIn(provider, {
      ...props,
      redirect: true,
      redirectTo: "/articles",
    });

    return null;
  } catch (error) {
    // https://github.com/nextauthjs/next-auth/discussions/9389
    if (isRedirectError(error)) throw error;

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: {
              message: "メールアドレスまたはパスワードが間違っています",
            },
          };
        default:
          return {
            error: { message: "ログインに失敗しました" },
          };
      }
    }

    throw error;
  }
};
