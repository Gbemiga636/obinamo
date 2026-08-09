"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { easeSmooth } from "@/lib/motion";

export function GuestDetailsForm() {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("saving");
    setMessage("");

    try {
      const res = await fetch("/api/obinasom/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          surname,
          phone,
          email,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("done");
      setMessage("Thank you — your details are safely with us.");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  if (status === "done") {
    return (
      <motion.div
        className="mt-10 w-full max-w-md rounded-sm border border-soft-gold/35 bg-paper/80 px-5 py-8 text-center shadow-[var(--shadow-md)]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easeSmooth }}
      >
        <p className="font-display text-sm font-bold uppercase tracking-[0.22em] text-cognac">
          You&apos;re on the list
        </p>
        <p className="mt-3 font-serif text-sm text-ink-soft/75">{message}</p>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={onSubmit}
      className="mt-10 w-full max-w-md space-y-4 rounded-sm border border-soft-gold/35 bg-paper/85 px-5 py-7 text-left shadow-[var(--shadow-md)] sm:px-7"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.25, ease: easeSmooth }}
    >
      <div className="text-center">
        <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-cognac">
          Stay connected
        </p>
        <p className="mt-2 font-serif text-sm text-ink-soft/70">
          Share your details so we can keep you close to every update.
        </p>
      </div>

      <label className="block">
        <span className="type-eyebrow text-[10px] text-dusty-blue">
          First name
        </span>
        <input
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="mt-1.5 w-full border border-[var(--line)] bg-ivory/80 px-3 py-2.5 font-serif text-sm text-ink outline-none transition focus:border-soft-gold"
          autoComplete="given-name"
        />
      </label>

      <label className="block">
        <span className="type-eyebrow text-[10px] text-dusty-blue">Surname</span>
        <input
          required
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          className="mt-1.5 w-full border border-[var(--line)] bg-ivory/80 px-3 py-2.5 font-serif text-sm text-ink outline-none transition focus:border-soft-gold"
          autoComplete="family-name"
        />
      </label>

      <label className="block">
        <span className="type-eyebrow text-[10px] text-dusty-blue">
          Phone number
        </span>
        <input
          required
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1.5 w-full border border-[var(--line)] bg-ivory/80 px-3 py-2.5 font-serif text-sm text-ink outline-none transition focus:border-soft-gold"
          autoComplete="tel"
        />
      </label>

      <label className="block">
        <span className="type-eyebrow text-[10px] text-dusty-blue">
          Email address
        </span>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1.5 w-full border border-[var(--line)] bg-ivory/80 px-3 py-2.5 font-serif text-sm text-ink outline-none transition focus:border-soft-gold"
          autoComplete="email"
        />
      </label>

      {status === "error" ? (
        <p className="font-serif text-sm text-cognac">{message}</p>
      ) : null}

      <button
        type="submit"
        disabled={status === "saving"}
        className="btn-primary w-full disabled:opacity-60"
      >
        {status === "saving" ? "Saving…" : "Save my details"}
      </button>
    </motion.form>
  );
}
