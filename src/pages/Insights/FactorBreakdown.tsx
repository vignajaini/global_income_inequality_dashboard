// src/pages/Insights/FactorBreakdown.tsx
import { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ScatterChart,
  Scatter,
  Legend,
} from "recharts";

/* -------------------------------------------------------
   TYPES
--------------------------------------------------------*/
type RegionOption = "Asia" | "Europe" | "Africa" | "Latin America" | "Global";

interface FactorScores {
  education: number;
  labor: number;
  wealth: number;
  geography: number;
  policy: number;
}

/* -------------------------------------------------------
   BASE DATA
--------------------------------------------------------*/
const REGION_BASE: Record<RegionOption, FactorScores> = {
  Asia: { education: 0.58, labor: 0.62, wealth: 0.47, geography: 0.53, policy: 0.55 },
  Europe: { education: 0.82, labor: 0.76, wealth: 0.64, geography: 0.70, policy: 0.80 },
  Africa: { education: 0.43, labor: 0.48, wealth: 0.34, geography: 0.29, policy: 0.38 },
  "Latin America": { education: 0.52, labor: 0.55, wealth: 0.46, geography: 0.40, policy: 0.50 },
  Global: { education: 0.62, labor: 0.61, wealth: 0.52, geography: 0.51, policy: 0.57 },
};

const normalize = (value: number, factor = 1) =>
  +Math.min(1, Math.max(0, value * factor)).toFixed(3);

/* -------------------------------------------------------
   COMPONENT
--------------------------------------------------------*/
export default function FactorBreakdown() {
  const [region, setRegion] = useState<RegionOption>("Asia");

  const [eduW, setEduW] = useState(1);
  const [laborW, setLaborW] = useState(1);
  const [wealthW, setWealthW] = useState(1);
  const [geoW, setGeoW] = useState(1);
  const [policyW, setPolicyW] = useState(1);

  const [normalizeView, setNormalizeView] = useState(true);

  const base = REGION_BASE[region];

  const weighted = {
    education: normalize(base.education * eduW),
    labor: normalize(base.labor * laborW),
    wealth: normalize(base.wealth * wealthW),
    geography: normalize(base.geography * geoW),
    policy: normalize(base.policy * policyW),
  };

  const opportunityScore = useMemo(() => {
    const sum =
      weighted.education +
      weighted.labor +
      weighted.wealth +
      weighted.geography +
      weighted.policy;

    return +(sum / 5 * 100).toFixed(1);
  }, [weighted]);

  const inequalityRisk = +(100 - opportunityScore).toFixed(1);

  const factorChartData = [
    { factor: "Education", value: weighted.education },
    { factor: "Labor Market", value: weighted.labor },
    { factor: "Wealth", value: weighted.wealth },
    { factor: "Geography", value: weighted.geography },
    { factor: "Policy", value: weighted.policy },
  ];

  const radarData = [
    { subject: "Education", A: weighted.education },
    { subject: "Labor", A: weighted.labor },
    { subject: "Wealth", A: weighted.wealth },
    { subject: "Geography", A: weighted.geography },
    { subject: "Policy", A: weighted.policy },
  ];

  const scatterMatrixData = [
    { factor: "Education", x: weighted.education, y: opportunityScore },
    { factor: "Labor", x: weighted.labor, y: opportunityScore },
    { factor: "Wealth", x: weighted.wealth, y: opportunityScore },
    { factor: "Geography", x: weighted.geography, y: opportunityScore },
    { factor: "Policy", x: weighted.policy, y: opportunityScore },
  ];

  return (
    <div
      className="
        min-h-screen relative overflow-hidden
        text-gray-200 px-6 py-10
        bg-gradient-to-br from-[#1a0b2e] via-[#230f45] to-[#0d1b3d]
      "
    >
      {/* Neon Blobs */}
      <div className="absolute -top-40 -right-40 w-[550px] h-[550px] bg-purple-600 opacity-40 blur-[160px] rounded-full"></div>
      <div className="absolute bottom-[-150px] left-[-150px] w-[550px] h-[550px] bg-blue-500 opacity-40 blur-[160px] rounded-full"></div>
      <div className="absolute top-[30%] left-[35%] w-[450px] h-[450px] bg-pink-500 opacity-20 blur-[200px] rounded-full"></div>

      <div className="relative z-10">
        <h2 className="text-4xl font-bold text-white mb-10 text-center">
          Factor Breakdown — Advanced Analysis
        </h2>

        {/* TOP CONTROLS */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="glass rounded-xl p-6 card-shadow text-white space-y-3">
            <h4 className="font-semibold text-lg">Select Region</h4>
            <select
              className="w-full bg-white/10 p-2 rounded"
              value={region}
              onChange={(e) => setRegion(e.target.value as RegionOption)}
            >
              <option>Asia</option>
              <option>Europe</option>
              <option>Africa</option>
              <option>Latin America</option>
              <option>Global</option>
            </select>

            <h4 className="font-semibold mt-4">Normalize Values?</h4>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={normalizeView}
                onChange={() => setNormalizeView(!normalizeView)}
              />
              Normalize Factors (0–1)
            </label>

            <hr className="border-gray-600" />

            <h4 className="font-semibold">Adjust Factor Weights</h4>

            <div className="space-y-4 text-sm">
              {[
                ["Education", eduW, setEduW],
                ["Labor Market", laborW, setLaborW],
                ["Wealth", wealthW, setWealthW],
                ["Geography", geoW, setGeoW],
                ["Policy", policyW, setPolicyW],
              ].map(([label, val, setter]: any) => (
                <div key={label}>
                  <label>
                    {label}: {val}x
                  </label>
                  <input
                    type="range"
                    min={0.5}
                    max={1.5}
                    step={0.01}
                    value={val}
                    onChange={(e) => setter(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* KPI CARDS */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass rounded-xl p-6 card-shadow text-center">
              <div className="text-sm text-gray-300">Opportunity Score</div>
              <div className="text-3xl text-purple-300 font-bold">{opportunityScore}</div>
            </div>

            <div className="glass rounded-xl p-6 card-shadow text-center">
              <div className="text-sm text-gray-300">Inequality Risk</div>
              <div className="text-3xl text-blue-300 font-bold">{inequalityRisk}</div>
            </div>

            <div className="glass rounded-xl p-6 card-shadow text-center">
              <div className="text-sm text-gray-300">Dominant Factor</div>
              <div className="text-xl text-cyan-300 font-bold">
                {factorChartData.sort((a, b) => b.value - a.value)[0].factor}
              </div>
            </div>
          </div>
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">

          {/* Radar Chart */}
          <div className="glass rounded-xl p-6 card-shadow">
            <h4 className="font-semibold mb-3">Factor Radar Map</h4>
            <div style={{ height: 300 }}>
              <ResponsiveContainer>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 1]} />
                  <Radar
                    name="Factors"
                    dataKey="A"
                    stroke="#a78bfa"
                    fill="#8b5cf6"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="glass rounded-xl p-6 card-shadow">
            <h4 className="font-semibold mb-3">Contribution Breakdown</h4>
            <div style={{ height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={factorChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="factor" />
                  <YAxis domain={[0, 1]} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#60a5fa" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Scatter Plot */}
          <div className="glass rounded-xl p-6 card-shadow">
            <h4 className="font-semibold mb-3">Factor Impact on Opportunity</h4>
            <div style={{ height: 300 }}>
              <ResponsiveContainer>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="x" name="Factor Score" type="number" />
                  <YAxis dataKey="y" name="Opportunity Score" type="number" />
                  <Tooltip />
                  <Legend />
                  <Scatter data={scatterMatrixData} fill="#34d399" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* INTERPRETATION */}
        <div className="glass rounded-xl p-6 card-shadow mt-10">
          <h3 className="font-semibold mb-2 text-white">Interpretation Guide</h3>
          <ul className="list-disc pl-5 text-gray-300 space-y-1 text-sm">
            <li>Education & labor markets are strongest drivers of opportunity.</li>
            <li>Wealth inequality strongly reduces mobility.</li>
            <li>Geography includes rural/urban access gaps.</li>
            <li>Policy captures social protection + investment strength.</li>
            <li>Adjust sliders to test how each factor changes total scores.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
