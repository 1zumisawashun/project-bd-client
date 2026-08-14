"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Button } from "@project-bd-client/ui";
import { Card, CardBody } from "@project-bd-client/ui";
import { Dialog, DialogDescription, DialogTitle } from "@project-bd-client/ui";
import { Description, Title } from "@project-bd-client/ui";
import { HStack } from "@project-bd-client/ui";
import { VStack } from "@project-bd-client/ui";
import { useDisclosure } from "@project-bd-client/ui";

type LogoutDialogProps = {
  isOpen: boolean;
  close: () => void;
};

export const LogoutDialog: FC<LogoutDialogProps> = ({ isOpen, close }) => {
  const router = useRouter();

  const logout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <VStack align="center">
        <DialogTitle>ログアウトしますか？</DialogTitle>
        <DialogDescription>本当にログアウトしますか？</DialogDescription>
        <HStack>
          <Button theme="danger" variant="outlined" onClick={close}>
            キャンセル
          </Button>
          <Button theme="danger" onClick={() => void logout()}>
            ログアウトする
          </Button>
        </HStack>
      </VStack>
    </Dialog>
  );
};

export const MyPageLogout: FC = () => {
  const { isOpen, open, close } = useDisclosure();

  return (
    <Card>
      <CardBody>
        <VStack gap={2}>
          <Title>ログアウトする</Title>
          <Description>
            アカウントからログアウトします。再度利用するにはログインが必要です。
          </Description>
        </VStack>
        <HStack>
          <Button onClick={open}>ログアウトする</Button>
        </HStack>
      </CardBody>
      <LogoutDialog isOpen={isOpen} close={close} />
    </Card>
  );
};
