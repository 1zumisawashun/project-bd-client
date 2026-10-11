import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

// NOTE: vitest.config.ts で test.globals を有効にしていないため、
// @testing-library/react の自動cleanup（afterEachフック検出）が効かない。
// ここで明示的にafterEach(cleanup)を登録し、テスト間でDOMが残留しないようにする。
afterEach(() => {
  cleanup();
});
