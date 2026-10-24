import mockRouter from "next-router-mock";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";

// NOTE: vi.mock("next/router", ...) / vi.mock("next/navigation", ...) は
// このファイルではなく、実際に使うテストファイル側（例: Test.test.tsx）で直接宣言すること。
// vitestのvi.mockのホイスティングは、それを呼び出したファイル自身に対してのみ効くため、
// import経由のユーティリティファイルに書いても効かない（実際にハマった）。
// @see https://vitest.dev/api/vi.html#vi-mock
//
// NOTE: このファイルの先頭に `/* eslint-disable */` を置くと、mockRouter（"next-router-mock"の
// デフォルトエクスポート）を別ファイルからvi.mock越しにimportしたときにundefinedになる現象を
// 実際に踏んだ（esbuild/viteのCJS-ESM相互運用まわりの挙動と推測。原因の完全な特定はできて
// いないが、ファイル先頭のブロックコメントを外すと再現しなくなることは確認済み）。
// eslint-disableが必要な場合は行単位で付けること。

mockRouter.useParser(
  createDynamicRouteParser([
    // @see https://github.com/scottrippey/next-router-mock#dynamic-routes
  ]),
);

export { mockRouter };
