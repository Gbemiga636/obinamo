"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export function AdminApp() {
  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch("/api/obinasom/admin/login");
        const data = (await res.json()) as { authenticated?: boolean };
        setAuthed(!!data.authenticated);
      } catch {
        setAuthed(false);
      } finally {
        setChecking(false);
      }
    })();
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/obinasom/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }
      setAuthed(true);
    } catch {
      setError("Network error");
    } finally {
      setSubmitting(false);
    }
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f0e6]">
        <p className="font-serif text-sm text-ink-soft/70">Checking session…</p>
      </div>
    );
  }

  if (authed) {
    return (
      <div className="min-h-screen bg-[#f7f0e6] text-ink">
        <AdminDashboard />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f0e6] px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm space-y-4 rounded-sm border border-soft-gold/35 bg-paper p-6 shadow-[var(--shadow-md)]"
      >
        <div className="text-center">
          <p className="type-eyebrow text-dusty-blue">Obinasom</p>
          <h1 className="mt-2 font-display text-2xl font-bold text-mocha">
            Admin login
          </h1>
        </div>
        <label className="block">
          <span className="type-eyebrow text-[10px] text-dusty-blue">
            Username
          </span>
          <input
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1.5 w-full border border-[var(--line)] bg-ivory px-3 py-2.5 font-serif text-sm outline-none focus:border-soft-gold"
            autoComplete="username"
          />
        </label>
        <label className="block">
          <span className="type-eyebrow text-[10px] text-dusty-blue">
            Password
          </span>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5 w-full border border-[var(--line)] bg-ivory px-3 py-2.5 font-serif text-sm outline-none focus:border-soft-gold"
            autoComplete="current-password"
          />
        </label>
        {error ? (
          <p className="font-serif text-sm text-cognac">{error}</p>
        ) : null}
        <button
          type="submit"
          disabled={submitting}
          className="btn-primary w-full disabled:opacity-60"
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
