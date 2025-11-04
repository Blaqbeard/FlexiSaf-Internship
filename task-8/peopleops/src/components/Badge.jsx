import React from "react";

export default function Badge({ tone = "neutral", children }) {
  const tones = {
    neutral: { bg: "rgba(255,255,255,0.08)", fg: "var(--text)" },
    success: { bg: "rgba(93,211,158,0.20)", fg: "#b7f3d8" },
    warning: { bg: "rgba(247,178,103,0.25)", fg: "#ffd7aa" },
    danger: { bg: "rgba(255,107,107,0.25)", fg: "#ffb3b3" },
    info: { bg: "rgba(110,168,254,0.25)", fg: "#cfe2ff" },
  };
  const style = tones[tone] || tones.neutral;
  return (
    <span className="badge" style={{ background: style.bg, color: style.fg }}>
      {children}
    </span>
  );
}

export function injectBadgeStyles() {
  const css = `.badge{display:inline-flex;align-items:center;padding:4px 8px;border-radius:999px;font-size:12px}`;
  if (!document.getElementById("badge-styles")) {
    const tag = document.createElement("style");
    tag.id = "badge-styles";
    tag.textContent = css;
    document.head.appendChild(tag);
  }
}
