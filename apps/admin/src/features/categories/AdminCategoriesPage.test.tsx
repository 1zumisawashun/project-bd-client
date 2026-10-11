import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AdminCategoriesPage } from "./AdminCategoriesPage";
import { categoriesQueryOptions } from "./categories.queries";

vi.mock("./categories.api", () => ({
  fetchCategories: vi.fn(),
  createCategory: vi.fn(),
}));

import { createCategory, fetchCategories, type Category } from "./categories.api";

const mockCreateCategory = vi.mocked(createCategory);
const mockFetchCategories = vi.mocked(fetchCategories);

function renderPage(categories: Category[]) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  // NOTE: 実際のルートではloaderがensureQueryDataでキャッシュを温めてから
  // componentがレンダリングされるため、テストでも同様にキャッシュへ直接書き込んでおく
  // （fetchCategoriesの呼び出しをモックするより、ルートのloaderの責務とpageの責務を
  // 分けて考えられる）。createCategory成功後のinvalidateQueriesでバックグラウンド再取得
  // が走るため、fetchCategoriesにも同じ値を返すデフォルトを与えておく。
  queryClient.setQueryData(categoriesQueryOptions().queryKey, categories);
  mockFetchCategories.mockResolvedValue(categories);

  return render(
    <QueryClientProvider client={queryClient}>
      <AdminCategoriesPage />
    </QueryClientProvider>,
  );
}

describe("AdminCategoriesPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockCategories: Category[] = [
    { id: "1", name: "Tech", createdAt: "2026-02-03T00:00:00.000Z" },
    { id: "2", name: "Design", createdAt: "2026-02-02T00:00:00.000Z" },
  ];

  describe("rendering", () => {
    it("should render page title and section headings", () => {
      renderPage(mockCategories);

      expect(screen.getByText("カテゴリー管理")).toBeInTheDocument();
      expect(screen.getByText("カテゴリーを追加")).toBeInTheDocument();
      expect(screen.getByText("カテゴリー一覧")).toBeInTheDocument();
    });

    it("should render existing categories", () => {
      renderPage(mockCategories);

      expect(screen.getByText("Tech")).toBeInTheDocument();
      expect(screen.getByText("Design")).toBeInTheDocument();
    });

    it("should render empty state when there are no categories", () => {
      renderPage([]);

      expect(screen.getByText("カテゴリーがまだ作成されていません")).toBeInTheDocument();
    });
  });

  describe("カテゴリー作成フロー", () => {
    it("管理者としてカテゴリーを作成できる", async () => {
      mockCreateCategory.mockResolvedValue({ id: "new-id", name: "Technology" });

      const user = userEvent.setup();
      renderPage([]);

      await user.type(screen.getByLabelText("カテゴリー名", { exact: false }), "Technology");
      await user.click(screen.getByRole("button", { name: "作成" }));

      await waitFor(() => {
        expect(mockCreateCategory).toHaveBeenCalledWith(
          { name: "Technology" },
          expect.anything(),
        );
      });
    });

    it("バリデーションエラーが正しく表示される", async () => {
      const user = userEvent.setup();
      renderPage([]);

      await user.click(screen.getByRole("button", { name: "作成" }));

      await waitFor(() => {
        expect(screen.getByText("カテゴリー名は必須です")).toBeInTheDocument();
      });

      expect(mockCreateCategory).not.toHaveBeenCalled();
    });

    it("重複カテゴリー名でエラーが表示される", async () => {
      mockCreateCategory.mockRejectedValue(new Error("このカテゴリー名は既に存在します"));

      const user = userEvent.setup();
      renderPage([{ id: "1", name: "Existing", createdAt: "2026-02-01T00:00:00.000Z" }]);

      await user.type(screen.getByLabelText("カテゴリー名", { exact: false }), "Existing");
      await user.click(screen.getByRole("button", { name: "作成" }));

      await waitFor(() => {
        expect(screen.getByText("このカテゴリー名は既に存在します")).toBeInTheDocument();
      });
    });
  });
});
