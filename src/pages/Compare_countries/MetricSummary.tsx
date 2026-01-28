import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

// --------------------------------------------
// CONFIG
// --------------------------------------------
const COUNTRY_PAIRS = [
  { id: "in_cn", a: "India", b: "China", label: "India vs China" },
];

const INDICATORS = [
  { id: "gini", label: "Gini Index", better: "lower" },
  { id: "palma", label: "Palma Ratio", better: "lower" },
  { id: "gdp", label: "GDP per Capita", better: "higher" },
];

// Dummy trend generator
function trendData(seed: number) {
  return Array.from({ length: 8 }, (_, i) => ({
    idx: i,
    val: Math.round(seed + Math.sin(i / 2) * 3 + i * 1.2),
  }));
}

// --------------------------------------------
// COMPONENT
// --------------------------------------------
export default function MetricSummary() {

  const pair = COUNTRY_PAIRS[0];

  // Dummy KPI values
  const kpis = useMemo(
    () => ({
      gini: {
        a: 35,
        b: 30,
        trendA: trendData(32),
        trendB: trendData(28),
      },
      palma: {
        a: 1.2,
        b: 1.05,
        trendA: trendData(1.1 * 20),
        trendB: trendData(0.98 * 20),
      },
      gdp: {
        a: 2200,
        b: 9000,
        trendA: trendData(2100 / 50),
        trendB: trendData(8500 / 50),
      },
    }),
    []
  );

  return (
    <div
      className="
        min-h-screen relative overflow-hidden text-gray-200 
        bg-gradient-to-br from-[#1a0b2e] via-[#230f45] to-[#0d1b3d]
        px-6 pt-28 pb-20
      "
    >

      {/* ---- Glowing Background Blobs ---- */}
      <div className="absolute -top-40 -right-40 w-[550px] h-[550px] rounded-full 
                      bg-purple-600 opacity-40 blur-[160px] pointer-events-none" />

      <div className="absolute bottom-[-150px] left-[-150px] w-[550px] h-[550px] rounded-full 
                      bg-blue-500 opacity-40 blur-[160px] pointer-events-none" />

      <div className="absolute top-[35%] left-[30%] w-[450px] h-[450px] rounded-full 
                      bg-pink-500 opacity-25 blur-[200px] pointer-events-none" />

      {/* ---- PAGE HEADER ---- */}
      <h1 className="text-4xl font-bold text-center text-white mb-6">
        Metric Summary
      </h1>

      <p className="text-lg text-gray-300 text-center max-w-2xl mx-auto mb-10">
        Quick comparison overview between <strong>{pair.a}</strong> and{" "}
        <strong>{pair.b}</strong>.
      </p>

      {/* ---- KPI GRID ---- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">

        {INDICATORS.map((ind) => {
          const item = kpis[ind.id as keyof typeof kpis];

          return (
            <div
              key={ind.id}
              className="
                glass rounded-2xl p-6 shadow-xl bg-white/10 border border-white/10 
                backdrop-blur-xl
              "
            >
              <h2 className="text-xl font-semibold text-white mb-4">
                {ind.label}
              </h2>

              {/* KPI VALUES */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-sm text-gray-300">{pair.a}</div>
                  <div className="text-2xl font-bold text-purple-300">{item.a}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-300">{pair.b}</div>
                  <div className="text-2xl font-bold text-blue-300">{item.b}</div>
                </div>
              </div>

              {/* RANK LABEL */}
              <div className="mb-4">
                {ind.better === "lower" ? (
                  item.a < item.b ? (
                    <span className="text-green-400 text-sm font-medium">
                      ✓ {pair.a} performs better
                    </span>
                  ) : (
                    <span className="text-blue-400 text-sm font-medium">
                      ✓ {pair.b} performs better
                    </span>
                  )
                ) : item.a > item.b ? (
                  <span className="text-green-400 text-sm font-medium">
                    ✓ {pair.a} performs better
                  </span>
                ) : (
                  <span className="text-blue-400 text-sm font-medium">
                    ✓ {pair.b} performs better
                  </span>
                )}
              </div>

              {/* Mini Trend Chart */}
              <div className="bg-black/20 rounded-xl p-2" style={{ height: 90 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={item.trendA}>
                    <Line
                      type="monotone"
                      dataKey="val"
                      stroke="#a78bfa"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          );
        })}
      </div>

      {/* ---- SUMMARY NOTES ---- */}
      <div
        className="
          max-w-4xl mx-auto mt-16 glass bg-white/10 rounded-2xl p-8 border border-white/10 
          backdrop-blur-xl relative z-10
        "
      >
        <h2 className="text-2xl font-semibold text-white mb-4">
          Summary Insights
        </h2>

        <ul className="text-gray-300 text-sm leading-relaxed space-y-2">
          <li>• <strong>{pair.b}</strong> shows stronger GDP growth over the period.</li>
          <li>• <strong>{pair.a}</strong> has improved poverty-related metrics steadily.</li>
          <li>• Both countries show gradual improvement in Palma Ratio.</li>
          <li>• Convergence trend visible in inequality indices between both countries.</li>
        </ul>
      </div>
    </div>
  );
}
