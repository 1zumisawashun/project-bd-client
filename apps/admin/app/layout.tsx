import { type Metadata } from "next";
import { type PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "project-bd admin",
  description: "project-bd 管理者向けアプリ",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
