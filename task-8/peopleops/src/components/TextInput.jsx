import React from "react";

export default function TextInput({
  id,
  label,
  hint,
  error,
  prefix,
  suffix,
  ...props
}) {
  return (
    <label htmlFor={id} className="field">
      {label && <span className="field__label">{label}</span>}
      <span
        className={`field__control ${error ? "field__control--error" : ""}`}
      >
        {prefix && <span className="field__affix">{prefix}</span>}
        <input id={id} {...props} className="field__input" />
        {suffix && <span className="field__affix">{suffix}</span>}
      </span>
      {hint && !error && <small className="field__hint">{hint}</small>}
      {error && <small className="field__error">{error}</small>}
    </label>
  );
}

export function injectFieldStyles() {
  const css = `
  .field{display:flex;flex-direction:column;gap:6px}
  .field__label{font-size:12px;color:var(--muted)}
  .field__control{display:flex;align-items:center;background:var(--surface);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:8px 10px}
  .field__control--error{border-color: var(--danger)}
  .field__affix{color:var(--muted);font-size:12px}
  .field__input{flex:1;background:transparent;border:none;outline:none;padding:6px 8px;color:var(--text)}
  /* Native select tweaks for Windows/Edge */
  select.field__input{appearance:auto;-webkit-appearance:auto;-moz-appearance:auto;color:var(--text);background-color:var(--surface);color-scheme: dark}
  select.field__input option{color:#0f1115;background:#ffffff}
  .field__hint{color:var(--muted)}
  .field__error{color:var(--danger)}
  `;
  if (!document.getElementById("field-styles")) {
    const tag = document.createElement("style");
    tag.id = "field-styles";
    tag.textContent = css;
    document.head.appendChild(tag);
  }
}
