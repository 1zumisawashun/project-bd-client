import NextAuth from "next-auth";
import authConfig from "@project-bd-client/auth/config";

/**
 * NOTE: Edge Runtime Middleware
 *
 * apps/web/middleware.ts と同様、edge runtimeで実行されるためsqliteを直接は使わない
 * authConfig（next-auth v5, adapterなし）のみを使ってセッションの有無だけを判定する。
 *
 * admin appは「ログイン済みかどうか」だけをここでチェックし、ADMIN権限のチェックは
 * （DBアクセスが必要なため）各ページ側で行う。
 */
const WEB_APP_URL = process.env["WEB_APP_URL"] ?? "http://localhost:3000";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;

  if (!isLoggedIn) {
    return Response.redirect(new URL("/sign-in", WEB_APP_URL));
  }
  return undefined;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
