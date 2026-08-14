import { Editor } from "@tiptap/react";
import { FC } from "react";
import { Button } from "@project-bd-client/ui";
import { MenuBubble } from "@project-bd-client/ui";
import { tiptapClient } from "@project-bd-client/ui";
import styles from "./articleMenuBubble.module.css";

const BLOCK_NAME = "articleMenuBubble";

type ArticleMenuBubbleProps = {
  editor: Editor;
};

export const ArticleMenuBubble: FC<ArticleMenuBubbleProps> = ({ editor }) => {
  const { bold, italic, strike, trash, link } = tiptapClient(editor);

  const items = [bold, italic, strike, link, trash];
  const className = styles[`${BLOCK_NAME}`]!;

  return (
    <MenuBubble editor={editor} className={className}>
      {items.map((d) => {
        const Icon = d.icon ?? null;
        return (
          <Button key={`menu-bubble-${d.type}-${d.label}`} onClick={d.onClick} variant="ghost">
            {Icon ? <Icon /> : d.label}
          </Button>
        );
      })}
    </MenuBubble>
  );
};
