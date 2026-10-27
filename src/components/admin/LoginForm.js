"use client";

import { useActionState } from "react";
import Button from "@/components/Button";
import { signInAction } from "@/app/admin/auth-actions";

const initialState = {
  error: null,
};

const inputClassName =
  "hud-field mt-2 block min-h-11 w-full px-3 text-base";

export default function LoginForm({ next }) {
  const [state, formAction, pending] = useActionState(
    signInAction,
    initialState,
  );

  return (
    <form action={formAction} className="mt-8 space-y-5">
      {next ? <input name="next" type="hidden" value={next} /> : null}

      <div>
        <label className="hud-label text-muted" htmlFor="email">
          Email
        </label>
        <input
          autoComplete="email"
          className={inputClassName}
          id="email"
          name="email"
          required
          type="email"
        />
      </div>

      <div>
        <label className="hud-label text-muted" htmlFor="password">
          Password
        </label>
        <input
          autoComplete="current-password"
          className={inputClassName}
          id="password"
          name="password"
          required
          type="password"
        />
      </div>

      {state?.error ? (
        <p
          className="border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger"
          role="alert"
        >
          {state.error}
        </p>
      ) : null}

      <Button className="w-full" disabled={pending} type="submit">
        {pending ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
