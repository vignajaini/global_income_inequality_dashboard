import { useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { TrendingUp } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from "recharts";

/* ----------------------------------------------------------
   TYPES
---------------------------------------------------------- */
type MobilityPoint = {
  year: number;
  igm: number;
  upwardChance: number;
  inequality: number;
};

type RegionOption = "Global" | "Asia" | "Europe" | "Africa" | "Latin America";

/* ----------------------------------------------------------
   MOCK DATA
---------------------------------------------------------- */
function generateMockMobility(region: RegionOption): MobilityPoint[] {
  const base = {
    Global: 0.47,
    Asia: 0.42,
    Europe: 0.54,
    Africa: 0.36,
    "Latin America": 0.40,
  }[region];

  const startYear = 2000;
  return Array.from({ length: 24 }, (_, i) => {
    const year = startYear + i;
    const igm = +(base + Math.sin(i / 4) * 0.02 + i * 0.001).toFixed(3);
    const upwardChance = +((igm - 0.25) * 90 + Math.sin(i) * 2).toFixed(1);
    const inequality = +(45 - igm * 20 + Math.cos(i / 3) * 2).toFixed(1);
    return { year, igm, upwardChance, inequality };
  });
}

/* ----------------------------------------------------------
   SMOOTHING
---------------------------------------------------------- */
function smoothSeries(series: MobilityPoint[], window = 3) {
  return series.map((p, idx) => {
    const start = Math.max(0, idx - window);
    const end = Math.min(series.length - 1, idx + window);
    const sliced = series.slice(start, end + 1);
    const avgIGM = sliced.reduce((sum, s) => sum + s.igm, 0) / sliced.length;

    return { ...p, igm: +avgIGM.toFixed(3) };
  });
}

/* ----------------------------------------------------------
   COMPONENT
---------------------------------------------------------- */
export default function MobilityTimeline() {
  const [region, setRegion] = useState<RegionOption>("Asia");
  const [enableSmooth, setEnableSmooth] = useState(false);

  const rawData = useMemo(() => generateMockMobility(region), [region]);
  const data = useMemo(
    () => (enableSmooth ? smoothSeries(rawData) : rawData),
    [rawData, enableSmooth]
  );

  const latest = data[data.length - 1];

  return (
    <div
      className="
        min-h-screen relative overflow-hidden text-gray-200
        bg-gradient-to-br from-[#1a0b2e] via-[#230f45] to-[#0d1b3d]
      "
    >
      {/* ⭐ Neon background blobs */}
      <div className="absolute -top-40 -right-40 w-[550px] h-[550px] rounded-full bg-purple-600 opacity-40 blur-[160px]" />
      <div className="absolute bottom-[-150px] left-[-150px] w-[550px] h-[550px] rounded-full bg-blue-500 opacity-40 blur-[160px]" />
      <div className="absolute top-[35%] left-[30%] w-[450px] h-[450px] rounded-full bg-pink-500 opacity-25 blur-[200px]" />

      <Navbar />

      <div className="pt-28 pb-20 px-4 relative z-10">
        <div className="container mx-auto max-w-7xl">

          {/* Header */}
          <div className="text-center mb-14">
            <div className="inline-block p-3 rounded-full bg-white/10 backdrop-blur mb-4">
              <TrendingUp className="text-purple-300" size={32} />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Mobility Timeline
            </h1>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Track long-term mobility indicators and understand how inequality affects social movement.
            </p>
          </div>

          {/* Controls */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">

            <div className="glass p-6 rounded-2xl card-shadow">
              <h3 className="font-semibold text-white mb-2">Select Region</h3>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value as RegionOption)}
                className="
                  w-full mt-2 p-3 rounded-lg bg-white/10
                  text-white border border-white/20
                  focus:ring-2 focus:ring-purple-400
                "
              >
                <option>Global</option>
                <option>Asia</option>
                <option>Europe</option>
                <option>Africa</option>
                <option>Latin America</option>
              </select>
            </div>

            <div className="glass p-6 rounded-2xl card-shadow flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-white">Trend Smoothing</h3>
                <p className="text-sm text-gray-300">Reduces volatility for clearer interpretation.</p>
              </div>
              <input
                type="checkbox"
                checked={enableSmooth}
                onChange={(e) => setEnableSmooth(e.target.checked)}
                className="w-5 h-5 accent-purple-500"
              />
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="glass p-6 rounded-2xl card-shadow text-center">
              <div className="text-sm text-gray-300">Intergen. Mobility</div>
              <div className="text-3xl font-bold text-blue-300">{latest.igm}</div>
            </div>

            <div className="glass p-6 rounded-2xl card-shadow text-center">
              <div className="text-sm text-gray-300">Upward Mobility Chance</div>
              <div className="text-3xl font-bold text-green-300">{latest.upwardChance}%</div>
            </div>

            <div className="glass p-6 rounded-2xl card-shadow text-center">
              <div className="text-sm text-gray-300">Inequality (Gini)</div>
              <div className="text-3xl font-bold text-red-300">{latest.inequality}</div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-8">

            {/* IGM Chart */}
            <div className="glass p-6 rounded-2xl card-shadow">
              <h3 className="font-semibold text-white mb-3">
                Intergenerational Mobility Over Time
              </h3>
              <div className="h-[350px]">
                <ResponsiveContainer>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis dataKey="year" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="igm"
                      stroke="#60a5fa"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Upward Mobility Chart */}
            <div className="glass p-6 rounded-2xl card-shadow">
              <h3 className="font-semibold text-white mb-3">
                Chance of Upward Mobility (%)
              </h3>
              <div className="h-[350px]">
                <ResponsiveContainer>
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorUp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.7} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis dataKey="year" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="upwardChance"
                      stroke="#10b981"
                      fill="url(#colorUp)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Mobility vs Inequality Chart */}
            <div className="glass p-6 rounded-2xl card-shadow lg:col-span-2">
              <h3 className="font-semibold text-white mb-3">
                Mobility vs Inequality — Inverse Relationship
              </h3>
              <div className="h-[350px]">
                <ResponsiveContainer>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis dataKey="year" stroke="#ccc" />
                    <YAxis yAxisId="left" stroke="#60a5fa" />
                    <YAxis yAxisId="right" orientation="right" stroke="#f87171" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      dataKey="igm"
                      stroke="#60a5fa"
                      strokeWidth={2}
                      dot={false}
                      name="Mobility Index"
                    />
                    <Line
                      yAxisId="right"
                      dataKey="inequality"
                      stroke="#f87171"
                      strokeWidth={2}
                      dot={false}
                      name="Gini (Inequality)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="glass p-6 rounded-2xl card-shadow mt-10">
            <h3 className="font-semibold text-white mb-3">Interpretation Guide</h3>
            <ul className="list-disc pl-5 text-gray-300 text-sm space-y-2">
              <li>Higher mobility = people can move upward economically more easily.</li>
              <li>Inequality and mobility often move in opposite directions.</li>
              <li>Smoothing reveals long-term structural shifts.</li>
              <li>Compare with Policy Impact Simulator for deeper insights.</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
