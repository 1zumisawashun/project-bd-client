import { InferQueryModel } from "@project-bd-client/db/types";

export type ArticleCategory = InferQueryModel<
  "categories",
  {
    columns: {
      id: true;
      name: true;
    };
  }
>;

export type Article = InferQueryModel<
  "articles",
  {
    with: {
      categories: {
        with: {
          category: true;
        };
      };
      likedUsers: {
        with: {
          user: {
            columns: {
              id: true;
            };
          };
        };
      };
    };
  }
>;
