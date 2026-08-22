import { CONTENT } from "@project-bd-client/db/constants/articles";

export const defaultValues = {
  title: "",
  content: CONTENT,
  categories: [],
  status: "PUBLISHED" as const,
};
