"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CommissionPage() {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    type: "Icon",
    description: "",
    budget: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    const { error } = await supabase.from("commission_requests").insert(form);

    if (error) {
      console.error(error);
      setStatus("error");
    } else {
      setStatus("success");
      setForm({ name: "", contact: "", type: "Icon", description: "", budget: "" });
    }
  }

  const inputClass = "w-full rounded border border-gray-300 p-2";

  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="mb-6 text-3xl font-bold">Commission Request</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block font-medium">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">
            Contact (Discord / Instagram / email)
          </label>
          <input
            name="contact"
            value={form.contact}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className={inputClass}
          >
            <option>Icon</option>
            <option>Half body</option>
            <option>Full body</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">Budget</label>
          <input
            name="budget"
            value={form.budget}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded bg-black px-6 py-2 text-white disabled:opacity-50"
        >
          {status === "sending" ? "Sending..." : "Submit"}
        </button>

        {status === "success" && (
          <p className="text-green-600">Request sent! I'll contact you soon.</p>
        )}
        {status === "error" && (
          <p className="text-red-600">Something went wrong. Please try again.</p>
        )}
      </form>
    </main>
  );
}