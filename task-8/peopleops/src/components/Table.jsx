import React from "react";

export default function Table({
  columns,
  rows,
  onSort,
  sortKey,
  sortDir,
  empty = "No data",
}) {
  return (
    <div className="table card">
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => col.sortable && onSort?.(col.key)}
                className={col.sortable ? "th--sortable" : ""}
              >
                <span>{col.header}</span>
                {col.sortable && sortKey === col.key && (
                  <span aria-hidden> {sortDir === "asc" ? "▲" : "▼"} </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="td--empty">
                {empty}
              </td>
            </tr>
          )}
          {rows.map((row, i) => (
            <tr key={row.id ?? i}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function injectTableStyles() {
  const css = `
  .table{padding:0;overflow:hidden}
  .table table{width:100%;border-collapse:collapse}
  th,td{padding:12px 14px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.06)}
  thead th{background:rgba(255,255,255,0.03);font-weight:600}
  .th--sortable{cursor:pointer}
  .td--empty{text-align:center;color:var(--muted)}
  tr:hover td{background:rgba(255,255,255,0.02)}
  `;
  if (!document.getElementById("table-styles")) {
    const tag = document.createElement("style");
    tag.id = "table-styles";
    tag.textContent = css;
    document.head.appendChild(tag);
  }
}
