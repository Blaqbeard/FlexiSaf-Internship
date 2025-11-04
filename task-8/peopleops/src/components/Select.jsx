import React from "react";

export default function Select({ id, label, options = [], ...props }) {
  return (
    <label className="field">
      {label && <span className="field__label">{label}</span>}
      <span className="field__control">
        <select id={id} {...props} className="field__input">
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </span>
    </label>
  );
}
