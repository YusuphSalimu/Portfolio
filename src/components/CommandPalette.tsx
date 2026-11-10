"use client";

import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@/i18n/routing";
import type { ProjectEntry } from "@/lib/projects";

export default function CommandPalette({ projects }: { projects: ProjectEntry[] }) {
  const t = useTranslations("palette");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const sections = useMemo(
    () => [
      { label: t("about"), href: "#about" },
      { label: t("skills"), href: "#skills" },
      { label: t("projects"), href: "#projects" },
      { label: t("experience"), href: "#experience" },
      { label: t("contact"), href: "#contact" },
    ],
    [t],
  );
  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return [
      ...sections.map((entry) => ({ ...entry, key: entry.href })),
      ...projects.map((project) => ({
        label: project.title,
        href: `/projects/${project.slug}`,
        key: project.slug,
      })),
    ].filter((entry) => !normalizedQuery || entry.label.toLowerCase().includes(normalizedQuery));
  }, [projects, query, sections]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        setOpen(true);
      }
      if (event.key === "Escape" && open) setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      inputRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
      returnFocus.current?.focus();
      setQuery("");
    }
  }, [open]);

  return (
    <>
      <button className="palette-trigger" type="button" onClick={() => setOpen(true)}>
        <span aria-hidden="true">⌘K</span><span>{t("trigger")}</span>
      </button>
      <dialog
        className="command-dialog"
        ref={dialogRef}
        aria-label={t("title")}
        onCancel={(event) => {
          event.preventDefault();
          setOpen(false);
        }}
        onClick={(event) => {
          if (event.target === dialogRef.current) setOpen(false);
        }}
      >
        <label className="visually-hidden" htmlFor="command-search">{t("search")}</label>
        <input
          id="command-search"
          ref={inputRef}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t("search")}
        />
        <ul>
          {results.map((result) => (
            <li key={result.key}>
              {result.href.startsWith("#") ? (
                <a href={result.href} onClick={() => setOpen(false)}>{result.label}</a>
              ) : (
                <Link href={result.href} onClick={() => setOpen(false)}>{result.label}</Link>
              )}
            </li>
          ))}
          {results.length === 0 && <li className="palette-empty">{t("empty")}</li>}
        </ul>
      </dialog>
    </>
  );
}
