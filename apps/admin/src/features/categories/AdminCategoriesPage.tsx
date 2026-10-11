import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { categoriesQueryOptions } from "./categories.queries";
import { CategoryForm } from "./components/CategoryForm";
import { CategoryList } from "./components/CategoryList";

export function AdminCategoriesPage() {
  const queryClient = useQueryClient();
  // NOTE: ルートの loader（src/routes/index.tsx）が ensureQueryData 済みなので
  // ここでは suspense query としてキャッシュから同期的に読む
  const { data: categories } = useSuspenseQuery(categoriesQueryOptions());

  const handleSuccess = () => {
    void queryClient.invalidateQueries({ queryKey: categoriesQueryOptions().queryKey });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">カテゴリー管理</h1>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">カテゴリーを追加</h2>
        <CategoryForm onSuccess={handleSuccess} />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">カテゴリー一覧</h2>
        <CategoryList categories={categories} />
      </section>
    </div>
  );
}
