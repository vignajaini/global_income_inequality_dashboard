// src/pages/Compare_countries/CompareMetrics.tsx

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
  BarChart,
  Bar,
} from "recharts";

type YearDatum = {
  year: string;
  a: number;
  b: number;
};

const DUMMY_PAIRS = [
  { id: "in_cn", label: "India vs China", a: "India", b: "China" },
  { id: "us_uk", label: "US vs UK", a: "United States", b: "United Kingdom" },
  { id: "br_sa", label: "Brazil vs South Africa", a: "Brazil", b: "South Africa" },
];

const INDICATORS = [
  { id: "gini", label: "Gini Index", unit: "" },
  { id: "palma", label: "Palma Ratio", unit: "" },
  { id: "gdp", label: "GDP per Capita (USD)", unit: "USD" },
];

function makeDummySeries(pairId: string, indicatorId: string): YearDatum[] {
  const years = Array.from({ length: 14 }, (_, i) => 2010 + i).map(String);
  const baseSeed =
    (pairId === "in_cn" ? 1 : pairId === "us_uk" ? 2 : 3) +
    (indicatorId === "gini" ? 0 : indicatorId === "palma" ? 0.5 : 3);

  return years.map((y, idx) => {
    const multiplierA = indicatorId === "gdp" ? 1000 : 1;
    const multiplierB = indicatorId === "gdp" ? 950 : 1;

    const a = Math.round(
      (baseSeed + Math.sin(idx / 2) * 0.7 + idx * 0.12) * multiplierA
    );
    const b = Math.round(
      (baseSeed + Math.cos(idx / 3) * 0.6 + idx * 0.08) * multiplierB
    );

    return { year: y, a, b };
  });
}

const CompareMetrics: React.FC = () => {
  const [pair, setPair] = useState(DUMMY_PAIRS[0].id);
  const [indicator, setIndicator] = useState(INDICATORS[0].id);
  const [chartType, setChartType] = useState<"line" | "bar">("line");

  const pairMeta = DUMMY_PAIRS.find((p) => p.id === pair)!;
  const indicatorMeta = INDICATORS.find((i) => i.id === indicator)!;

  const series = useMemo(() => makeDummySeries(pair, indicator), [pair, indicator]);

  const kpiA = useMemo(
    () => Math.round(series.reduce((s, r) => s + r.a, 0) / series.length),
    [series]
  );
  const kpiB = useMemo(
    () => Math.round(series.reduce((s, r) => s + r.b, 0) / series.length),
    [series]
  );

  return (
    <div
      className="
        min-h-screen relative overflow-hidden
        text-gray-200 px-6 py-10
        bg-gradient-to-br from-[#0d0821] via-[#1b0f3a] to-[#020617]
      "
    >
      {/* Neon Blobs */}
      <div className="absolute -top-40 -right-40 w-[550px] h-[550px] bg-fuchsia-600 opacity-40 blur-[160px] rounded-full"></div>
      <div className="absolute bottom-[-150px] left-[-150px] w-[550px] h-[550px] bg-blue-500 opacity-40 blur-[160px] rounded-full"></div>
      <div className="absolute top-[30%] left-[35%] w-[450px] h-[450px] bg-purple-500 opacity-20 blur-[200px] rounded-full"></div>

      <div className="relative z-10">
        <h1 className="text-4xl font-bold text-white mb-10 text-center">
          Compare Inequality Metrics — Countries
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_330px] gap-8">
          {/* MAIN PANEL */}
          <div className="glass rounded-xl p-6 card-shadow text-white">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold">Side-by-Side Comparison</h2>
                <p className="text-sm text-gray-300 mt-1">
                  Comparing <strong>{pairMeta.a}</strong> and{" "}
                  <strong>{pairMeta.b}</strong> —{" "}
                  <strong>{indicatorMeta.label}</strong>
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setChartType("line")}
                  className={`px-3 py-1 rounded ${
                    chartType === "line"
                      ? "bg-purple-600 text-white"
                      : "bg-white/10"
                  }`}
                >
                  Line
                </button>

                <button
                  onClick={() => setChartType("bar")}
                  className={`px-3 py-1 rounded ${
                    chartType === "bar"
                      ? "bg-purple-600 text-white"
                      : "bg-white/10"
                  }`}
                >
                  Bar
                </button>
              </div>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="glass rounded-lg p-4 card-shadow text-center">
                <div className="text-sm text-gray-300">
                  Avg ({pairMeta.a})
                </div>
                <div className="text-2xl font-bold text-blue-300">
                  {kpiA.toLocaleString()} {indicatorMeta.unit}
                </div>
              </div>

              <div className="glass rounded-lg p-4 card-shadow text-center">
                <div className="text-sm text-gray-300">
                  Avg ({pairMeta.b})
                </div>
                <div className="text-2xl font-bold text-pink-300">
                  {kpiB.toLocaleString()} {indicatorMeta.unit}
                </div>
              </div>
            </div>

            {/* Chart Section */}
            <div
              style={{ height: 340 }}
              className="bg-white/10 rounded-xl p-4 card-shadow"
            >
              <ResponsiveContainer>
                {chartType === "line" ? (
                  <LineChart data={series}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="year" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="a"
                      name={pairMeta.a}
                      stroke="#60a5fa"
                      strokeWidth={3}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="b"
                      name={pairMeta.b}
                      stroke="#f472b6"
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                ) : (
                  <BarChart data={series}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="year" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="a" name={pairMeta.a} fill="#60a5fa" />
                    <Bar dataKey="b" name={pairMeta.b} fill="#f472b6" />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="glass rounded-xl p-6 card-shadow text-white space-y-6">
            {/* Country Select */}
            <div>
              <label className="text-sm font-medium">Select Countries</label>
              <select
                value={pair}
                onChange={(e) => setPair(e.target.value)}
                className="w-full bg-white/10 text-white p-2 rounded mt-1"
              >
                {DUMMY_PAIRS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Indicator Select */}
            <div>
              <label className="text-sm font-medium">Select Indicator</label>
              <select
                value={indicator}
                onChange={(e) => setIndicator(e.target.value)}
                className="w-full bg-white/10 text-white p-2 rounded mt-1"
              >
                {INDICATORS.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() =>
                setChartType(chartType === "line" ? "bar" : "line")
              }
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded mt-4"
            >
              Toggle Chart Type
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CompareMetrics;
