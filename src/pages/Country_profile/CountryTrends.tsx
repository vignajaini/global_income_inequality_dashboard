import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

/* ----------------------------------------------
   TYPES
---------------------------------------------- */
type TrendMetric =
  | "gini"
  | "palma"
  | "gdp"
  | "poverty"
  | "growth_index";

interface TrendPoint {
  year: number;
  gini: number;
  palma: number;
  gdp: number;
  poverty: number;
  growth_index: number;
}

/* ----------------------------------------------
   MOCK API (Replace with backend)
---------------------------------------------- */
async function fetchCountryTrends(countryCode: string): Promise<TrendPoint[]> {
  await new Promise((r) => setTimeout(r, 300));

  const rand = (base: number, variance: number) =>
    +(base + (Math.random() * variance - variance / 2)).toFixed(2);

  const years = Array.from({ length: 15 }, (_, i) => 2009 + i);

  return years.map((y) => ({
    year: y,
    gini: rand(30, 10),
    palma: rand(1.5, 1.2),
    gdp: rand(2000, 20000),
    poverty: rand(5, 12),
    growth_index: rand(60, 20),
  }));
}

/* ----------------------------------------------
   OPTIONS
---------------------------------------------- */
const COUNTRIES = [
  { code: "IND", name: "India" },
  { code: "USA", name: "United States" },
  { code: "CHN", name: "China" },
  { code: "BRA", name: "Brazil" },
  { code: "ZAF", name: "South Africa" },
];

const METRICS: Record<
  TrendMetric,
  { label: string; color: string }
> = {
  gini: { label: "Gini Index", color: "#818cf8" },
  palma: { label: "Palma Ratio", color: "#f472b6" },
  gdp: { label: "GDP per Capita (USD)", color: "#4ade80" },
  poverty: { label: "Poverty Rate (%)", color: "#a78bfa" },
  growth_index: { label: "Inequality Growth Index", color: "#fbbf24" },
};

/* ----------------------------------------------
   COMPONENT
---------------------------------------------- */
export default function CountryTrends() {
  const [country, setCountry] = useState("IND");
  const [metric, setMetric] = useState<TrendMetric>("gini");

  const { data, isLoading } = useQuery<TrendPoint[]>({
    queryKey: ["country-trends", country],
    queryFn: () => fetchCountryTrends(country),
    staleTime: 5 * 60 * 1000,
  });

  const selected = METRICS[metric];

  const insight =
    data &&
    (() => {
      const values = data.map((d) => d[metric]);
      const max = Math.max(...values);
      const min = Math.min(...values);
      const start = values[0];
      const end = values[values.length - 1];

      return {
        maxYear: data[values.indexOf(max)].year,
        minYear: data[values.indexOf(min)].year,
        change: +(end - start).toFixed(2),
        trend: end > start ? "Increasing" : "Decreasing",
      };
    })();

  return (
    <div
      className="
      min-h-screen relative overflow-hidden 
      px-6 pt-28 pb-20 
      bg-gradient-to-br from-[#1a0b2e] via-[#230f45] to-[#0d1b3d]
      text-gray-200
    "
    >
      {/* Glowing Background Blobs */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-purple-600 opacity-40 blur-[160px]" />
      <div className="absolute bottom-[-200px] left-[-150px] w-[600px] h-[600px] rounded-full bg-blue-500 opacity-40 blur-[160px]" />
      <div className="absolute top-[40%] left-[25%] w-[450px] h-[450px] rounded-full bg-pink-500 opacity-30 blur-[200px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-10 text-center text-white">
          Country Trends — Advanced Analytics
        </h2>

        {/* =====================================
            FILTER PANEL
        ===================================== */}
        <div className="glass bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div>
            <label className="font-semibold text-white">Select Country</label>
            <select
              className="w-full mt-3 p-3 rounded bg-white/20 text-white border border-white/20"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code} className="text-black">
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold text-white">Select Indicator</label>
            <select
              className="w-full mt-3 p-3 rounded bg-white/20 text-white border border-white/20"
              value={metric}
              onChange={(e) => setMetric(e.target.value as TrendMetric)}
            >
              {Object.entries(METRICS).map(([key, m]) => (
                <option key={key} value={key} className="text-black">
                  {m.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* =====================================
            KPI INSIGHTS
        ===================================== */}
        {insight && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="glass bg-white/10 border border-white/10 rounded-xl p-6">
              <div className="text-gray-300 text-sm">Trend</div>
              <div className="text-2xl font-bold text-white mt-2">
                {insight.trend}
              </div>
            </div>

            <div className="glass bg-white/10 border border-white/10 rounded-xl p-6">
              <div className="text-gray-300 text-sm">Peak Year</div>
              <div className="text-2xl font-bold text-white mt-2">
                {insight.maxYear}
              </div>
            </div>

            <div className="glass bg-white/10 border border-white/10 rounded-xl p-6">
              <div className="text-gray-300 text-sm">Change (2009–2024)</div>
              <div className="text-2xl font-bold text-white mt-2">
                {insight.change}
              </div>
            </div>
          </div>
        )}

        {/* =====================================
            MAIN CHART
        ===================================== */}
        <div className="glass bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-white">
            {selected.label}
          </h3>

          <div style={{ width: "100%", height: 380 }}>
            {isLoading ? (
              <div className="flex items-center justify-center h-full text-white">
                Loading chart...
              </div>
            ) : (
              <ResponsiveContainer>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis dataKey="year" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip />
                  <Legend />

                  <defs>
                    <linearGradient id="metricGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={selected.color} stopOpacity={0.8} />
                      <stop offset="95%" stopColor={selected.color} stopOpacity={0.1} />
                    </linearGradient>
                  </defs>

                  <Line
                    type="monotone"
                    dataKey={metric}
                    stroke={selected.color}
                    strokeWidth={3}
                    fill="url(#metricGradient)"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
