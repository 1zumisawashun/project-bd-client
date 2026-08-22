import { FC } from "react";
import { AnchorButton } from "@project-bd-client/ui";
import { getSession } from "@project-bd-client/auth/session";
import { HeaderNav } from "./components/HeaderNav";
import { getFlatMenu } from "./helpers/getFlatMenu";
import styles from "./index.module.css";

const BLOCK_NAME = "header";

// NOTE: RSCに依存しているためカタログに追加できない
export const Header: FC = async () => {
  const session = await getSession();
  const routes = getFlatMenu({ isPrivate: !!session, isAuth: !session });

  return (
    <header className={styles[`${BLOCK_NAME}`]}>
      <AnchorButton href="/" variant="ghost">
        project-bd
      </AnchorButton>
      <HeaderNav routes={routes} blockName={BLOCK_NAME} />
    </header>
  );
};
