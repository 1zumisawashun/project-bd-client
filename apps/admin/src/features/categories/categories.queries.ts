import { queryOptions } from "@tanstack/react-query";
import { fetchCategories } from "./categories.api";

export const categoriesQueryOptions = () =>
  queryOptions({
    queryKey: ["categories"] as const,
    queryFn: fetchCategories,
  });
