import {
  BarChart,
  Bar,
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DE_Overview() {
  const data = [
    { year: 2010, gini: 39.5, poverty: 22, incomeShare: 12 },
    { year: 2012, gini: 40.2, poverty: 20, incomeShare: 13 },
    { year: 2014, gini: 41.1, poverty: 18, incomeShare: 15 },
    { year: 2016, gini: 42.0, poverty: 17, incomeShare: 16 },
    { year: 2018, gini: 41.6, poverty: 16, incomeShare: 17 },
    { year: 2020, gini: 40.9, poverty: 15, incomeShare: 18 },
    { year: 2022, gini: 40.1, poverty: 14, incomeShare: 17 },
  ];

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
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-purple-600 opacity-30 blur-[150px]" />
      <div className="absolute bottom-[-150px] left-[-150px] w-[600px] h-[600px] rounded-full bg-blue-500 opacity-30 blur-[150px]" />
      <div className="absolute top-[40%] left-[25%] w-[450px] h-[450px] rounded-full bg-pink-400 opacity-25 blur-[160px]" />

      {/* PAGE TITLE */}
      <h1 className="relative z-10 text-4xl font-bold mb-10 animate-fade-in text-center">
        📊 Data Explorer — Overview Dashboard
      </h1>

      {/* KPI CARDS */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="glass bg-white/10 border border-white/10 p-5 rounded-2xl shadow-xl">
          <p className="text-sm text-gray-300">Gini Index</p>
          <h2 className="text-3xl font-bold text-blue-400 mt-1">40.1</h2>
          <p className="text-xs text-green-400 mt-1">↓ 1.2 since 2020</p>
        </div>

        <div className="glass bg-white/10 border border-white/10 p-5 rounded-2xl shadow-xl">
          <p className="text-sm text-gray-300">Poverty Rate</p>
          <h2 className="text-3xl font-bold text-purple-400 mt-1">14%</h2>
          <p className="text-xs text-green-400 mt-1">↓ 3% since 2016</p>
        </div>

        <div className="glass bg-white/10 border border-white/10 p-5 rounded-2xl shadow-xl">
          <p className="text-sm text-gray-300">Income Share (Bottom 40%)</p>
          <h2 className="text-3xl font-bold text-emerald-400 mt-1">17%</h2>
          <p className="text-xs text-blue-400 mt-1">↑ 2% since 2016</p>
        </div>

        <div className="glass bg-white/10 border border-white/10 p-5 rounded-2xl shadow-xl">
          <p className="text-sm text-gray-300">GDP Per Capita</p>
          <h2 className="text-3xl font-bold text-yellow-400 mt-1">$2,300</h2>
          <p className="text-xs text-green-400 mt-1">↑ $200 this year</p>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* MAIN TREND CHART */}
        <div className="lg:col-span-3 glass bg-white/10 border border-white/10 p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-white">
            Inequality Trend Over Time
          </h2>

          <ResponsiveContainer width="100%" height={330}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="4 4" stroke="#ffffff25" />
              <XAxis dataKey="year" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="gini"
                stroke="#60a5fa"
                strokeWidth={3}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="incomeShare"
                stroke="#34d399"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* FILTERS PANEL */}
        <div className="glass bg-white/10 border border-white/10 p-6 rounded-2xl shadow-xl">
          <h3 className="text-lg font-medium mb-4 text-white">Filters</h3>

          <label className="text-sm text-gray-300">Region</label>
          <select className="w-full p-2 rounded-md bg-white/20 border border-white/10 text-white mt-1">
            <option>Global</option>
            <option>Asia</option>
            <option>Europe</option>
            <option>Africa</option>
            <option>North America</option>
          </select>

          <label className="text-sm text-gray-300 mt-4 block">Year Range</label>
          <input
            type="range"
            min="2010"
            max="2022"
            defaultValue="2022"
            className="w-full"
          />

          <p className="text-xs text-gray-400 mt-2">
            Use filters to update the trend visualization.
          </p>
        </div>
      </div>
    </div>
  );
}
