import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
} from "recharts";

/* -----------------------------------
   Types
----------------------------------- */
type YearPoint = {
  year: number;
  gini: number;
  gdp: number;
  poverty: number;
};

type PolicyScenario = {
  name: string;
  taxRate: number; // progressive tax strength 0..1
  transferPerc: number; // % redistributed
};

/* -----------------------------------
   Mock Historical Data
----------------------------------- */
function mockFetchHistorical(countryCode = "IND"): YearPoint[] {
  const startYear = 2009;
  const baseGini = 36;
  const baseGDP = 2200;
  const basePoverty = 22;

  return Array.from({ length: 16 }, (_, i) => {
    const year = startYear + i;
    const gini = +(baseGini + Math.sin(i / 3) * 1.5 + i * 0.05).toFixed(2);
    const gdp = +(baseGDP + i * 400 + Math.cos(i / 2) * 30).toFixed(0);
    const poverty = +(basePoverty - i * 0.4 + Math.sin(i / 2) * 0.6).toFixed(2);
    return { year, gini, gdp, poverty };
  });
}

/* -----------------------------------
   Simulation Model
----------------------------------- */
function simulatePolicy(
  history: YearPoint[],
  policy: PolicyScenario,
  yearsToProject = 10
): YearPoint[] {
  const baseEffectiveness = 0.9;
  const transferBoost = policy.transferPerc;
  const shockDampening = 0.98;

  const last = history[history.length - 1];
  const proj: YearPoint[] = [];

  let currentGini = last.gini;
  let currentGDP = last.gdp;
  let currentPoverty = last.poverty;

  for (let t = 1; t <= yearsToProject; t++) {
    const year = last.year + t;

    const gdpGrowthFactor =
      1 + 0.02 + policy.taxRate * 0.01 * (0.5 + transferBoost);
    currentGDP = +(currentGDP * gdpGrowthFactor).toFixed(0);

    const yearlyReduction =
      policy.taxRate *
      baseEffectiveness *
      (0.3 + transferBoost * 0.7) *
      Math.pow(shockDampening, t - 1);

    currentGini = +(Math.max(18, currentGini - yearlyReduction).toFixed(2));

    const povertyDrop =
      0.4 * transferBoost * policy.taxRate * 10 + (gdpGrowthFactor - 1) * 2;
    currentPoverty = +(Math.max(0, currentPoverty - povertyDrop).toFixed(2));

    proj.push({ year, gini: currentGini, gdp: currentGDP, poverty: currentPoverty });
  }

  return proj;
}

/* -----------------------------------
   Component
----------------------------------- */
export default function PolicyInsights() {
  const history = useMemo(() => mockFetchHistorical("IND"), []);
  const [taxRate, setTaxRate] = useState(0.15);
  const [transferPerc, setTransferPerc] = useState(0.6);
  const [yearsToProject, setYearsToProject] = useState(10);

  const scenario: PolicyScenario = { name: "User Scenario", taxRate, transferPerc };
  const projection = useMemo(
    () => simulatePolicy(history, scenario, yearsToProject),
    [history, taxRate, transferPerc, yearsToProject]
  );

  const combined = [
    ...history.map((h) => ({ ...h, type: "history" })),
    ...projection.map((p) => ({ ...p, type: "projection" })),
  ];

  const beforeGini = history[history.length - 1].gini;
  const afterGini = projection[projection.length - 1].gini;
  const giniDelta = +(afterGini - beforeGini).toFixed(2);

  return (
    <div
      className="
      min-h-screen relative overflow-hidden 
      px-6 pt-28 pb-20 
      bg-gradient-to-br from-[#1a0b2e] via-[#230f45] to-[#0d1b3d]
      text-gray-200
    "
    >
      {/* Glowing Blobs */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-purple-600 opacity-40 blur-[160px]" />
      <div className="absolute bottom-[-200px] left-[-150px] w-[600px] h-[600px] rounded-full bg-blue-500 opacity-40 blur-[160px]" />
      <div className="absolute top-[40%] left-[25%] w-[450px] h-[450px] rounded-full bg-pink-500 opacity-30 blur-[200px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-10 text-center text-white">
          Policy Insights — Simulation Studio
        </h2>

        {/* ---------------- Controls + KPIs ---------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">

          {/* Controls */}
          <div className="lg:col-span-2 glass bg-white/10 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
            <h3 className="text-lg font-semibold text-white mb-4">Policy Controls</h3>

            {/* Tax Rate */}
            <div className="mb-6">
              <label className="block text-sm mb-2 text-gray-300">Progressive Tax Strength</label>
              <input
                type="range"
                min={0}
                max={0.5}
                step={0.01}
                value={taxRate}
                onChange={(e) => setTaxRate(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="text-sm mt-1">
                <span className="text-white">{Math.round(taxRate * 100)}%</span>
              </div>
            </div>

            {/* Transfer */}
            <div className="mb-6">
              <label className="block text-sm mb-2 text-gray-300">Redistribution to Poorest</label>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={transferPerc}
                onChange={(e) => setTransferPerc(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="text-sm mt-1">
                <span className="text-white">{Math.round(transferPerc * 100)}%</span>
              </div>
            </div>

            {/* Projection Range */}
            <div className="flex items-center gap-6">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Years to project</label>
                <select
                  value={yearsToProject}
                  onChange={(e) => setYearsToProject(parseInt(e.target.value))}
                  className="p-2 rounded bg-white/20 text-white border border-white/10"
                >
                  <option value={5}>5 years</option>
                  <option value={10}>10 years</option>
                  <option value={15}>15 years</option>
                </select>
              </div>

              <div className="ml-auto text-right">
                <div className="text-sm text-gray-300">Projected Gini Change</div>
                <div className="text-2xl font-bold">
                  {giniDelta < 0 ? (
                    <span className="text-green-400">↓ {Math.abs(giniDelta)}</span>
                  ) : (
                    <span className="text-red-400">+{giniDelta}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* KPI Card */}
          <div className="glass bg-white/10 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
            <h4 className="text-lg font-semibold text-white mb-4">Quick KPIs</h4>

            <div className="space-y-4">
              <div>
                <div className="text-gray-300 text-sm">Current Gini</div>
                <div className="text-xl font-bold text-white">{beforeGini}</div>
              </div>

              <div>
                <div className="text-gray-300 text-sm">Projected Gini</div>
                <div className="text-xl font-bold text-white">{afterGini}</div>
              </div>

              <div>
                <div className="text-gray-300 text-sm">Projected Poverty</div>
                <div className="text-xl font-bold text-white">
                  {projection[projection.length - 1].poverty}%
                </div>
              </div>

              <div>
                <div className="text-gray-300 text-sm">Projected GDP</div>
                <div className="text-xl font-bold text-white">
                  ${projection[projection.length - 1].gdp}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- Charts ---------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Gini Line Chart */}
          <div className="glass bg-white/10 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
            <h4 className="font-semibold text-lg mb-3 text-white">Gini — History & Projection</h4>
            <div style={{ height: 330 }}>
              <ResponsiveContainer>
                <LineChart data={combined}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis dataKey="year" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip />
                  <Legend />

                  <Line
                    name="Gini"
                    dataKey="gini"
                    stroke="#60a5fa"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Before/After Bar */}
          <div className="glass bg-white/10 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
            <h4 className="font-semibold text-lg mb-3 text-white">
              Before / After Comparison
            </h4>

            <div style={{ height: 300 }}>
              <ResponsiveContainer>
                <BarChart
                  data={[
                    { label: "Before", gini: beforeGini, poverty: history[history.length - 1].poverty },
                    { label: "After", gini: afterGini, poverty: projection[projection.length - 1].poverty },
                  ]}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis type="number" stroke="#ccc" />
                  <YAxis dataKey="label" type="category" stroke="#ccc" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="gini" name="Gini" fill="#60a5fa" />
                  <Bar dataKey="poverty" name="Poverty (%)" fill="#fb923c" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ---------------- Explanation ---------------- */}
        <div className="glass bg-white/10 border border-white/10 rounded-2xl p-6 backdrop-blur-xl mt-10">
          <h4 className="text-xl font-semibold text-white mb-3">How this model works</h4>

          <ul className="list-disc pl-6 text-gray-300 text-sm leading-6">
            <li>Progressive tax reduces inequality by increasing redistribution resources.</li>
            <li>Redistribution % determines how efficiently tax revenue reaches the poorest.</li>
            <li>GDP growth is mildly affected by tax and transfer mix.</li>
            <li>The model is heuristic — use it only for scenario exploration.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
