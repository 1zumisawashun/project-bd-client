import { InferQueryModel } from "@project-bd-client/db/types";

export type ArticleListArticle = InferQueryModel<
  "articles",
  {
    with: {
      author: true;
    };
  }
>;
