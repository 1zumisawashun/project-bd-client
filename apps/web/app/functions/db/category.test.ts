import db from "@project-bd-client/db";
import { categories } from "@project-bd-client/db/schema";
import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import { getCategories } from "./category";

// Mock the database
vi.mock("@project-bd-client/db", () => ({
  __esModule: true,
  default: {
    select: vi.fn(),
    query: {
      categories: {
        findFirst: vi.fn(),
      },
    },
    insert: vi.fn(),
  },
}));

describe("getCategories", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return all categories with id, name, and createdAt", async () => {
    const mockCategories = [
      { id: "1", name: "Technology", createdAt: new Date("2026-02-03") },
      { id: "2", name: "Design", createdAt: new Date("2026-02-02") },
    ];

    const mockFrom = vi.fn().mockReturnValue({
      orderBy: vi.fn().mockResolvedValue(mockCategories),
    });
    const mockSelect = vi.fn().mockReturnValue({ from: mockFrom });
    (db.select as Mock).mockImplementation(mockSelect);

    const result = await getCategories();

    expect(result).toEqual(mockCategories);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(db.select).toHaveBeenCalledWith({
      id: categories.id,
      name: categories.name,
      createdAt: categories.createdAt,
    });
  });

  it("should order categories by createdAt in descending order", async () => {
    const mockCategories = [
      { id: "1", name: "Technology", createdAt: new Date("2026-02-03") },
      { id: "2", name: "Design", createdAt: new Date("2026-02-02") },
    ];

    const mockOrderBy = vi.fn().mockResolvedValue(mockCategories);
    const mockFrom = vi.fn().mockReturnValue({ orderBy: mockOrderBy });
    const mockSelect = vi.fn().mockReturnValue({ from: mockFrom });
    (db.select as Mock).mockImplementation(mockSelect);

    await getCategories();

    expect(mockOrderBy).toHaveBeenCalled();
  });

  it("should return null when no categories exist", async () => {
    const mockOrderBy = vi.fn().mockResolvedValue([]);
    const mockFrom = vi.fn().mockReturnValue({ orderBy: mockOrderBy });
    const mockSelect = vi.fn().mockReturnValue({ from: mockFrom });
    (db.select as Mock).mockImplementation(mockSelect);

    const result = await getCategories();

    expect(result).toEqual([]);
  });

  it("should throw error when database query fails", async () => {
    const mockFrom = vi.fn().mockReturnValue({
      orderBy: vi.fn().mockRejectedValue(new Error("DB Error")),
    });
    const mockSelect = vi.fn().mockReturnValue({ from: mockFrom });
    (db.select as Mock).mockImplementation(mockSelect);

    await expect(getCategories()).rejects.toThrow("Failed to get categories");
  });
});
