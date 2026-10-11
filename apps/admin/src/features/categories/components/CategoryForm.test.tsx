import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { type ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ApiError } from "@/lib/apiError";
import { CategoryForm } from "./CategoryForm";

vi.mock("../categories.api", () => ({
  createCategory: vi.fn(),
}));

import { createCategory } from "../categories.api";

const mockCreateCategory = vi.mocked(createCategory);

function renderWithQueryClient(ui: ReactNode) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
}

describe("CategoryForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render category name input field", () => {
      renderWithQueryClient(<CategoryForm />);

      expect(screen.getByLabelText("カテゴリー名", { exact: false })).toBeInTheDocument();
    });

    it("should render submit button", () => {
      renderWithQueryClient(<CategoryForm />);

      expect(screen.getByRole("button", { name: "作成" })).toBeInTheDocument();
    });
  });

  describe("validation", () => {
    it("should show error when submitting empty name", async () => {
      const user = userEvent.setup();
      renderWithQueryClient(<CategoryForm />);

      const input = screen.getByLabelText("カテゴリー名", { exact: false });
      await user.clear(input);
      await user.click(screen.getByRole("button", { name: "作成" }));

      await waitFor(() => {
        expect(screen.getByText("カテゴリー名は必須です")).toBeInTheDocument();
      });

      expect(mockCreateCategory).not.toHaveBeenCalled();
    });
  });

  describe("submission", () => {
    it("should call createCategory with form values", async () => {
      mockCreateCategory.mockResolvedValue({ id: "1", name: "New Category" });

      const user = userEvent.setup();
      renderWithQueryClient(<CategoryForm />);

      await user.type(screen.getByLabelText("カテゴリー名", { exact: false }), "New Category");
      await user.click(screen.getByRole("button", { name: "作成" }));

      await waitFor(() => {
        expect(mockCreateCategory).toHaveBeenCalledWith(
          { name: "New Category" },
          expect.anything(),
        );
      });
    });

    it("should disable submit button while submitting", async () => {
      mockCreateCategory.mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve({ id: "1", name: "Test" }), 100),
          ),
      );

      const user = userEvent.setup();
      renderWithQueryClient(<CategoryForm />);

      await user.type(screen.getByLabelText("カテゴリー名", { exact: false }), "Test");
      await user.click(screen.getByRole("button", { name: "作成" }));

      expect(screen.getByRole("button", { name: "作成中..." })).toBeDisabled();
    });

    it("should call onSuccess callback after successful submission", async () => {
      mockCreateCategory.mockResolvedValue({ id: "1", name: "New Category" });

      const onSuccess = vi.fn();
      const user = userEvent.setup();
      renderWithQueryClient(<CategoryForm onSuccess={onSuccess} />);

      await user.type(screen.getByLabelText("カテゴリー名", { exact: false }), "New Category");
      await user.click(screen.getByRole("button", { name: "作成" }));

      await waitFor(() => {
        expect(onSuccess).toHaveBeenCalled();
      });
    });

    it("should show error message when submission fails", async () => {
      mockCreateCategory.mockRejectedValue(new ApiError(409, "このカテゴリー名は既に存在します"));

      const user = userEvent.setup();
      renderWithQueryClient(<CategoryForm />);

      await user.type(screen.getByLabelText("カテゴリー名", { exact: false }), "Existing");
      await user.click(screen.getByRole("button", { name: "作成" }));

      await waitFor(() => {
        expect(screen.getByText("このカテゴリー名は既に存在します")).toBeInTheDocument();
      });
    });
  });
});
