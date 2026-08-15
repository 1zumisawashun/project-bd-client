import pluginCustomRules from "@project-bd-client/eslint-config";
import eslint from "@project-bd-client/eslint-config/configs/eslint";
import next from "@project-bd-client/eslint-config/configs/next";
import prettier from "@project-bd-client/eslint-config/configs/prettier";
import react from "@project-bd-client/eslint-config/configs/react";
import storybook from "@project-bd-client/eslint-config/configs/storybook";
import testingLibrary from "@project-bd-client/eslint-config/configs/testing-library";
import typescript from "@project-bd-client/eslint-config/configs/typescript";
import oxlint from "eslint-plugin-oxlint";

const typescriptReactConfig = [...eslint, ...typescript, ...react, ...next];

const storybookConfig = [...storybook];

const testingLibraryConfig = [...testingLibrary];

const customRulesConfig = [
  {
    name: "custom-rules",
    files: ["**/*.{ts,tsx}"],
    plugins: { "custom-rules": pluginCustomRules },
    rules: {
      "custom-rules/require-should-dirty": "error",
      "custom-rules/require-satisfies-for-refetch-variables": "error",
    },
  },
];

const prettierConfig = [...prettier];

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    ignores: [
      "**/node_modules/",
      "**/.next/",
      "**/public/",
      "**/package-lock.json",
      "**/tsconfig.json",
      "**/.storybook/",
      "**/jest.setup.ts",
      "next.config.mjs",
      "eslint.config.ts",
    ],
  },
  ...typescriptReactConfig,
  ...storybookConfig,
  ...testingLibraryConfig,
  ...customRulesConfig,
  ...prettierConfig,
  ...oxlint.buildFromOxlintConfigFile("./.oxlintrc.json"),
];
