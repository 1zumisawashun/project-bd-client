import { type Session } from "next-auth";
import { beforeEach, describe, expect, it, vi, type MockedFunction } from "vitest";

vi.mock("@project-bd-client/auth/session", () => ({
  getSession: vi.fn(),
}));

vi.mock("@/functions/db/category", () => ({
  getCategories: vi.fn(),
  getCategoryByName: vi.fn(),
  createCategory: vi.fn(),
}));

import { getSession } from "@project-bd-client/auth/session";
import {
  createCategory,
  getCategories,
  getCategoryByName,
} from "@/functions/db/category";
import { GET, POST } from "./route";

// NOTE: next-authの `auth`（getSessionの実体）はミドルウェア用のオーバーロードも持つため、
// vi.mocked()だけでは意図しない方のオーバーロードに推論されてしまう。呼び出しシグネチャを
// 明示的に固定する。
const mockGetSession = getSession as unknown as MockedFunction<() => Promise<Session | null>>;
const mockGetCategories = vi.mocked(getCategories);
const mockGetCategoryByName = vi.mocked(getCategoryByName);
const mockCreateCategory = vi.mocked(createCategory);

const adminSession = {
  user: { id: "1", email: "admin@test.com", role: "ADMIN" },
  expires: "",
} as unknown as Session;

const userSession = {
  user: { id: "1", email: "user@test.com", role: "USER" },
  expires: "",
} as unknown as Session;

function postRequest(body: unknown) {
  return new Request("http://localhost/api/categories", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

describe("GET /api/categories", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("未ログインの場合は401を返す", async () => {
    mockGetSession.mockResolvedValue(null);

    const response = await GET();

    expect(response.status).toBe(401);
  });

  it("管理者でない場合は403を返す", async () => {
    mockGetSession.mockResolvedValue(userSession);

    const response = await GET();

    expect(response.status).toBe(403);
  });

  it("管理者の場合はカテゴリー一覧を返す", async () => {
    mockGetSession.mockResolvedValue(adminSession);
    mockGetCategories.mockResolvedValue([{ id: "1", name: "Tech", createdAt: new Date() }]);

    const response = await GET();
    const body = (await response.json()) as { categories: { id: string; name: string }[] };

    expect(response.status).toBe(200);
    expect(body.categories).toHaveLength(1);
  });
});

describe("POST /api/categories", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("未ログインの場合は401を返す", async () => {
    mockGetSession.mockResolvedValue(null);

    const response = await POST(postRequest({ name: "Test" }));

    expect(response.status).toBe(401);
  });

  it("管理者でない場合は403を返す", async () => {
    mockGetSession.mockResolvedValue(userSession);

    const response = await POST(postRequest({ name: "Test" }));

    expect(response.status).toBe(403);
  });

  it("入力が不正な場合は400を返す", async () => {
    mockGetSession.mockResolvedValue(adminSession);

    const response = await POST(postRequest({ name: "" }));

    expect(response.status).toBe(400);
  });

  it("カテゴリー名が重複する場合は409を返す", async () => {
    mockGetSession.mockResolvedValue(adminSession);
    mockGetCategoryByName.mockResolvedValue({
      id: "existing-id",
      name: "Existing Category",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const response = await POST(postRequest({ name: "Existing Category" }));

    expect(response.status).toBe(409);
  });

  it("有効な場合はカテゴリーを作成し201を返す", async () => {
    mockGetSession.mockResolvedValue(adminSession);
    mockGetCategoryByName.mockResolvedValue(null);
    mockCreateCategory.mockResolvedValue({
      id: "new-id",
      name: "New Category",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const response = await POST(postRequest({ name: "New Category" }));
    const body = (await response.json()) as { id: string; name: string };

    expect(response.status).toBe(201);
    expect(body).toEqual({ id: "new-id", name: "New Category" });
    expect(mockCreateCategory).toHaveBeenCalledWith({ name: "New Category" });
  });

  it("作成に失敗した場合は500を返す", async () => {
    mockGetSession.mockResolvedValue(adminSession);
    mockGetCategoryByName.mockResolvedValue(null);
    mockCreateCategory.mockResolvedValue(null);

    const response = await POST(postRequest({ name: "New Category" }));

    expect(response.status).toBe(500);
  });
});
