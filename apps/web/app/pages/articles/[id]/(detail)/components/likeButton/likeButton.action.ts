"use server";

import { and, eq } from "drizzle-orm";
import { getArticleById } from "@/functions/db/article";
import { actionResult } from "@/functions/helpers/actionResult";
import db from "@project-bd-client/db";
import { likedArticles } from "@project-bd-client/db/schema";
import { getSession } from "@project-bd-client/auth/session";

type DislikeArticleArgs = {
  articleId: string;
  userId: string;
};

export const dislikeArticle = async ({ articleId, userId }: DislikeArticleArgs) => {
  try {
    const session = await getSession();

    if (!session?.user.id) {
      return actionResult.end("ログインしてください");
    }

    // Remove the like by deleting from junction table
    await db
      .delete(likedArticles)
      .where(and(eq(likedArticles.articleId, articleId), eq(likedArticles.userId, userId)));

    const article = await getArticleById({ id: articleId });
    if (!article) {
      return actionResult.end("記事が見つかりません");
    }

    const { likedUsers: _likedUsers, categories: _categories, ...articleData } = article;
    return actionResult.success(articleData);
  } catch (error) {
    return actionResult.error(error);
  }
};
