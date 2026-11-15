"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

type Option = { value: string; label: string };

export default function FormSelect({ name, label, placeholder, options, value, onChange, required = false }: {
  name: string; label: string; placeholder: string; options: Option[];
  value: string; onChange: (value: string) => void; required?: boolean;
}) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const search = useRef({ text: "", time: 0 });
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [error, setError] = useState("");
  const selected = options.findIndex((option) => option.value === value);
  function choose(index: number) {
    onChange(options[index].value);
    setError("");
    setOpen(false);
  }
  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);
  useEffect(() => {
    if (open) document.getElementById(`${id}-option-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active, open, id]);

  return <div className="form-select" ref={root} onBlur={(event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
  }}>
    <label id={`${id}-label`} htmlFor={id}>{label}</label>
    <select className="form-select__native" name={name} value={value} required={required} tabIndex={-1} aria-hidden="true"
      onChange={(event) => onChange(event.target.value)} onInvalid={(event) => {
        event.preventDefault(); setError(event.currentTarget.validationMessage); trigger.current?.focus();
      }}>
      <option value="">{placeholder}</option>
      {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
    <button ref={trigger} id={id} className="form-select__trigger" type="button" role="combobox"
      aria-labelledby={`${id}-label`} aria-expanded={open} aria-controls={`${id}-options`} aria-haspopup="listbox"
      aria-required={required} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined}
      aria-activedescendant={open ? `${id}-option-${active}` : undefined}
      onClick={() => { setActive(Math.max(0, selected)); setOpen(!open); }}
      onKeyDown={(event) => {
        if (event.key === "Tab") { setOpen(false); return; }
        if (event.key === "Escape") { event.preventDefault(); setOpen(false); return; }
        if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
          event.preventDefault(); setOpen(true);
          setActive(event.key === "Home" ? 0 : event.key === "End" ? options.length - 1 : !open ? Math.max(0, selected) : (active + (event.key === "ArrowDown" ? 1 : -1) + options.length) % options.length);
        } else if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          if (open) choose(active); else { setActive(Math.max(0, selected)); setOpen(true); }
        } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
          event.preventDefault();
          const now = Date.now();
          search.current = { text: (now - search.current.time < 700 ? search.current.text : "") + event.key.toLocaleLowerCase(), time: now };
          const index = options.findIndex((option) => option.label.toLocaleLowerCase().startsWith(search.current.text));
          if (index >= 0) { setOpen(true); setActive(index); }
        }
      }}>
      <span>{selected >= 0 ? options[selected].label : placeholder}</span><ChevronDown aria-hidden="true" />
    </button>
    <ul id={`${id}-options`} className="form-select__options" role="listbox" aria-labelledby={`${id}-label`} hidden={!open}>
      {options.map((option, index) => <li key={option.value} id={`${id}-option-${index}`} role="option"
        aria-selected={value === option.value} data-active={active === index}
        onPointerMove={() => setActive(index)} onMouseDown={(event) => event.preventDefault()} onClick={() => choose(index)}>
        <span>{option.label}</span>{value === option.value && <Check aria-hidden="true" />}
      </li>)}
    </ul>
    {error && <p className="form-select__error" id={`${id}-error`} role="alert">{error}</p>}
  </div>;
}
