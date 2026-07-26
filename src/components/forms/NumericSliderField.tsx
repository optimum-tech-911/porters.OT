import { useId, useState } from 'react';

type Props = {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  /** Display formatting for the field and the value read-out. */
  format: (value: number) => string;
  /** Bound captions under the slider, already formatted. */
  minLabel: string;
  maxLabel: string;
  ariaLabel: string;
  onChange: (value: number) => void;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/**
 * Tolerant parsing, on French conventions: spaces (including the narrow and
 * non-breaking ones Intl emits) and dots group thousands, a comma is the decimal
 * separator. So "9 900 €", "9900", "9.900" and "18 j" all read as intended.
 * Each field steps in whole units, so any decimal is rounded away on commit.
 * Returns null when there is no number to read.
 */
function parseAmount(raw: string): number | null {
  const cleaned = raw
    .replace(/\s/g, '')
    .replace(/[\u20ac$\u00a3]/g, '')
    .replace(/[a-zA-Z]/g, '')
    .replace(/\./g, '')
    .replace(',', '.');
  if (!cleaned || !/[0-9]/.test(cleaned)) return null;
  const parsed = Number.parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
}

/**
 * A value that can be driven either by its slider or by typing into it, kept in
 * sync both ways. Out-of-range entries are clamped on commit rather than
 * rejected, and the field says what it did.
 */
export default function NumericSliderField({
  id, label, value, min, max, step, format, minLabel, maxLabel, ariaLabel, onChange,
}: Props) {
  // While the field has focus it holds the raw text, so typing is never fought
  // by reformatting mid-entry. null means "show the formatted value".
  const [draft, setDraft] = useState<string | null>(null);
  const [notice, setNotice] = useState('');
  const noticeId = `${useId()}-notice`;

  function commit() {
    const parsed = draft === null ? null : parseAmount(draft);
    setDraft(null);

    if (parsed === null) {
      setNotice('');
      return;
    }

    const next = clamp(Math.round(parsed / step) * step, min, max);
    if (parsed > max) setNotice(`Valeur ajustée au maximum de ${format(max)}`);
    else if (parsed < min) setNotice(`Valeur ajustée au minimum de ${format(min)}`);
    else setNotice('');
    onChange(next);
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-4">
        <label htmlFor={id} className="form-label mb-0">
          {label}
        </label>
        <input
          id={`${id}-value`}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          aria-label={ariaLabel}
          aria-describedby={notice ? noticeId : undefined}
          className="w-32 shrink-0 rounded-md border border-porters-navy/15 bg-white px-3 py-1.5 text-right font-heading text-xl font-bold text-porters-navy outline-none transition-colors focus:border-porters-gold focus:ring-2 focus:ring-porters-gold/20"
          value={draft ?? format(value)}
          onChange={(event) => {
            const raw = event.target.value;
            setDraft(raw);
            // Recalculate as the user types, without a validate step.
            const parsed = parseAmount(raw);
            if (parsed !== null) onChange(clamp(parsed, min, max));
          }}
          onFocus={() => setDraft(String(value))}
          onBlur={commit}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              event.currentTarget.blur();
            }
          }}
        />
      </div>
      <input
        type="range"
        id={id}
        className="sim-range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => {
          setDraft(null);
          setNotice('');
          onChange(Number(event.target.value));
        }}
      />
      <div className="mt-2 flex justify-between text-xs text-porters-black/45">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
      {notice && (
        <p id={noticeId} role="status" aria-live="polite" className="mt-2 text-xs font-medium text-porters-navy/70">
          {notice}
        </p>
      )}
    </div>
  );
}
