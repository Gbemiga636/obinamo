"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SectionShell } from "@/components/layout/SectionShell";

type Wish = { name: string; note: string; at: string };

export function GuestbookSection() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    try {
      setWishes(JSON.parse(localStorage.getItem("Obinasom-wishes") || "[]"));
    } catch {
      setWishes([]);
    }
  }, []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !note.trim()) return;
    const next = [
      { name: name.trim(), note: note.trim(), at: new Date().toISOString() },
      ...wishes,
    ].slice(0, 40);
    setWishes(next);
    localStorage.setItem("Obinasom-wishes", JSON.stringify(next));
    setName("");
    setNote("");
  };

  return (
    <SectionShell
      id="wishes"
      tone="alt"
      title="Memory Book"
      subtitle="Leave a wish for Princess & Victor."
      narrow
    >
      <form onSubmit={submit} className="space-y-3 text-left">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="field-input"
          required
        />
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Your blessing or memory…"
          className="field-input min-h-[100px] resize-y"
          required
        />
        <button type="submit" className="btn-ghost w-full">
          Leave a wish
        </button>
      </form>

      <div className="mt-12 space-y-3 text-left">
        {wishes.length === 0 ? (
          <p className="text-center font-serif text-ink-soft/50">
            Be the first to write in our memory book.
          </p>
        ) : (
          wishes.map((w) => (
            <motion.blockquote
              key={w.at + w.name}
              className="panel px-5 py-5"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="font-serif text-lg italic text-ink">
                &ldquo;{w.note}&rdquo;
              </p>
              <footer className="type-eyebrow mt-3 text-[10px] text-soft-gold">
                — {w.name}
              </footer>
            </motion.blockquote>
          ))
        )}
      </div>
    </SectionShell>
  );
}
