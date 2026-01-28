import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

/* -------------------------------------------
   TYPES
------------------------------------------- */
type MetricKey = "gini" | "palma" | "gdp_per_capita";

type CountryStats = {
  countryName: string;
  gini: number;
  palma: number;
  gdp_per_capita: number;
};

type RegionData = {
  countries: CountryStats[];
};

/* -------------------------------------------
   MOCK API (Replace with backend later)
------------------------------------------- */
async function fetchRegionComparison(selected: string[]): Promise<RegionData> {
  await new Promise((r) => setTimeout(r, 300));

  const rand = (min: number, max: number) =>
    +(Math.random() * (max - min) + min).toFixed(2);

  const names: Record<string, string> = {
    IND: "India",
    USA: "United States",
    CHN: "China",
    BRA: "Brazil",
    ZAF: "South Africa",
    MEX: "Mexico",
  };

  return {
    countries: selected.map((code) => ({
      countryName: names[code],
      gini: rand(25, 55),
      palma: rand(0.8, 3.5),
      gdp_per_capita: rand(1500, 60000),
    })),
  };
}

/* -------------------------------------------
   SELECT OPTIONS
------------------------------------------- */
const ALL_COUNTRIES = [
  { code: "IND", label: "India" },
  { code: "USA", label: "United States" },
  { code: "CHN", label: "China" },
  { code: "BRA", label: "Brazil" },
  { code: "ZAF", label: "South Africa" },
  { code: "MEX", label: "Mexico" },
];

const METRICS: { key: MetricKey; label: string }[] = [
  { key: "gini", label: "Gini Index" },
  { key: "palma", label: "Palma Ratio" },
  { key: "gdp_per_capita", label: "GDP Per Capita (USD)" },
];

/* -------------------------------------------
   COMPONENT
------------------------------------------- */
export default function RegionalComparison() {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([
    "IND",
    "CHN",
    "USA",
  ]);
  const [metric, setMetric] = useState<MetricKey>("gini");

  const { data, isLoading, error } = useQuery<RegionData>({
    queryKey: ["region-comparison", selectedCountries],
    queryFn: () => fetchRegionComparison(selectedCountries),
    staleTime: 1000 * 60 * 5,
  });

  const radarData =
    METRICS.map((m) => ({
      metric: m.label,
      ...Object.fromEntries(
        data?.countries.map((c) => [c.countryName, c[m.key]]) ?? []
      ),
    })) ?? [];

  return (
    <div
      className="
      min-h-screen relative overflow-hidden text-gray-200
      bg-gradient-to-br from-[#1a0b2e] via-[#230f45] to-[#0d1b3d]
      px-6 pt-28 pb-20
    "
    >
      {/* Background Blobs */}
      <div className="absolute -top-40 -right-40 w-[580px] h-[580px] rounded-full bg-purple-600 opacity-40 blur-[160px]" />
      <div className="absolute bottom-[-200px] left-[-150px] w-[580px] h-[580px] rounded-full bg-blue-500 opacity-40 blur-[160px]" />
      <div className="absolute top-[40%] left-[25%] w-[430px] h-[430px] rounded-full bg-pink-500 opacity-25 blur-[200px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10 text-white">
          Regional Comparison
        </h2>

        {/* ======================================
            FILTER PANEL
        ====================================== */}
        <div className="glass bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-6 mb-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Country Selector */}
          <div>
            <label className="font-semibold text-white">Select Countries</label>
            <select
              multiple
              className="w-full mt-3 p-3 rounded bg-white/20 text-white border border-white/20 h-44"
              value={selectedCountries}
              onChange={(e) => {
                const opts = Array.from(e.target.selectedOptions);
                setSelectedCountries(opts.map((o) => o.value));
              }}
            >
              {ALL_COUNTRIES.map((c) => (
                <option key={c.code} value={c.code} className="text-black">
                  {c.label}
                </option>
              ))}
            </select>
            <p className="text-gray-300 text-sm mt-2">
              Hold CTRL to select multiple
            </p>
          </div>

          {/* Metric Selector */}
          <div>
            <label className="font-semibold text-white">Compare Metric</label>
            <select
              className="w-full mt-3 p-3 rounded bg-white/20 text-white border border-white/20"
              value={metric}
              onChange={(e) => setMetric(e.target.value as MetricKey)}
            >
              {METRICS.map((m) => (
                <option key={m.key} value={m.key} className="text-black">
                  {m.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ======================================
            KPI CARDS
        ====================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {data?.countries.map((c) => (
            <div
              key={c.countryName}
              className="glass bg-white/10 border border-white/10 backdrop-blur-xl rounded-xl p-6"
            >
              <div className="text-gray-300 text-sm">{c.countryName}</div>
              <div className="text-2xl font-bold text-white mt-2">
                {metric === "gdp_per_capita"
                  ? c.gdp_per_capita.toLocaleString()
                  : c[metric]}
              </div>
              <div className="text-gray-300 text-sm mt-1">
                {METRICS.find((m) => m.key === metric)?.label}
              </div>
            </div>
          ))}
        </div>

        {/* ======================================
            BAR CHART
        ====================================== */}
        <div className="glass bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-6 mb-10">
          <h3 className="text-xl font-semibold text-white mb-4">
            {METRICS.find((m) => m.key === metric)?.label} Comparison
          </h3>

          <div style={{ width: "100%", height: 350 }}>
            {isLoading ? (
              <div className="flex items-center justify-center h-full text-white">Loading...</div>
            ) : error ? (
              <div className="text-red-400">Failed to load.</div>
            ) : (
              <ResponsiveContainer>
                <BarChart data={data?.countries}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis dataKey="countryName" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey={metric}
                    fill="#a78bfa"
                    name={METRICS.find((m) => m.key === metric)?.label}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* ======================================
            RADAR CHART
        ====================================== */}
        <div className="glass bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            Full Metric Radar Comparison
          </h3>

          <div style={{ width: "100%", height: 420 }}>
            {isLoading ? (
              <div className="flex items-center justify-center h-full text-white">Loading...</div>
            ) : (
              <ResponsiveContainer>
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" stroke="white" />
                  <PolarRadiusAxis stroke="white" />
                  {data?.countries.map((c, idx) => (
                    <Radar
                      key={c.countryName}
                      name={c.countryName}
                      dataKey={c.countryName}
                      stroke={["#a78bfa", "#38bdf8", "#f472b6", "#c084fc"][idx % 4]}
                      fill={["#a78bfa55", "#38bdf855", "#f472b655", "#c084fc55"][idx % 4]}
                      fillOpacity={0.6}
                    />
                  ))}
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
