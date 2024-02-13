import { redirect, type MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Supabase" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = () => {
  return redirect("/login");
};
