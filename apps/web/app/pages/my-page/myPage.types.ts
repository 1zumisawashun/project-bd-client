import { InferQueryModel } from "@project-bd-client/db/types";

export type MypageUser = InferQueryModel<
  "users",
  {
    with: {
      posts: {
        with: {
          author: true;
        };
      };
      likedArticles: {
        with: {
          article: {
            with: {
              author: true;
            };
          };
        };
      };
    };
  }
>;
