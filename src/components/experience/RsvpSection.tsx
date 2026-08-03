"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { SectionShell } from "@/components/layout/SectionShell";
import { wedding } from "@/lib/wedding";

type Attendance = "yes" | "no" | "maybe" | "";

export function RsvpSection() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [guests, setGuests] = useState("1");
  const [attendance, setAttendance] = useState<Attendance>("");
  const [allergies, setAllergies] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !attendance) return;
    const payload = {
      name,
      email,
      guests,
      attendance,
      allergies,
      message,
      at: new Date().toISOString(),
    };
    const prev = JSON.parse(localStorage.getItem("obinamo-rsvps") || "[]") as unknown[];
    localStorage.setItem("obinamo-rsvps", JSON.stringify([...prev, payload]));
    setSent(true);
  };

  return (
    <SectionShell
      id="rsvp"
      tone="paper"
      title="RSVP"
      subtitle={`Kindly reply by ${wedding.rsvpDeadline}`}
      narrow
    >
      {sent ? (
        <motion.div
          className="panel px-8 py-14 text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="type-script text-5xl text-cognac">Thank you</p>
          <p className="type-body mx-auto mt-4 max-w-sm">
            Your response has been received. We can&apos;t wait to celebrate with you.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={submit} className="space-y-4 text-left" noValidate>
          <label className="block">
            <span className="type-eyebrow mb-2 block text-[10px] text-dusty-blue">
              Full name
            </span>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="field-input"
              placeholder="Your name"
              autoComplete="name"
            />
          </label>
          <label className="block">
            <span className="type-eyebrow mb-2 block text-[10px] text-dusty-blue">
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="field-input"
              placeholder="you@email.com"
              autoComplete="email"
            />
          </label>

          <fieldset>
            <legend className="type-eyebrow mb-2 block text-[10px] text-dusty-blue">
              Will you attend?
            </legend>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  ["yes", "Joyfully Yes"],
                  ["no", "Regretfully No"],
                  ["maybe", "Tentative"],
                ] as const
              ).map(([val, label]) => (
                <button
                  key={val}
                  type="button"
                  aria-pressed={attendance === val}
                  onClick={() => setAttendance(val)}
                  className={`min-h-12 border px-2 py-3 text-center font-serif text-sm transition ${
                    attendance === val
                      ? "border-soft-gold bg-cognac text-ivory"
                      : "border-[var(--line)] bg-paper text-ink hover:border-[var(--line-strong)]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="block">
            <span className="type-eyebrow mb-2 block text-[10px] text-dusty-blue">
              Number of guests
            </span>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="field-input"
            >
              {["1", "2", "3", "4", "5"].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="type-eyebrow mb-2 block text-[10px] text-dusty-blue">
              Allergies / dietary notes
            </span>
            <input
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              className="field-input"
              placeholder="Optional"
            />
          </label>

          <label className="block">
            <span className="type-eyebrow mb-2 block text-[10px] text-dusty-blue">
              A note for the couple
            </span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="field-input min-h-[96px] resize-y"
              placeholder="Optional well wishes"
            />
          </label>

          <button type="submit" className="btn-primary mt-2 w-full">
            Send RSVP
          </button>
        </form>
      )}
    </SectionShell>
  );
}
