import eslint from "@project-bd-client/eslint-config/configs/eslint";
import next from "@project-bd-client/eslint-config/configs/next";
import prettier from "@project-bd-client/eslint-config/configs/prettier";
import react from "@project-bd-client/eslint-config/configs/react";
import typescript from "@project-bd-client/eslint-config/configs/typescript";
import oxlint from "eslint-plugin-oxlint";

const typescriptReactConfig = [...eslint, ...typescript, ...react, ...next];

const prettierConfig = [...prettier];

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    ignores: ["**/node_modules/", "**/.next/", "**/tsconfig.json", "next.config.mjs", "eslint.config.ts"],
  },
  ...typescriptReactConfig,
  ...prettierConfig,
  ...oxlint.buildFromOxlintConfigFile("./.oxlintrc.json"),
];
