"use client";

// NOTE: next/link に依存するコンポーネントだけを集めたエントリーポイント。
// メインの `index.ts`（`.`）はNext.jsに依存しないコンポーネントのみを公開し、
// Vite等の非Next.js環境からも安全にimportできるようにするための分割。
// @see packages/ui/package.json の exports["./next"]

export * from "./buttons/AnchorButton";
export * from "./buttons/IconAnchorButton";
export * from "./elements/Link";
