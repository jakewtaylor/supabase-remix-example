import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { createServerClient, parse, serialize } from "@supabase/ssr";
import { type EmailOtpType } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "~/services/supabase.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const requestUrl = new URL(request.url);
  const token_hash = requestUrl.searchParams.get("token_hash");
  const type = requestUrl.searchParams.get("type") as EmailOtpType | null;
  const next = requestUrl.searchParams.get("next") || "/dashboard";

  const { supabase, headers } = createSupabaseServerClient(request);

  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      return redirect(next, { headers });
    }
  }

  // return the user to an error page with instructions
  return redirect("/auth/auth-code-error", { headers });
}
