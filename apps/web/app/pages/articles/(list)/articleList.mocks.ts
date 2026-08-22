import { MOCK_ARTICLES } from "@project-bd-client/db/constants/articles";
import { MOCK_USER } from "@project-bd-client/db/constants/users";
import { ArticleListArticle } from "./articleList.types";

export const MOCK_ARTICLE_LIST_ARTICLE = MOCK_ARTICLES.map((article) => ({
  ...article,
  author: MOCK_USER,
})) satisfies ArticleListArticle[];
