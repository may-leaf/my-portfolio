"use client";

import { useActionState } from "react";
import Button from "@/components/Button";
import { signInAction } from "@/app/admin/auth-actions";

const initialState = {
  error: null,
};

const inputClassName =
  "mt-2 block min-h-11 w-full rounded-input border border-border bg-surface-alt px-3 text-base text-text placeholder:text-muted focus:border-primary";

export default function LoginForm({ next }) {
  const [state, formAction, pending] = useActionState(
    signInAction,
    initialState,
  );

  return (
    <form action={formAction} className="mt-8 space-y-5">
      {next ? <input name="next" type="hidden" value={next} /> : null}

      <div>
        <label className="text-sm font-semibold" htmlFor="email">
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
        <label className="text-sm font-semibold" htmlFor="password">
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
          className="rounded-card border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger"
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
