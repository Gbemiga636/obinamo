"use client";

import { useEffect, useMemo, useState } from "react";
import type { ObinasomGuest } from "@/lib/supabase/obinasom";
import {
  ArrowDown,
  ArrowUp,
  Download,
  LogOut,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

export function AdminDashboard() {
  const [guests, setGuests] = useState<ObinasomGuest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<ObinasomGuest | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/obinasom/guests");
      const data = (await res.json()) as {
        guests?: ObinasomGuest[];
        error?: string;
      };
      if (!res.ok) throw new Error(data.error || "Failed to load guests");
      setGuests(data.guests ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return guests;
    return guests.filter((g) =>
      [g.first_name, g.surname, g.phone, g.email]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [guests, query]);

  const logout = async () => {
    await fetch("/api/obinasom/admin/login", { method: "DELETE" });
    window.location.href = "/admin";
  };

  const move = async (id: string, dir: -1 | 1) => {
    const index = guests.findIndex((g) => g.id === id);
    const next = index + dir;
    if (index < 0 || next < 0 || next >= guests.length) return;
    const ordered = [...guests];
    const [item] = ordered.splice(index, 1);
    ordered.splice(next, 0, item);
    setGuests(ordered);
    setBusyId(id);
    try {
      const res = await fetch("/api/obinasom/guests/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds: ordered.map((g) => g.id) }),
      });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error || "Reorder failed");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Reorder failed");
      await load();
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm("Delete this guest?")) return;
    setBusyId(id);
    try {
      const res = await fetch(`/api/obinasom/guests/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error || "Delete failed");
      }
      setGuests((prev) => prev.filter((g) => g.id !== id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setBusyId(null);
    }
  };

  const saveEdit = async (guest: ObinasomGuest) => {
    setBusyId(guest.id);
    try {
      const res = await fetch(`/api/obinasom/guests/${guest.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: guest.first_name,
          surname: guest.surname,
          phone: guest.phone,
          email: guest.email,
        }),
      });
      const data = (await res.json()) as {
        guest?: ObinasomGuest;
        error?: string;
      };
      if (!res.ok) throw new Error(data.error || "Update failed");
      setGuests((prev) =>
        prev.map((g) => (g.id === guest.id ? (data.guest as ObinasomGuest) : g)),
      );
      setEditing(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Update failed");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="mx-auto min-h-screen w-full max-w-6xl px-3 py-4 sm:px-6 sm:py-8">
      <header className="flex flex-col gap-4 border-b border-[var(--line)] pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="type-eyebrow text-dusty-blue">Obinasom</p>
          <h1 className="font-display text-2xl font-bold text-mocha sm:text-3xl">
            Guest admin
          </h1>
          <p className="mt-1 font-serif text-sm text-ink-soft/70">
            {guests.length} guest{guests.length === 1 ? "" : "s"} saved
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {/* Download hits an API route (CSV), not a page */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/api/obinasom/guests/export"
            download
            className="inline-flex items-center gap-2 rounded-full border border-soft-gold/40 bg-paper px-3.5 py-2 text-sm text-cognac"
          >
            <Download className="h-4 w-4" />
            Download CSV
          </a>
          <button
            type="button"
            onClick={() => void load()}
            className="rounded-full border border-[var(--line)] bg-ivory px-3.5 py-2 text-sm text-ink-soft"
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={() => void logout()}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-ivory px-3.5 py-2 text-sm text-ink-soft"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </div>
      </header>

      <div className="mt-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, phone, or email"
          className="w-full border border-[var(--line)] bg-paper px-3 py-2.5 font-serif text-sm outline-none focus:border-soft-gold sm:max-w-md"
        />
      </div>

      {error ? (
        <p className="mt-4 rounded-sm border border-cognac/30 bg-cognac/10 px-3 py-2 font-serif text-sm text-cognac">
          {error}
        </p>
      ) : null}

      {loading ? (
        <p className="mt-8 font-serif text-sm text-ink-soft/60">Loading guests…</p>
      ) : filtered.length === 0 ? (
        <p className="mt-8 font-serif text-sm text-ink-soft/60">No guests yet.</p>
      ) : (
        <>
          {/* Mobile cards */}
          <ul className="mt-5 space-y-3 md:hidden">
            {filtered.map((g, i) => (
              <li
                key={g.id}
                className="rounded-sm border border-[var(--line)] bg-paper p-4 shadow-[var(--shadow-sm)]"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-display text-base font-bold text-mocha">
                      {g.first_name} {g.surname}
                    </p>
                    <p className="mt-1 break-all font-serif text-sm text-ink-soft">
                      {g.phone}
                    </p>
                    <p className="break-all font-serif text-sm text-ink-soft/80">
                      {g.email}
                    </p>
                  </div>
                  <span className="shrink-0 font-display text-xs text-dusty-blue">
                    #{i + 1}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={busyId === g.id}
                    onClick={() => void move(g.id, -1)}
                    className="rounded-full border border-[var(--line)] p-2"
                    aria-label="Move up"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    disabled={busyId === g.id}
                    onClick={() => void move(g.id, 1)}
                    className="rounded-full border border-[var(--line)] p-2"
                    aria-label="Move down"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(g)}
                    className="rounded-full border border-soft-gold/40 px-3 py-2 text-sm text-cognac"
                  >
                    <span className="inline-flex items-center gap-1">
                      <Pencil className="h-3.5 w-3.5" /> Edit
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => void remove(g.id)}
                    className="rounded-full border border-cognac/30 px-3 py-2 text-sm text-cognac"
                  >
                    <span className="inline-flex items-center gap-1">
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </span>
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Desktop table */}
          <div className="mt-5 hidden overflow-x-auto rounded-sm border border-[var(--line)] md:block">
            <table className="min-w-full divide-y divide-[var(--line)] text-left text-sm">
              <thead className="bg-ivory/80">
                <tr className="font-display text-xs uppercase tracking-[0.14em] text-dusty-blue">
                  <th className="px-3 py-3">#</th>
                  <th className="px-3 py-3">First name</th>
                  <th className="px-3 py-3">Surname</th>
                  <th className="px-3 py-3">Phone</th>
                  <th className="px-3 py-3">Email</th>
                  <th className="px-3 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--line)] bg-paper">
                {filtered.map((g, i) => (
                  <tr key={g.id} className="align-middle">
                    <td className="px-3 py-3 text-dusty-blue">{i + 1}</td>
                    <td className="px-3 py-3 font-serif">{g.first_name}</td>
                    <td className="px-3 py-3 font-serif">{g.surname}</td>
                    <td className="px-3 py-3 font-serif">{g.phone}</td>
                    <td className="px-3 py-3 font-serif">{g.email}</td>
                    <td className="px-3 py-3">
                      <div className="flex flex-wrap gap-1.5">
                        <button
                          type="button"
                          disabled={busyId === g.id}
                          onClick={() => void move(g.id, -1)}
                          className="rounded border border-[var(--line)] p-1.5"
                          aria-label="Move up"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          disabled={busyId === g.id}
                          onClick={() => void move(g.id, 1)}
                          className="rounded border border-[var(--line)] p-1.5"
                          aria-label="Move down"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditing(g)}
                          className="rounded border border-soft-gold/40 p-1.5 text-cognac"
                          aria-label="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => void remove(g.id)}
                          className="rounded border border-cognac/30 p-1.5 text-cognac"
                          aria-label="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {editing ? (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-mocha/40 p-3 sm:items-center">
          <div className="w-full max-w-md rounded-sm border border-[var(--line)] bg-ivory p-5 shadow-[var(--shadow-xl)]">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-mocha">
                Edit guest
              </h2>
              <button
                type="button"
                onClick={() => setEditing(null)}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                void saveEdit(editing);
              }}
            >
              {(
                [
                  ["first_name", "First name"],
                  ["surname", "Surname"],
                  ["phone", "Phone"],
                  ["email", "Email"],
                ] as const
              ).map(([key, label]) => (
                <label key={key} className="block">
                  <span className="type-eyebrow text-[10px] text-dusty-blue">
                    {label}
                  </span>
                  <input
                    required
                    value={editing[key]}
                    onChange={(e) =>
                      setEditing({ ...editing, [key]: e.target.value })
                    }
                    className="mt-1 w-full border border-[var(--line)] bg-paper px-3 py-2 font-serif text-sm outline-none focus:border-soft-gold"
                  />
                </label>
              ))}
              <button
                type="submit"
                disabled={busyId === editing.id}
                className="btn-primary w-full"
              >
                Save changes
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
