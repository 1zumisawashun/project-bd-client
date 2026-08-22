import { MOCK_ARTICLES } from "@project-bd-client/db/constants/articles";
import { MOCK_USER } from "@project-bd-client/db/constants/users";
import { MypageUser } from "./myPage.types";

export const MOCK_MYPAGE_USER = {
  ...MOCK_USER,
  posts: MOCK_ARTICLES.map((article) => ({
    ...article,
    author: MOCK_USER,
  })),
  likedArticles: MOCK_ARTICLES.map((article) => ({
    userId: "userId",
    articleId: "articleId",
    article: { ...article, author: MOCK_USER },
  })),
} satisfies MypageUser;
