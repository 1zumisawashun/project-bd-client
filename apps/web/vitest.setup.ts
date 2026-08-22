import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

// NOTE: jestでは@testing-library/reactが自動でafterEachにcleanupを登録するが、
// vitestではglobals:trueにしていないと自動検出されないため明示的に登録する
afterEach(() => {
  cleanup();
});
