import { ActionFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { createSupabaseServerClient } from "~/services/supabase.server";

export const meta: MetaFunction = () => [
  { title: "Register | Remix Supabase" },
];

type ActionData = { success: true } | { success: false; error: string };

export const action = async ({ request }: ActionFunctionArgs) => {
  const { supabase, headers } = createSupabaseServerClient(request);

  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || typeof email !== "string") {
    return json<ActionData>(
      { success: false, error: "Invalid email" },
      { status: 400, headers },
    );
  }

  if (!password || typeof password !== "string" || password.length < 6) {
    return json<ActionData>(
      { success: false, error: "Invalid password" },
      { status: 400, headers },
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return json<ActionData>(
      { success: false, error: error.message },
      { headers },
    );
  }

  return json<ActionData>({ success: true }, { headers });
};

export default function Register() {
  const actionResponse = useActionData<typeof action>();

  return (
    <div className="flex flex-col">
      <h1 className="text-lg text-slate-200 font-bold">Register</h1>

      {!actionResponse?.success ? (
        <>
          <Form method="POST" className="flex flex-col space-y-2 mt-4">
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="rounded-sm border-slate-500 bg-slate-300 p-2"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="rounded-sm border-slate-500 bg-slate-300 p-2"
              min={6}
            />
            <button
              type="submit"
              className="rounded bg-purple-600 hover:bg-purple-700 text-purple-50 p-2"
            >
              Register
            </button>
          </Form>
          <div className="flex text-sm mt-2 justify-between">
            <Link to="/login" className="text-purple-500 font-semibold">
              Login
            </Link>
          </div>
        </>
      ) : (
        <p className="text-slate-200">Please check your emails.</p>
      )}
    </div>
  );
}
