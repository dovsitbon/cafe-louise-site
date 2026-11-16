"use client";

import { useEffect, useId, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import site from "@/data/site.json";
import { useLocale } from "@/components/providers";
import { CheckIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { formatDay, formatTime, isoDay, num } from "@/lib/format";
import { addDays, bookingTimes } from "@/lib/hours";
import { fill } from "@/lib/text";
import { waHref } from "@/lib/wa";
import type { Dict, Locale } from "@/lib/i18n";

// Les deux formulaires du site : réservation d'une table, anniversaire ou petit groupe.
// Rien n'est envoyé à un serveur : le formulaire prépare un récapitulatif bien présenté, dans la langue du visiteur,
// et ouvre WhatsApp vers le portable du café (data/site.json → whatsapp). Le café confirme en répondant.
// Paiement en ligne (acompte, par exemple) prévu mais désactivé : data/site.json → payment.enabled, app/api/paiement.

type Errors = Record<string, string>;
const isPhone = (v: string) => /^[+\d][\d\s\-().]{7,19}$/.test(v.trim());

function useNow() {
  // L'heure du navigateur n'est connue qu'après hydratation : les listes d'heures se remplissent à ce moment-là
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- horloge du navigateur
    setNow(new Date());
  }, []);
  return now;
}

function Field({ label, error, optional, hint, children, className = "", id: forced }: { id?: string; label: string; error?: string; optional?: string; hint?: string; children: (p: { id: string; "aria-invalid"?: true; "aria-describedby"?: string }) => ReactNode; className?: string }) {
  const auto = useId();
  const id = forced ?? auto;
  const describedBy = [error && `${id}-e`, hint && `${id}-h`].filter(Boolean).join(" ") || undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="label">
        {label}
        {optional && <span className="font-normal text-muted"> ({optional})</span>}
      </label>
      {children({ id, ...(error ? { "aria-invalid": true as const } : {}), ...(describedBy ? { "aria-describedby": describedBy } : {}) })}
      {hint && !error && (
        <p id={`${id}-h`} className="mt-1.5 text-[0.875rem] text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-e`} className="mt-1.5 text-[0.875rem] text-red">
          {error}
        </p>
      )}
    </div>
  );
}

const longDay = (iso: string, lang: Locale) => formatDay(iso, lang, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
const colon = (lang: Locale) => (lang === "fr" ? " :" : ":");

/** Récapitulatif WhatsApp : titre, lignes « *Libellé :* valeur », contact, message, remerciement. */
function waText(lang: Locale, title: string, rows: [string, string][], contact: [string, string][], message: [string, string] | null, thanks: string) {
  const c = colon(lang);
  const line = ([k, v]: [string, string]) => `*${k}${c}* ${v}`;
  return [title, rows.map(line).join("\n"), contact.map(line).join("\n"), message && message[1].trim() ? `*${message[0]}${c}*\n${message[1].trim()}` : "", thanks].filter(Boolean).join("\n\n");
}

/** Écran de fin : WhatsApp s'est ouvert avec le texte ; boutons pour le rouvrir, le copier ou recommencer. */
function Done({ text, onReset }: { text: string; onReset: () => void }) {
  const { d } = useLocale();
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => ref.current?.scrollIntoView({ block: "center" }), []);
  return (
    <div ref={ref} className="fade-in scroll-mt-28" role="status">
      <p className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-water-soft text-night">
          <CheckIcon className="h-5 w-5" />
        </span>
        <span className="display text-[1.5rem]">{d.form.sentTitle}</span>
      </p>
      <p className="mt-3 text-muted">{d.form.sentText}</p>
      <pre className="mt-5 max-h-72 overflow-auto rounded-[3px] border border-line bg-cream p-4 font-[family-name:var(--font-body)] text-[0.9375rem] leading-relaxed whitespace-pre-wrap">{text.replace(/\*/g, "")}</pre>
      <div className="mt-5 flex flex-wrap gap-3">
        <a href={waHref(text)} target="_blank" rel="noopener noreferrer" className="btn">
          <WhatsAppIcon className="h-5 w-5" />
          {d.form.openAgain}
        </a>
        <button
          type="button"
          className="btn-line"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(text.replace(/\*/g, ""));
              setCopied(true);
            } catch {}
          }}
        >
          {copied ? d.form.copied : d.form.copy}
        </button>
        <button type="button" className="inline-flex min-h-11 items-center px-2 underline underline-offset-4" onClick={onReset}>
          {d.form.newRequest}
        </button>
      </div>
    </div>
  );
}

function Submit({ label }: { label: string }) {
  const { d } = useLocale();
  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <button type="submit" className="btn">
          <WhatsAppIcon className="h-5 w-5" />
          {label}
        </button>
        <a href={`tel:${site.phoneIntl}`} className="inline-flex min-h-11 items-center gap-2 text-[0.9375rem] hover:underline">
          <PhoneIcon className="h-4 w-4" />
          {d.form.orCall} <span className="tabular-nums">{site.phone}</span>
        </a>
      </div>
      <p className="mt-3 text-[0.875rem] text-muted">{d.form.sendHint}</p>
      <p className="mt-1 text-[0.875rem] text-muted">{d.form.privacy}</p>
    </div>
  );
}

function open(text: string) {
  window.open(waHref(text), "_blank", "noopener,noreferrer");
}

function contactErrors(v: { name: string; phone: string }, e: Errors, d: Dict) {
  if (!v.name.trim()) e.name = d.form.errors.name;
  if (!isPhone(v.phone)) e.phone = d.form.errors.phone;
}

const OCCASIONS = ["none", "breakfast", "birthday", "couple", "family", "friends", "other"] as const;
type Occasion = (typeof OCCASIONS)[number];

/** Réservation : date, heure, nombre de personnes, occasion, nom, téléphone, message → WhatsApp. */
export function BookingForm() {
  const { lang, d } = useLocale();
  const now = useNow();
  const [v, setV] = useState({ date: "", time: "", guests: "2", occasion: "none" as Occasion, name: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState<string | null>(null);
  const set = (k: keyof typeof v, val: string) => setV((p) => ({ ...p, [k]: val, ...(k === "date" ? { time: "" } : {}) }));

  const today = now ? isoDay(now) : "";
  const times = useMemo(() => (now && v.date ? bookingTimes(v.date, now) : []), [now, v.date]);
  const max = site.booking.maxGuests;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const err: Errors = {};
    if (!v.date) err.date = d.form.errors.date;
    if (!v.time || !times.includes(v.time)) err.time = d.form.errors.time;
    if (!(Number(v.guests) >= 1)) err.guests = d.form.errors.guests;
    contactErrors(v, err, d);
    setErrors(err);
    if (Object.keys(err).length) {
      document.getElementById(`booking-${Object.keys(err)[0]}`)?.focus();
      return;
    }
    const w = d.booking.wa;
    const text = waText(
      lang,
      w.title,
      [
        [w.date, longDay(v.date, lang)],
        [w.time, formatTime(v.time, lang)],
        [w.guests, num(Number(v.guests), lang)],
        ...(v.occasion !== "none" ? ([[w.occasion, d.form.occasions[v.occasion]]] as [string, string][]) : []),
      ],
      [
        [w.name, v.name.trim()],
        [w.phone, v.phone.trim()],
      ],
      [w.message, v.message],
      w.thanks,
    );
    setDone(text);
    open(text);
  };

  if (done) return <Done text={done} onReset={() => setDone(null)} />;

  const dateNote = v.date && now && !times.length ? (v.date === today ? d.form.tooLate : d.form.noTime) : undefined;

  return (
    <form onSubmit={submit} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-3">
        <Field id="booking-date" label={d.form.date} error={errors.date}>
          {(p) => <input {...p} className="field" type="date" required min={today || undefined} max={today ? addDays(today, site.booking.daysAhead) : undefined} value={v.date} onChange={(e) => set("date", e.target.value)} />}
        </Field>
        <Field id="booking-time" label={d.form.time} error={errors.time} hint={dateNote}>
          {(p) => (
            <select {...p} className="field" required value={v.time} onChange={(e) => set("time", e.target.value)} disabled={!times.length}>
              <option value="">{d.form.chooseTime}</option>
              {times.map((t) => (
                <option key={t} value={t}>
                  {formatTime(t, lang)}
                </option>
              ))}
            </select>
          )}
        </Field>
        <Field id="booking-guests" label={d.form.guests} error={errors.guests} hint={fill(d.form.maxGuests, { n: num(max, lang) })}>
          {(p) => (
            <select {...p} className="field" value={v.guests} onChange={(e) => set("guests", e.target.value)}>
              {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {num(n, lang)}
                </option>
              ))}
            </select>
          )}
        </Field>
      </div>
      <fieldset>
        <legend className="label">{d.form.occasion}</legend>
        <div className="flex flex-wrap gap-2">
          {OCCASIONS.map((o) => (
            <label key={o} className="chip">
              <input type="radio" name="occasion" value={o} checked={v.occasion === o} onChange={() => set("occasion", o)} className="sr-only" />
              {d.form.occasions[o]}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="booking-name" label={d.form.name} error={errors.name}>
          {(p) => <input {...p} className="field" name="name" autoComplete="name" required value={v.name} onChange={(e) => set("name", e.target.value)} />}
        </Field>
        <Field id="booking-phone" label={d.form.phone} error={errors.phone}>
          {(p) => <input {...p} className="field" name="tel" type="tel" inputMode="tel" autoComplete="tel" required value={v.phone} onChange={(e) => set("phone", e.target.value)} />}
        </Field>
      </div>
      <Field label={d.form.message} optional={d.form.optional}>
        {(p) => <textarea {...p} className="field" name="message" rows={3} placeholder={d.form.messagePh} value={v.message} onChange={(e) => set("message", e.target.value)} />}
      </Field>
      <Submit label={d.form.send} />
    </form>
  );
}

const CAKES = ["none", "fruits", "chocolat", "macarons", "advice"] as const;
type CakeKind = (typeof CAKES)[number];

/** Anniversaire ou petit groupe : date, nombre de personnes, gâteau souhaité, nom, téléphone, message → WhatsApp. */
export function PartyForm() {
  const { lang, d } = useLocale();
  const now = useNow();
  const [v, setV] = useState({ date: "", guests: "", cake: "fruits" as CakeKind, name: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState<string | null>(null);
  const set = (k: keyof typeof v, val: string) => setV((p) => ({ ...p, [k]: val }));
  const today = now ? isoDay(now) : "";
  const { minGuests, maxGuests, daysAhead } = site.party;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const err: Errors = {};
    if (!v.date || (today && v.date < today)) err.date = d.form.errors.date;
    const g = Math.round(Number(v.guests));
    if (!(g >= 1 && g <= 200)) err.guests = d.form.errors.guests;
    contactErrors(v, err, d);
    setErrors(err);
    if (Object.keys(err).length) {
      document.getElementById(`party-${Object.keys(err)[0]}`)?.focus();
      return;
    }
    const w = d.partyForm.wa;
    const text = waText(
      lang,
      w.title,
      [
        [w.date, longDay(v.date, lang)],
        [w.guests, num(g, lang)],
        [w.cake, d.form.cakes[v.cake]],
      ],
      [
        [w.name, v.name.trim()],
        [w.phone, v.phone.trim()],
      ],
      [w.message, v.message],
      w.thanks,
    );
    setDone(text);
    open(text);
  };

  if (done) return <Done text={done} onReset={() => setDone(null)} />;

  return (
    <form onSubmit={submit} noValidate className="grid gap-5">
      <h3 className="display text-[1.5rem]">{d.partyForm.title}</h3>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="party-date" label={d.form.date} error={errors.date}>
          {(p) => <input {...p} className="field" type="date" required min={today || undefined} max={today ? addDays(today, daysAhead) : undefined} value={v.date} onChange={(e) => set("date", e.target.value)} />}
        </Field>
        <Field id="party-guests" label={d.form.guests} error={errors.guests}>
          {(p) => <input {...p} className="field" type="number" inputMode="numeric" min={minGuests} max={maxGuests} required placeholder={`${num(minGuests, lang)} – ${num(maxGuests, lang)}`} value={v.guests} onChange={(e) => set("guests", e.target.value)} />}
        </Field>
      </div>
      <fieldset>
        <legend className="label">{d.form.cake}</legend>
        <div className="flex flex-wrap gap-2">
          {CAKES.map((c) => (
            <label key={c} className="chip">
              <input type="radio" name="cake" value={c} checked={v.cake === c} onChange={() => set("cake", c)} className="sr-only" />
              {d.form.cakes[c]}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="party-name" label={d.form.name} error={errors.name}>
          {(p) => <input {...p} className="field" name="name" autoComplete="name" required value={v.name} onChange={(e) => set("name", e.target.value)} />}
        </Field>
        <Field id="party-phone" label={d.form.phone} error={errors.phone}>
          {(p) => <input {...p} className="field" name="tel" type="tel" inputMode="tel" autoComplete="tel" required value={v.phone} onChange={(e) => set("phone", e.target.value)} />}
        </Field>
      </div>
      <Field label={d.form.message} optional={d.form.optional}>
        {(p) => <textarea {...p} className="field" name="message" rows={3} placeholder={d.form.partyPh} value={v.message} onChange={(e) => set("message", e.target.value)} />}
      </Field>
      <Submit label={d.form.send} />
    </form>
  );
}
