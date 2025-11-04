import React from "react";

export default function Form({ onSubmit, children, gap = 12 }) {
  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const obj = Object.fromEntries(data.entries());
    onSubmit?.(obj, e);
  }
  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap }}>
      {children}
    </form>
  );
}
