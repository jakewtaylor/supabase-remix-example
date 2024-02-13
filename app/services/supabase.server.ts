import {
  createServerClient,
  type CookieOptions,
  parse,
  serialize,
} from "@supabase/ssr";

export function createSupabaseServerClient(request: Request) {
  const cookies = parse(request.headers.get("Cookie") ?? "");
  const headers = new Headers();

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(key: string) {
          return cookies[key];
        },
        set(key: string, value: string, options: CookieOptions) {
          headers.append("Set-Cookie", serialize(key, value, options));
        },
        remove(key: string, options: CookieOptions) {
          headers.append("Set-Cookie", serialize(key, "", options));
        },
      },
    },
  );

  return { supabase, headers };
}
