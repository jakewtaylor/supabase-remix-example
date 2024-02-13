import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { createSupabaseServerClient } from "~/services/supabase.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { supabase } = createSupabaseServerClient(request);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  return json({ user });
};

export default function Dashboard() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <>
      <h1 className="text-xl font-bold">Dashboard</h1>

      <p className="mt-2">
        Welcome, {user.email ?? "<no email on your account>"}
      </p>

      <Form action="/logout" method="post" className="mt-2">
        <button type="submit">Sign Out</button>
      </Form>
    </>
  );
}
