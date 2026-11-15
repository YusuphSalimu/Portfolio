"use client";

import { useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";
import FormSelect from "./FormSelect";

type FormStatus = { type: "success" | "error"; message: string } | null;

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<FormStatus>(null);
  const [submitting, setSubmitting] = useState(false);
  const [projectType, setProjectType] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setSubmitting(true);
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json() as { message?: string };
      setStatus({
        type: response.ok ? "success" : "error",
        message: result.message ?? t("error"),
      });
      if (response.ok) { form.reset(); setProjectType(""); }
    } catch {
      setStatus({ type: "error", message: t("error") });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="contact-form glass-surface" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          {t("name")}
          <input name="name" autoComplete="name" required maxLength={120} />
        </label>
        <label>
          {t("email")}
          <input name="email" type="email" autoComplete="email" required maxLength={254} />
        </label>
        <FormSelect name="projectType" label={t("projectType")} placeholder={t("chooseType")} required
          value={projectType} onChange={setProjectType}
          options={(["website", "platform", "backend", "data", "other"] as const).map((value) => ({ value, label: t(`types.${value}`) }))} />
        <label>
          {t("budget")}
          <input name="budget" maxLength={120} />
        </label>
      </div>
      <label>
        {t("message")}
        <textarea name="message" rows={6} required maxLength={3000} />
      </label>
      <label className="honeypot" aria-hidden="true">
        Leave this field empty
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <button className="button button--primary" type="submit" disabled={submitting}>
        {submitting ? t("sending") : t("send")}
      </button>
      {status && (
        <p className={`form-status form-status--${status.type}`} role="status" aria-live="polite">
          {status.message}
          {status.type === "error" && <> <a href="mailto:yusuphsaalim@gmail.com">yusuphsaalim@gmail.com</a></>}
        </p>
      )}
    </form>
  );
}
