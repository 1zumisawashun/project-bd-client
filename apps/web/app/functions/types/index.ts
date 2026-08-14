export type { Theme, Variant, Size, Shape, Justify, Align } from "@project-bd-client/ui";

const _ACTION_OPTIONS = ["delete"] as const;
export type Action = (typeof _ACTION_OPTIONS)[number];

const _ARTICLE_STATUS_OPTIONS = ["PUBLISHED", "DRAFT"] as const;
export type ArticleStatus = (typeof _ARTICLE_STATUS_OPTIONS)[number];

export type SearchParams = Record<string, string | string[] | undefined>;
