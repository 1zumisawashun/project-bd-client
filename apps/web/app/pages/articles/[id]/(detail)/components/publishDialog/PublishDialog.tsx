"use client";

import { useRouter } from "next/navigation";
import { FC, startTransition } from "react";
import {
  Button,
  Dialog,
  DialogDescription,
  DialogTitle,
  useToast,
  HStack,
  VStack,
} from "@project-bd-client/ui";
import { publishArticle } from "./publishDialog.action";

type PublishDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  articleId: string;
};

export const PublishDialog: FC<PublishDialogProps> = ({ isOpen, onClose, articleId }) => {
  const toast = useToast();
  const router = useRouter();

  const handlePublish = () => {
    startTransition(async () => {
      const response = await publishArticle({ id: articleId });

      if (!response?.isSuccess) {
        toast.add({
          title: "エラーが発生しました",
          description: response.error.message ?? "エラーが発生しました",
        });
        return;
      }
      toast.add({
        title: "成功しました",
        description: response.message ?? "成功しました",
      });

      onClose();
      router.refresh();
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <VStack align="center">
        <DialogTitle>記事を公開します</DialogTitle>
        <DialogDescription>記事を公開します。執筆お疲れ様でした！</DialogDescription>
        <HStack>
          <Button variant="outlined" onClick={onClose}>
            キャンセル
          </Button>
          <Button onClick={handlePublish}>公開する</Button>
        </HStack>
      </VStack>
    </Dialog>
  );
};
