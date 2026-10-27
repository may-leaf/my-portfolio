"use client";

import { useActionState } from "react";
import { updateCommissionSettingsAction } from "@/app/admin/(protected)/settings/actions";
import Button from "@/components/Button";

const initialState = {
  status: null,
  message: null,
};

export default function SettingsForm({ open }) {
  const [state, formAction, pending] = useActionState(
    updateCommissionSettingsAction,
    initialState,
  );

  return (
    <form action={formAction} className="mt-6 space-y-5">
      <label
        className="flex min-h-11 cursor-pointer items-center justify-between gap-4 rounded-card border border-border bg-surface-alt px-4 py-3"
        htmlFor="commissions_open"
      >
        <span>
          <span className="block text-base font-semibold">
            Open for commissions
          </span>
          <span className="mt-1 block text-sm leading-relaxed text-muted">
            Controls the status badge shown on the Commission page.
          </span>
        </span>
        <input
          className="h-5 w-5 shrink-0 accent-primary"
          defaultChecked={open}
          id="commissions_open"
          name="commissions_open"
          type="checkbox"
        />
      </label>

      {state?.status === "error" && state.message ? (
        <p
          className="rounded-card border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger"
          role="alert"
        >
          {state.message}
        </p>
      ) : null}

      <div aria-live="polite" className="min-h-6 text-sm text-muted">
        {pending ? "Saving..." : state?.message}
      </div>

      <Button className="w-full sm:w-auto" disabled={pending} type="submit">
        {pending ? "Saving..." : "Save settings"}
      </Button>
    </form>
  );
}
