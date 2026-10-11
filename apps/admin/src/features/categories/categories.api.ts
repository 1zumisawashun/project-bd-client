import { ApiError, parseErrorMessage } from "@/lib/apiError";
import { type CategoryFormValues } from "./categoryForm.schema";

export type Category = {
  id: string;
  name: string;
  createdAt: string;
};

export type CreateCategoryResult = {
  id: string;
  name: string;
};

// NOTE: 同一オリジン（Viteのdev proxy / Vercelのrewrites）を前提に相対パスで呼ぶ
// @see vite.config.ts, vercel.json
const CATEGORIES_ENDPOINT = "/api/categories";

export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(CATEGORIES_ENDPOINT);

  if (!response.ok) {
    throw new ApiError(response.status, await parseErrorMessage(response));
  }

  const body = (await response.json()) as { categories: Category[] };
  return body.categories;
}

export async function createCategory(
  values: CategoryFormValues,
): Promise<CreateCategoryResult> {
  const response = await fetch(CATEGORIES_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new ApiError(response.status, await parseErrorMessage(response));
  }

  return (await response.json()) as CreateCategoryResult;
}
