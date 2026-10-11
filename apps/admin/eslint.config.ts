import eslint from "@project-bd-client/eslint-config/configs/eslint";
import prettier from "@project-bd-client/eslint-config/configs/prettier";
import react from "@project-bd-client/eslint-config/configs/react";
import typescript from "@project-bd-client/eslint-config/configs/typescript";
import oxlint from "eslint-plugin-oxlint";

// NOTE: apps/admin-api/eslint.config.ts と異なり、Vite SPAなのでnext configは使わない
const typescriptReactConfig = [...eslint, ...typescript, ...react];

const prettierConfig = [...prettier];

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    ignores: [
      "**/node_modules/",
      "**/dist/",
      "**/tsconfig.json",
      "vite.config.ts",
      "eslint.config.ts",
      "src/routeTree.gen.ts",
    ],
  },
  ...typescriptReactConfig,
  ...prettierConfig,
  ...oxlint.buildFromOxlintConfigFile("./.oxlintrc.json"),
];
