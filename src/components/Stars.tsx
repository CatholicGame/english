// Read-only star display shared by the reviews summary card, review list
// items, and anywhere else a rating needs showing. Supports fractional
// values (e.g. an average of 4.3) via a width-clipped overlay star per
// position, rather than only whole/half increments.

export function Stars({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex" style={{ fontSize: size, lineHeight: 1 }} aria-label={`${value.toFixed(1)}/5 sao`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.max(0, Math.min(1, value - (i - 1)));
        return (
          <span key={i} className="relative inline-block" style={{ width: "1em" }}>
            <span style={{ color: "var(--color-divider)" }}>★</span>
            {fill > 0 && (
              <span
                className="absolute left-0 top-0 overflow-hidden whitespace-nowrap"
                style={{ width: `${fill * 100}%`, color: "var(--color-accent)" }}
              >
                ★
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}
