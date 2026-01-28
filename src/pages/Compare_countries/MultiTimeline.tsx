// src/pages/Compare_countries/MultiTimeline.tsx
import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

/* ---------------------------------------------
   Country & Indicator Config
-----------------------------------------------*/
const COUNTRY_PAIRS = [
  { id: "in_cn", a: "India", b: "China", label: "India vs China" },
  { id: "us_uk", a: "United States", b: "United Kingdom", label: "US vs UK" },
  { id: "br_sa", a: "Brazil", b: "South Africa", label: "Brazil vs South Africa" },
];

const INDICATORS = [
  { id: "gini", label: "Gini Index" },
  { id: "palma", label: "Palma Ratio" },
  { id: "gdp", label: "GDP per Capita" },
];

/* ---------------------------------------------
   Dummy Data Generator
-----------------------------------------------*/
function makeTimelineData(pairId: string) {
  const years = Array.from({ length: 13 }, (_, i) => 2010 + i);

  return years.map((year, idx) => ({
    year,

    // Gini
    giniA: 30 + idx * 0.4 + (pairId === "in_cn" ? 3 : 0),
    giniB: 28 + idx * 0.5 + (pairId === "in_cn" ? 2 : 1),

    // Palma
    palmaA: 1 + Math.sin(idx / 2) * 0.2,
    palmaB: 0.9 + Math.cos(idx / 3) * 0.15,

    // GDP
    gdpA: 2000 + idx * 200 + (pairId === "us_uk" ? 500 : 0),
    gdpB: 1800 + idx * 180 + (pairId === "us_uk" ? 450 : 0),
  }));
}

/* ---------------------------------------------
   Component
-----------------------------------------------*/
export default function MultiTimeline() {
  const [pair, setPair] = useState(COUNTRY_PAIRS[0].id);
  const [active, setActive] = useState({
    gini: true,
    palma: true,
    gdp: true,
  });

  const data = useMemo(() => makeTimelineData(pair), [pair]);
  const pairInfo = COUNTRY_PAIRS.find((p) => p.id === pair)!;
  const selectedIndicators = Object.values(active).filter(Boolean).length;

  return (
    <div
      className="
      min-h-screen relative overflow-hidden px-6 py-10
      text-gray-200
      bg-gradient-to-br from-[#0d0821] via-[#1b0f3a] to-[#020617]
    "
    >
      {/* Neon Blobs */}
      <div className="absolute -top-40 -right-40 w-[550px] h-[550px] bg-fuchsia-600 opacity-40 blur-[160px] rounded-full"></div>
      <div className="absolute bottom-[-150px] left-[-150px] w-[550px] h-[550px] bg-blue-500 opacity-40 blur-[160px] rounded-full"></div>
      <div className="absolute top-[30%] left-[35%] w-[450px] h-[450px] bg-purple-500 opacity-20 blur-[200px] rounded-full"></div>

      <div className="relative z-10">
        <h1 className="text-4xl font-bold text-white mb-10 text-center">
          Multi-Indicator Timeline Comparison
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">

          {/* LEFT PANEL */}
          <div className="glass rounded-xl p-6 card-shadow text-white">
            <h2 className="text-2xl font-semibold mb-3">
              {pairInfo.a} vs {pairInfo.b}
            </h2>

            <p className="text-sm text-gray-300 mb-4">
              Toggle indicators from the sidebar to update the timeline.
            </p>

            {/* Chart Container */}
            <div className="bg-white/10 rounded-xl p-4 card-shadow" style={{ height: 380 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="year" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip />
                  <Legend />

                  {/* Gini */}
                  {active.gini && (
                    <>
                      <Line
                        dataKey="giniA"
                        name={`${pairInfo.a} – Gini`}
                        stroke="#60a5fa"
                        strokeWidth={3}
                        dot={false}
                      />
                      <Line
                        dataKey="giniB"
                        name={`${pairInfo.b} – Gini`}
                        stroke="#93c5fd"
                        strokeWidth={3}
                        dot={false}
                      />
                    </>
                  )}

                  {/* Palma */}
                  {active.palma && (
                    <>
                      <Line
                        dataKey="palmaA"
                        name={`${pairInfo.a} – Palma`}
                        stroke="#fb923c"
                        strokeWidth={3}
                        dot={false}
                      />
                      <Line
                        dataKey="palmaB"
                        name={`${pairInfo.b} – Palma`}
                        stroke="#fdba74"
                        strokeWidth={3}
                        dot={false}
                      />
                    </>
                  )}

                  {/* GDP */}
                  {active.gdp && (
                    <>
                      <Line
                        dataKey="gdpA"
                        name={`${pairInfo.a} – GDP`}
                        stroke="#34d399"
                        strokeWidth={3}
                        dot={false}
                      />
                      <Line
                        dataKey="gdpB"
                        name={`${pairInfo.b} – GDP`}
                        stroke="#6ee7b7"
                        strokeWidth={3}
                        dot={false}
                      />
                    </>
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* No Indicator Selected */}
            {selectedIndicators === 0 && (
              <p className="text-center text-sm text-gray-400 mt-3">
                Select at least one indicator to view the chart.
              </p>
            )}
          </div>

          {/* SIDE PANEL */}
          <aside className="glass rounded-xl p-6 card-shadow text-white space-y-6">
            {/* Country Dropdown */}
            <div>
              <label className="text-sm font-medium">Select Countries</label>
              <select
                value={pair}
                onChange={(e) => setPair(e.target.value)}
                className="w-full mt-2 bg-white/10 text-white px-3 py-2 rounded"
              >
                {COUNTRY_PAIRS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            <hr className="border-gray-600" />

            {/* Indicator Checkboxes */}
            <div>
              <h3 className="text-sm font-semibold mb-2">Indicators</h3>

              <div className="space-y-2">
                {INDICATORS.map((ind) => (
                  <label key={ind.id} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={active[ind.id as keyof typeof active]}
                      onChange={(e) =>
                        setActive({ ...active, [ind.id]: e.target.checked })
                      }
                    />
                    {ind.label}
                  </label>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
