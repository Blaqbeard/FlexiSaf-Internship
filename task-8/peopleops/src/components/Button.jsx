import React from "react";

const VARIANT_TO_CLASS = {
  primary: "btn btn--primary",
  secondary: "btn btn--secondary",
  ghost: "btn btn--ghost",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  onClick,
  type = "button",
  className = "",
}) {
  const classes = [
    VARIANT_TO_CLASS[variant] || VARIANT_TO_CLASS.primary,
    `btn--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? "…" : children}
    </button>
  );
}

export function injectButtonStyles() {
  const css = `
  .btn{border:1px solid transparent;background:var(--surface-2);padding:10px 14px;border-radius:10px;cursor:pointer;transition:.2s ease;display:inline-flex;align-items:center;gap:8px}
  .btn--md{font-size:14px}
  .btn--sm{font-size:12px;padding:8px 12px;border-radius:8px}
  .btn--lg{font-size:16px;padding:12px 16px;border-radius:12px}
  .btn--primary{background:linear-gradient(180deg,var(--primary),var(--primary-600));color:#0f1115;border-color:transparent}
  .btn--primary:hover{filter:brightness(1.05)}
  .btn--secondary{background:var(--surface);border-color:rgba(255,255,255,0.08)}
  .btn--secondary:hover{background:var(--surface-2)}
  .btn--ghost{background:transparent;border-color:rgba(255,255,255,0.16)}
  .btn:disabled{opacity:.6;cursor:not-allowed}
  `;
  if (!document.getElementById("btn-styles")) {
    const tag = document.createElement("style");
    tag.id = "btn-styles";
    tag.textContent = css;
    document.head.appendChild(tag);
  }
}
