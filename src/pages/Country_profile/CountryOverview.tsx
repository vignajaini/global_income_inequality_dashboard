import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

/* ------------------------------------
   TYPES
------------------------------------ */
type MetricKey = "gini" | "palma" | "gdp_per_capita";

type TimePoint = {
  year: number;
  gini: number;
  palma: number;
  gdp_per_capita: number;
};

type CountryData = {
  countryCode: string;
  countryName: string;
  series: TimePoint[];
  latest: {
    year: number;
    gini: number;
    palma: number;
    gdp_per_capita: number;
  };
};

/* ------------------------------------
   MOCK FETCH — Replace later with API
------------------------------------ */
async function fetchCountryData(countryCode: string): Promise<CountryData> {
  await new Promise((r) => setTimeout(r, 300));

  const years = Array.from({ length: 27 }, (_, i) => 1995 + i);
  const rand = (min: number, max: number) =>
    +(Math.random() * (max - min) + min).toFixed(2);

  const series = years.map((y) => ({
    year: y,
    gini: rand(25, 55),
    palma: rand(0.8, 3.5),
    gdp_per_capita: +rand(1000, 60000),
  }));

  const latest = series[series.length - 1];

  return {
    countryCode,
    countryName:
      countryCode === "IND"
        ? "India"
        : countryCode === "USA"
        ? "United States"
        : countryCode === "CHN"
        ? "China"
        : "Country",
    series,
    latest,
  };
}

/* ------------------------------------
   STATIC LISTS
------------------------------------ */
const COUNTRIES = [
  { code: "IND", label: "India" },
  { code: "USA", label: "United States" },
  { code: "CHN", label: "China" },
  { code: "BRA", label: "Brazil" },
];

const METRICS: { key: MetricKey; label: string }[] = [
  { key: "gini", label: "Gini Index" },
  { key: "palma", label: "Palma Ratio" },
  { key: "gdp_per_capita", label: "GDP per Capita (USD)" },
];

/* ------------------------------------
   COMPONENT
------------------------------------ */
export default function CountryOverview() {
  const [country, setCountry] = useState("IND");
  const [metric, setMetric] = useState<MetricKey>("gini");
  const [range, setRange] = useState<[number, number]>([1995, 2021]);

  const { data, isLoading, error } = useQuery<CountryData>({
    queryKey: ["country", country],
    queryFn: () => fetchCountryData(country),
    staleTime: 1000 * 60 * 5,
  });

  /* Filtered data */
  const chartData = useMemo(() => {
    if (!data) return [];
    return data.series.filter(
      (d) => d.year >= range[0] && d.year <= range[1]
    );
  }, [data, range]);

  const metricLabel = METRICS.find((m) => m.key === metric)?.label ?? "-";
  const kpiValue = data
    ? metric === "gdp_per_capita"
      ? data.latest.gdp_per_capita.toLocaleString()
      : (data.latest as any)[metric]
    : "--";

  return (
    <div
      className="
      min-h-screen relative overflow-hidden text-gray-200
      bg-gradient-to-br from-[#1a0b2e] via-[#230f45] to-[#0d1b3d]
      px-6 pt-28 pb-20
    "
    >
      {/* Glowing blobs */}
      <div className="absolute -top-40 -right-40 w-[550px] h-[550px] rounded-full 
                      bg-purple-600 opacity-40 blur-[160px]" />
      <div className="absolute bottom-[-150px] left-[-150px] w-[550px] h-[550px] rounded-full 
                      bg-blue-500 opacity-40 blur-[160px]" />
      <div className="absolute top-[35%] left-[30%] w-[450px] h-[450px] rounded-full 
                      bg-pink-500 opacity-20 blur-[200px]" />

      {/* HEADER */}
      <h2 className="text-4xl font-bold text-center text-white mb-10 relative z-10">
        Country Overview
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto relative z-10">
        {/* LEFT SIDEBAR */}
        <div className="glass bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-6">
          <label className="font-semibold text-white">Select Country</label>
          <select
            className="w-full mt-2 mb-5 p-2 rounded bg-white/20 text-white border border-white/20"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code} className="text-black">
                {c.label}
              </option>
            ))}
          </select>

          <label className="font-semibold text-white">Select Metric</label>
          <select
            className="w-full mt-2 mb-5 p-2 rounded bg-white/20 text-white border border-white/20"
            value={metric}
            onChange={(e) => setMetric(e.target.value as MetricKey)}
          >
            {METRICS.map((m) => (
              <option key={m.key} value={m.key} className="text-black">
                {m.label}
              </option>
            ))}
          </select>

          {/* YEAR RANGE */}
          <label className="font-semibold text-white">Year Range</label>
          <div className="flex items-center gap-2 mt-3 text-white">
            <span>{range[0]}</span>
            <input
              type="range"
              min={1995}
              max={2021}
              value={range[0]}
              onChange={(e) => setRange([Number(e.target.value), range[1]])}
            />
            <input
              type="range"
              min={1995}
              max={2021}
              value={range[1]}
              onChange={(e) => setRange([range[0], Number(e.target.value)])}
            />
            <span>{range[1]}</span>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="col-span-3 space-y-8">
          {/* KPI CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="glass bg-white/10 border border-white/10 backdrop-blur-xl rounded-xl p-6">
              <div className="text-sm text-gray-300">Country</div>
              <div className="text-2xl font-bold text-white">
                {data?.countryName ?? "--"}
              </div>
            </div>

            <div className="glass bg-white/10 border border-white/10 backdrop-blur-xl rounded-xl p-6">
              <div className="text-sm text-gray-300">Metric</div>
              <div className="text-lg font-semibold text-white">{metricLabel}</div>
              <div className="text-2xl mt-2 text-purple-300">{kpiValue}</div>
            </div>

            <div className="glass bg-white/10 border border-white/10 backdrop-blur-xl rounded-xl p-6">
              <div className="text-sm text-gray-300">Change</div>
              <div className="text-xl font-semibold text-cyan-300">
                {data
                  ? (() => {
                      const start = data.series[0][metric];
                      const end = data.latest[metric];
                      const pct = ((end - start) / start) * 100;
                      return `${pct > 0 ? "+" : ""}${pct.toFixed(1)}%`;
                    })()
                  : "--"}
              </div>
            </div>
          </div>

          {/* CHART */}
          <div className="glass bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Trend — {metricLabel}
            </h3>

            <div style={{ height: 350 }}>
              {isLoading ? (
                <div className="flex items-center justify-center h-full text-white">Loading...</div>
              ) : error ? (
                <div className="text-red-400">Failed to load.</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff30" />
                    <XAxis dataKey="year" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <Tooltip />
                    <Legend />
                    <Line
                      dataKey={metric}
                      stroke="#a78bfa"
                      strokeWidth={2}
                      dot={false}
                      name={metricLabel}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
