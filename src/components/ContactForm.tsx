"use client";

import { useState } from "react";

const projectTypes = [
  "Website",
  "Web platform",
  "Backend / SaaS",
  "Data / ML",
  "Other",
] as const;

export default function ContactForm() {
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    if (payload.website) {
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          projectType: payload.projectType,
          budget: payload.budget || "",
          message: payload.message,
          website: payload.website || "",
        }),
      });

      const result = (await response.json()) as { success?: boolean; error?: string };

      if (!response.ok || !result.success) {
        setStatus({
          type: "error",
          message: result.error || "Something went wrong while sending your message.",
        });
        return;
      }

      setStatus({
        type: "success",
        message: "Thank you. Your message has been queued for review.",
      });
      form.reset();
    } catch {
      setStatus({
        type: "error",
        message: "Something went wrong while sending your message.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-white/80">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 focus:border-violet-400 focus:outline-none"
            placeholder="Your name"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-white/80">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 focus:border-violet-400 focus:outline-none"
            placeholder="name@example.com"
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="projectType" className="text-sm font-medium text-white/80">
            Project type
          </label>
          <select
            id="projectType"
            name="projectType"
            defaultValue="Website"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-violet-400 focus:outline-none"
          >
            {projectTypes.map((type) => (
              <option key={type} value={type} className="bg-[#11111a] text-white">
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="budget" className="text-sm font-medium text-white/80">
            Budget range (optional)
          </label>
          <input
            id="budget"
            name="budget"
            type="text"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 focus:border-violet-400 focus:outline-none"
            placeholder="e.g. $2k – $5k"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-white/80">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={3000}
          rows={7}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 focus:border-violet-400 focus:outline-none"
          placeholder="Tell me about your project, timeline, and goals."
        />
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Leave this blank</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex items-center justify-between gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : "Send inquiry"}
        </button>
      </div>

      {status && (
        <p className={status.type === "success" ? "text-emerald-300" : "text-rose-300"}>
          {status.message}
        </p>
      )}
    </form>
  );
}
