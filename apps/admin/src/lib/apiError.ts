/**
 * NOTE:
 * admin-apiのRoute Handlerは401（未ログイン）/403（管理者権限なし）をステータスコードで表現する。
 * SPA側はこのエラーのstatusを見て、ルートガード（`src/routes/__root.tsx`）で
 * web側のログインページ等へのリダイレクトを判断する。
 * @see apps/admin-api/app/api/categories/route.ts
 */
export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function parseErrorMessage(response: Response): Promise<string> {
  try {
    const body: unknown = await response.json();
    if (body && typeof body === "object" && "message" in body) {
      const { message } = body;
      if (typeof message === "string") return message;
    }
  } catch {
    // NOTE: レスポンスボディがJSONでない場合はデフォルトメッセージにフォールバックする
  }
  return "リクエストに失敗しました";
}
