import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@/functions/libs/react-testing-library/test-utils";
// NOTE: 副作用（mockRouter.useParser の設定）だけが目的のimport。
// mockRouter自体は下の vi.mock("next/router", ...) を通した "next/router" から取得する
// （bareの "next-router-mock" から直接importすると、同じモジュールグラフ内に
// "next-router-mock/MemoryRouterProvider"（test-utils.tsx経由）が同居しているとdefault
// exportがundefinedになる現象を実際に踏んだ。原因はesbuild/viteのCJS-ESM相互運用まわりと
// 推測、完全な特定はできていないが、"next/router" 経由（vi.mockでinterceptされる）で取得
// すると再現しないことは確認済み）
import "./next-router-utils";
import mockRouter from "next/router";
import Page from "./Test";

// @see https://github.com/vercel/next.js/discussions/42527
vi.mock("next/router", async () => vi.importActual("next-router-mock"));

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual<typeof import("next/navigation")>("next/navigation");
  const nextRouterMock = await vi.importActual<typeof import("next-router-mock")>("next-router-mock");
  const { useRouter } = nextRouterMock;
  const usePathname = vi.fn().mockImplementation(() => {
    const router = useRouter();
    return router.asPath;
  });

  const useSearchParams = vi.fn().mockImplementation(() => {
    const router = useRouter();
    return new URLSearchParams(router.query as Record<string, string>);
  });

  return {
    ...actual,
    useRouter: vi.fn().mockImplementation(useRouter),
    usePathname,
    useSearchParams,
  };
});

describe("Page", () => {
  it("renders a heading", () => {
    render(<Page />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });

  it("navigate if link clicked", async () => {
    const { user } = render(<Page />);
    const link = screen.getByRole("link", { name: "About" });

    await user.click(link);

    await waitFor(() => expect(mockRouter).toMatchObject({ pathname: "/about" }));
  });
});
