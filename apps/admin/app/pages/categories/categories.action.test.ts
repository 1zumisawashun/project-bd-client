import { type Session } from "next-auth";
import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";

// Mock dependencies - must be before imports
vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("@project-bd-client/auth/session", () => ({
  getSession: vi.fn(),
}));

vi.mock("@/functions/db/category", () => ({
  getCategoryByName: vi.fn(),
  createCategory: vi.fn(),
}));

import { revalidatePath } from "next/cache";
import { createCategory, getCategoryByName } from "@/functions/db/category";
import { getSession } from "@project-bd-client/auth/session";
import { createCategoryAction } from "./categories.action";

const mockRevalidatePath = vi.mocked(revalidatePath);

const mockGetSession = getSession as unknown as Mock<() => Promise<Session | null>>;
const mockGetCategoryByName = vi.mocked(getCategoryByName);
const mockCreateCategory = vi.mocked(createCategory);

describe("createCategoryAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("authorization", () => {
    it("should return error when user is not authenticated", async () => {
      mockGetSession.mockResolvedValue(null);

      const result = await createCategoryAction({ name: "Test Category" });

      expect(result.isSuccess).toBe(false);
      if (!result.isSuccess) {
        expect(result.error.message).toContain("ログイン");
      }
    });

    it("should return error when user is not admin", async () => {
      mockGetSession.mockResolvedValue({
        user: { id: "1", email: "user@test.com", role: "USER" },
        expires: "",
      });

      const result = await createCategoryAction({ name: "Test Category" });

      expect(result.isSuccess).toBe(false);
      if (!result.isSuccess) {
        expect(result.error.message).toContain("管理者");
      }
    });
  });

  describe("duplicate check", () => {
    it("should return error when category name already exists", async () => {
      mockGetSession.mockResolvedValue({
        user: { id: "1", email: "admin@test.com", role: "ADMIN" },
        expires: "",
      });
      mockGetCategoryByName.mockResolvedValue({
        id: "existing-id",
        name: "Existing Category",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await createCategoryAction({ name: "Existing Category" });

      expect(result.isSuccess).toBe(false);
      if (!result.isSuccess) {
        expect(result.error.message).toContain("既に存在");
      }
    });
  });

  describe("category creation", () => {
    it("should create category and return success when valid", async () => {
      mockGetSession.mockResolvedValue({
        user: { id: "1", email: "admin@test.com", role: "ADMIN" },
        expires: "",
      });
      mockGetCategoryByName.mockResolvedValue(null);
      mockCreateCategory.mockResolvedValue({
        id: "new-id",
        name: "New Category",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await createCategoryAction({ name: "New Category" });

      expect(result.isSuccess).toBe(true);
      if (result.isSuccess) {
        expect(result.data).toEqual({
          id: "new-id",
          name: "New Category",
        });
      }
      expect(mockCreateCategory).toHaveBeenCalledWith({ name: "New Category" });
      expect(mockRevalidatePath).toHaveBeenCalledWith("/admin/categories");
    });

    it("should return error when category creation fails", async () => {
      mockGetSession.mockResolvedValue({
        user: { id: "1", email: "admin@test.com", role: "ADMIN" },
        expires: "",
      });
      mockGetCategoryByName.mockResolvedValue(null);
      mockCreateCategory.mockResolvedValue(null);

      const result = await createCategoryAction({ name: "New Category" });

      expect(result.isSuccess).toBe(false);
      if (!result.isSuccess) {
        expect(result.error.message).toContain("作成に失敗");
      }
    });

    it("should return error when database throws exception", async () => {
      mockGetSession.mockResolvedValue({
        user: { id: "1", email: "admin@test.com", role: "ADMIN" },
        expires: "",
      });
      mockGetCategoryByName.mockResolvedValue(null);
      mockCreateCategory.mockRejectedValue(new Error("Database error"));

      const result = await createCategoryAction({ name: "New Category" });

      expect(result.isSuccess).toBe(false);
    });
  });
});
