export type Post = {
  id: string;
  title: string;
  content: string;
  contact: string | null;
  password_hash: string;
  created_at: string;
  updated_at: string;
  views: number;
};

type D1ApiResponse<T> = {
  success: boolean;
  errors: { code: number; message: string }[];
  result: { results: T[]; success: boolean }[];
};

export async function d1Query<T = Record<string, unknown>>(
  sql: string,
  params: unknown[] = []
): Promise<T[]> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const databaseId = process.env.CLOUDFLARE_D1_DATABASE_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;

  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sql, params }),
    }
  );

  const json = (await res.json()) as D1ApiResponse<T>;

  if (!json.success) {
    throw new Error(json.errors?.[0]?.message ?? "D1 쿼리 실패");
  }

  return json.result[0]?.results ?? [];
}
