import { Outlet } from "@remix-run/react";

export default function AuthLayout() {
  return (
    <div className="flex items-center justify-center bg-slate-900 h-full">
      <div className="bg-slate-800 border-slate-900 rounded p-4 w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}
