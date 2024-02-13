import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { createSupabaseServerClient } from "~/services/supabase.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { supabase, headers } = createSupabaseServerClient(request);

  // check if user is logged in
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return redirect("/");
  }

  // sign out
  await supabase.auth.signOut();

  return redirect("/", {
    headers,
  });
};
