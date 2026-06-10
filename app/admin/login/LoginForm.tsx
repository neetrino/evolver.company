"use client";

import { useActionState } from "react";
import { loginAction, type ProjectActionState } from "@/app/admin/projects/actions";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState<ProjectActionState, FormData>(
    loginAction,
    {},
  );

  return (
    <div className="admin-login-wrap">
      <div className="admin-login-card">
        <div className="mb-8 text-center">
          <h1 className="admin-page-title">Evolver Admin</h1>
          <p className="admin-page-subtitle">Sign in to manage projects and messages</p>
        </div>
        <form action={formAction} className="admin-card">
          {state.error ? <p className="form-error">{state.error}</p> : null}
          <div className="admin-form-field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required autoComplete="username" />
          </div>
          <div className="admin-form-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="btn btn-admin-primary w-full" disabled={isPending}>
            {isPending ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
