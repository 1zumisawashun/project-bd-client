"use client";

// NOTE: next/link に依存するコンポーネント（AnchorButton, IconAnchorButton, Link）は
// `./next`（index.next.ts）側に分離している。ここ（メインエントリーポイント）は
// Next.jsに依存せず、Vite等の非Next.js環境からも安全にimportできる状態を保つ。
// @see packages/ui/package.json の exports

// types
export * from "./types";

// hooks
export * from "./hooks/useActiveStep";
export * from "./hooks/useAnimationEnd";
export * from "./hooks/useArrayState";
export * from "./hooks/useDisclosure";
export * from "./hooks/useLineClamp";
export * from "./hooks/useMergeRef";
export * from "./hooks/useOuterClick";

// buttons
export * from "./buttons/Button";
export * from "./buttons/IconButton";

// layouts
export * from "./layouts/HStack";
export * from "./layouts/VStack";
export * from "./layouts/LayoutWrapper";
export * from "./layouts/StickyWrapper";

// editor utilities
export * from "./elements/Editor/hooks/useEditor";
export * from "./elements/Editor/helpers/tiptapClient";

// elements
export * from "./elements/Breadcrumb";
export * from "./elements/Card";
export * from "./elements/Dialog";
export * from "./elements/Editor";
export * from "./elements/Footer";
export * from "./elements/HamburgerMenu";
export * from "./elements/Icon";
export * from "./elements/KebabMenu";
export * from "./elements/Label";
export * from "./elements/LoadingDot";
export * from "./elements/LoadingSpinner";
export * from "./elements/Menu";
export * from "./elements/Menubar";
export * from "./elements/Nl2br";
export * from "./elements/NotFound";
export * from "./elements/SimpleDialog";
export * from "./elements/Status";
export * from "./elements/Tabs";
export * from "./elements/Toast";
export * from "./elements/Tooltip";
export * from "./elements/Typography";

// forms
export * from "./forms/Autocomplete";
export * from "./forms/Checkbox";
export * from "./forms/Field";
export * from "./forms/Fieldset";
export * from "./forms/PriceInput";
export * from "./forms/Radio";
export * from "./forms/TextInput";
export * from "./forms/Toggle";
