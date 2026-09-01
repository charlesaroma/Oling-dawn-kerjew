import { useId } from 'react';

/* Underline field with a floating label — deliberately different from the
   filled fields on the public contact form. That form has five inputs in a
   grid and needs clear boxes; this screen has two, and the lighter treatment
   suits a focused single-purpose page. */
export default function FloatingInput({ id, label, type = 'text', value, onChange, error, autoComplete, required, rightSlot }) {
  const autoId = useId();
  const inputId = id || autoId;
  const filled = Boolean(value);

  return (
    <div className="relative pt-5">
      <label
        htmlFor={inputId}
        className={`pointer-events-none absolute left-0 font-mono uppercase transition-all duration-200 ${
          filled
            ? 'top-0 text-[10px] tracking-[0.16em] text-ink-500'
            : 'top-[1.85rem] text-[11px] tracking-[0.12em] text-ink-400'
        }`}
      >
        {label}
      </label>
      <div className="flex items-center">
        <input
          id={inputId}
          name={inputId}
          type={type}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full border-b bg-transparent px-0 py-3 text-[15px] text-ink-800 outline-none transition-colors duration-200 ${
            error ? 'border-error' : 'border-ink-900/15 focus:border-gold-500'
          } ${rightSlot ? 'pr-9' : ''}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
        />
        {rightSlot && <span className="absolute right-0 flex items-center">{rightSlot}</span>}
      </div>
      {error && (
        <p id={`${inputId}-error`} className="mt-2 text-xs text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
