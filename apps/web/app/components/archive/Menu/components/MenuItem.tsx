import { FC, PropsWithChildren } from "react";
import { Button } from "@project-bd-client/ui";
import styles from "../index.module.css";

const BLOCK_NAME = "menu";

type Props = {
  onClick: () => void;
};

export const MenuItem: FC<PropsWithChildren<Props>> = ({ onClick, children }) => {
  return (
    <div className={styles[`${BLOCK_NAME}-item`]}>
      <Button onClick={onClick} variant="ghost" className={styles[`${BLOCK_NAME}-item-button`]!}>
        {children}
      </Button>
      <hr className={styles[`${BLOCK_NAME}-item-separator`]} />
    </div>
  );
};
