export function AdminTable({
  columns,
  rows,
  emptyLabel,
}: {
  columns: string[];
  rows: (string | number)[][];
  emptyLabel: string;
}) {
  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-border-soft bg-white p-8 text-center text-sm text-ink-soft">
        {emptyLabel}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border-soft bg-white">
      <table className="w-full text-left text-[13px]">
        <thead className="border-b border-border-soft text-[11px] uppercase tracking-wide text-ink-soft">
          <tr>
            {columns.map((c) => (
              <th key={c} className="px-4 py-3">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border-soft last:border-none">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-ink">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
