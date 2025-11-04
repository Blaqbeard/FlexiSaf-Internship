import React, { useEffect } from "react";

export default function Modal({ open, title, onClose, children, footer }) {
  useEffect(() => {
    function onEsc(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="modal" role="dialog" aria-modal="true">
      <div className="modal__backdrop" onClick={onClose} />
      <div className="modal__content card">
        <header className="modal__header row">
          <h3 className="modal__title">{title}</h3>
          <span className="spacer"></span>
          <button className="btn btn--ghost btn--sm" onClick={onClose}>
            Close
          </button>
        </header>
        <div className="modal__body">{children}</div>
        {footer && <footer className="modal__footer row">{footer}</footer>}
      </div>
    </div>
  );
}

export function injectModalStyles() {
  const css = `
  .modal{position:fixed;inset:0;display:grid;place-items:center;z-index:50}
  .modal__backdrop{position:absolute;inset:0;background:rgba(7,10,14,.6);backdrop-filter: blur(3px)}
  .modal__content{position:relative;width:min(720px,92%);padding:18px}
  .modal__header{padding:6px 4px 12px 4px}
  .modal__title{margin:0}
  .modal__body{padding:4px 2px 12px 2px}
  .modal__footer{padding-top:12px}
  `;
  if (!document.getElementById("modal-styles")) {
    const tag = document.createElement("style");
    tag.id = "modal-styles";
    tag.textContent = css;
    document.head.appendChild(tag);
  }
}
