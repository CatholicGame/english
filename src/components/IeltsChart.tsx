// Renders the IELTS Writing Task 1 chart data (src/data/cambridge-vocabulary-ielts.ts
// `WritingChart`) as an actual bar chart instead of a wall of raw percentage
// text — a learner describing "the chart below" should be able to see it.
//
// Built per the dataviz skill: part-to-whole data is a 100%-stacked horizontal
// bar (never a pie), independent per-series measures are grouped bars, and
// series colors are the skill's validated categorical order (first 4 slots,
// which clear every adjacent-pair CVD/contrast check on this app's light
// surface — see palette validation run during authoring). Segments/bars carry
// a visible value label wherever there's room (the contrast check against this
// surface came back WARN for slots 2-4, so relief — a visible label — isn't
// optional here) plus a native `title` tooltip with the exact figure.

import type { ChartPanel, WritingChart } from "@/data/cambridge-vocabulary-ielts";

const SERIES_COLORS = ["#2a78d6", "#eb6834", "#1baf7a", "#eda100"];

// Below this share of a stacked bar, inline text would be clipped or
// illegible — skip the inline label and let the legend + title tooltip carry
// the value instead, per "never clip a label" in the dataviz skill.
const MIN_INLINE_LABEL_PCT = 8;

function Legend({ series }: { series: ChartPanel["series"] }) {
  if (series.length < 2) return null;
  return (
    <div className="mb-2 flex flex-wrap gap-x-3 gap-y-1">
      {series.map((s, i) => (
        <span key={s.key} className="flex items-center gap-1.5 text-[16px] text-neutral-600">
          <span
            className="h-2.5 w-2.5 flex-none rounded-full"
            style={{ background: SERIES_COLORS[i % SERIES_COLORS.length] }}
          />
          {s.label}
        </span>
      ))}
    </div>
  );
}

function StackedBarPanel({ panel }: { panel: ChartPanel }) {
  return (
    <div>
      {panel.title && <div className="label-xs mb-1.5 text-accent">{panel.title}</div>}
      <Legend series={panel.series} />
      <div className="flex flex-col gap-2.5">
        {panel.groups.map((g) => {
          const total = panel.series.reduce((sum, s) => sum + (g.values[s.key] ?? 0), 0) || 1;
          return (
            <div key={g.label}>
              <div className="mb-1 text-[16px] font-bold text-neutral-700">{g.label}</div>
              <div className="flex h-5 gap-[2px]">
                {panel.series.map((s, i) => {
                  const v = g.values[s.key] ?? 0;
                  const pct = (v / total) * 100;
                  if (pct <= 0) return null;
                  return (
                    <div
                      key={s.key}
                      className="flex items-center justify-center overflow-hidden first:rounded-l-[4px] last:rounded-r-[4px]"
                      style={{ width: `${pct}%`, background: SERIES_COLORS[i % SERIES_COLORS.length] }}
                      title={`${s.label}: ${v}%`}
                    >
                      {pct >= MIN_INLINE_LABEL_PCT && (
                        <span className="text-[16px] font-bold text-white">{v}%</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function GroupedBarPanel({ panel }: { panel: ChartPanel }) {
  return (
    <div>
      {panel.title && <div className="label-xs mb-1.5 text-accent">{panel.title}</div>}
      <Legend series={panel.series} />
      <div className="flex flex-col gap-3">
        {panel.groups.map((g) => (
          <div key={g.label}>
            <div className="mb-1 text-[16px] font-bold text-neutral-700">{g.label}</div>
            <div className="flex flex-col gap-[3px]">
              {panel.series.map((s, i) => {
                const v = g.values[s.key] ?? 0;
                return (
                  <div key={s.key} className="flex items-center gap-1.5" title={`${s.label}: ${v}%`}>
                    <div className="h-3 flex-1 bg-[color:var(--color-neutral-200)]">
                      <div
                        className="h-full rounded-r-[4px]"
                        style={{ width: `${Math.min(100, v)}%`, background: SERIES_COLORS[i % SERIES_COLORS.length] }}
                      />
                    </div>
                    <span className="w-9 flex-none text-right text-[16px] tabular-nums text-neutral-600">{v}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WritingChartView({ chart }: { chart: WritingChart }) {
  const Panel = chart.kind === "stackedBar" ? StackedBarPanel : GroupedBarPanel;
  return (
    <div className="flex flex-col gap-4">
      {chart.panels.map((panel, i) => (
        <Panel key={panel.title ?? i} panel={panel} />
      ))}
    </div>
  );
}
