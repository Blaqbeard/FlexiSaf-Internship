import React, { useRef, useEffect } from "react";

export default function Checkbox({
  id,
  label,
  indeterminate = false,
  ...props
}) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);
  return (
    <label className="checkbox">
      <input ref={ref} id={id} type="checkbox" {...props} />
      <span>{label}</span>
    </label>
  );
}

export function injectCheckboxStyles() {
  const css = `
  .checkbox{display:inline-flex;align-items:center;gap:8px;cursor:pointer}
  .checkbox input{width:16px;height:16px;border-radius:4px}
  `;
  if (!document.getElementById("checkbox-styles")) {
    const tag = document.createElement("style");
    tag.id = "checkbox-styles";
    tag.textContent = css;
    document.head.appendChild(tag);
  }
}
