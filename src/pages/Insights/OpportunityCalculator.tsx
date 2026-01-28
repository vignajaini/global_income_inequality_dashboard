// src/pages/Insights/OpportunityCalculator.tsx
import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

/* ----------------------------------------------------------
   TYPES
---------------------------------------------------------- */
type CountryCode = "IND" | "USA" | "CHN" | "BRA";

type PercentilePoint = {
  percentile: number;
  baselineScore: number;
  scenarioScore?: number;
};

type Scenario = {
  name: string;
  educationInvestment: number;
  jobProgramIntensity: number;
  cashTransferPerc: number;
  progressiveTax: number;
  years: number;
};

/* ----------------------------------------------------------
   BASELINE DISTRIBUTION (Mock Model)
---------------------------------------------------------- */
function generateBaselineDistribution(country: CountryCode): PercentilePoint[] {
  const baseShift =
    country === "IND" ? -15 :
    country === "CHN" ? -10 :
    country === "BRA" ? -12 : -5;

  const arr: PercentilePoint[] = [];

  for (let p = 10; p <= 100; p += 10) {
    const score = Math.max(
      5,
      Math.min(
        95,
        50 + (p - 50) * 0.7 + baseShift + Math.sin(p / 10) * 3
      )
    );
    arr.push({ percentile: p, baselineScore: +score.toFixed(1) });
  }

  return arr;
}

/* ----------------------------------------------------------
   SCENARIO SIMULATION ENGINE
---------------------------------------------------------- */
function runScenario(baseline: PercentilePoint[], scenario: Scenario) {
  const eduEffectiveness = 0.35;
  const jobEffectiveness = 0.3;
  const cashEffectiveness = 0.2;
  const taxRedistributionEffect = 0.15;

  let currentScores = baseline.map((b) => b.baselineScore);
  const years = scenario.years;
  const series: { year: number; avgOpportunity: number }[] = [];

  for (let y = 1; y <= years; y++) {
    const yearFactor = y / years;

    const eduBoost = scenario.educationInvestment * eduEffectiveness * yearFactor;
    const jobBoost =
      scenario.jobProgramIntensity *
      jobEffectiveness *
      (0.8 * (1 - Math.exp(-y / 3)));
    const cashBoost =
      scenario.cashTransferPerc *
      cashEffectiveness *
      (1 - Math.exp(-y / 1.2));
    const taxBoost =
      scenario.progressiveTax *
      taxRedistributionEffect *
      yearFactor;

    currentScores = currentScores.map((score, idx) => {
      const pct = (idx + 1) * 10;

      const povertyMultiplier = Math.max(0.4, 1 - pct / 100);
      const eduMultiplier = 0.5 + (pct / 100) * 0.8;
      const jobMultiplier = 1 - Math.abs(50 - pct) / 60;
      const taxMultiplier = 1 - (pct / 100) * 0.6;

      const delta =
        eduBoost * eduMultiplier * 10 +
        jobBoost * jobMultiplier * 8 +
        cashBoost * povertyMultiplier * 12 +
        taxBoost * taxMultiplier * 6;

      return Math.min(100, Math.max(0, score + delta));
    });

    const avgOpportunity =
      currentScores.reduce((a, b) => a + b, 0) / currentScores.length;

    series.push({
      year: y,
      avgOpportunity: +avgOpportunity.toFixed(2),
    });
  }

  return {
    timeSeries: series,
    finalDistribution: baseline.map((b, idx) => ({
      percentile: b.percentile,
      baselineScore: b.baselineScore,
      scenarioScore: +currentScores[idx].toFixed(1),
    })),
  };
}

/* ----------------------------------------------------------
   DOWNLOAD JSON (Utility)
---------------------------------------------------------- */
function downloadJSON(filename: string, data: any) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}

/* ----------------------------------------------------------
   COMPONENT
---------------------------------------------------------- */
export default function OpportunityCalculator() {
  const [country, setCountry] = useState<CountryCode>("IND");
  const [years, setYears] = useState(10);

  const [educationInvestment, setEducationInvestment] = useState(0.3);
  const [jobProgramIntensity, setJobProgramIntensity] = useState(0.25);
  const [cashTransferPerc, setCashTransferPerc] = useState(0.15);
  const [progressiveTax, setProgressiveTax] = useState(0.12);

  const baseline = useMemo(
    () => generateBaselineDistribution(country),
    [country]
  );

  const scenario: Scenario = {
    name: "User Scenario",
    educationInvestment,
    jobProgramIntensity,
    cashTransferPerc,
    progressiveTax,
    years,
  };

  const { timeSeries, finalDistribution } = useMemo(
    () => runScenario(baseline, scenario),
    [
      baseline,
      educationInvestment,
      jobProgramIntensity,
      cashTransferPerc,
      progressiveTax,
      years,
    ]
  );

  const avgBaseline = useMemo(
    () =>
      +(
        baseline.reduce((s, b) => s + b.baselineScore, 0) /
        baseline.length
      ).toFixed(2),
    [baseline]
  );

  const avgScenario = useMemo(
    () =>
      +(
        finalDistribution.reduce(
          (s, b) => s + (b.scenarioScore ?? b.baselineScore),
          0
        ) / finalDistribution.length
      ).toFixed(2),
    [finalDistribution]
  );

  const improvement = +(avgScenario - avgBaseline).toFixed(2);
  const improvementPct = +(
    (improvement / (avgBaseline || 1)) *
    100
  ).toFixed(1);

  const barChartData = finalDistribution.map((d) => ({
    percentile: `${d.percentile}th`,
    Baseline: d.baselineScore,
    Scenario: d.scenarioScore ?? d.baselineScore,
  }));

  const avgSeriesForChart = timeSeries.map((t) => ({
    year: t.year,
    avgOpportunity: t.avgOpportunity,
  }));

  return (
    <div
      className="
        min-h-screen relative overflow-hidden text-gray-200 
        bg-gradient-to-br from-[#1a0b2e] via-[#230f45] to-[#0d1b3d]
        p-6
      "
    >
      {/* Neon Glow Background */}
      <div className="absolute -top-40 -right-40 w-[550px] h-[550px] bg-purple-600 opacity-40 blur-[160px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-150px] left-[-150px] w-[550px] h-[550px] bg-blue-500 opacity-40 blur-[160px] rounded-full pointer-events-none"></div>

      <h1 className="text-3xl font-bold mb-6 text-white">
        Opportunity Calculator — Advanced Simulator
      </h1>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        {/* CONTROLS */}
        <div className="glass p-6 rounded-xl card-shadow text-white">
          <label>Country</label>
          <select
            className="w-full p-2 rounded bg-white/10 mb-4"
            value={country}
            onChange={(e) => setCountry(e.target.value as CountryCode)}
          >
            <option value="IND">India</option>
            <option value="CHN">China</option>
            <option value="BRA">Brazil</option>
            <option value="USA">United States</option>
          </select>

          <label>Projection Horizon (Years)</label>
          <select
            className="w-full p-2 rounded bg-white/10 mb-4"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
          >
            <option value={5}>5 Years</option>
            <option value={10}>10 Years</option>
            <option value={15}>15 Years</option>
          </select>

          {/* Sliders Section with FIXED tuple annotation */}
          {[
            ["Education Investment", educationInvestment, setEducationInvestment],
            ["Job Program Intensity", jobProgramIntensity, setJobProgramIntensity],
            ["Cash Transfer (%)", cashTransferPerc, setCashTransferPerc],
            ["Progressive Tax", progressiveTax, setProgressiveTax],
          ].map(
            ([
              label,
              value,
              setter,
            ]: [
              string,
              number,
              React.Dispatch<React.SetStateAction<number>>
            ], i) => (
              <div key={i} className="mb-4">
                <label className="text-sm">{label}</label>
                <input
                  type="range"
                  min={0}
                  max={i === 2 ? 0.5 : 1}
                  step={0.01}
                  value={value}
                  onChange={(e) => setter(parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="text-xs mt-1">{Math.round(value * 100)}%</div>
              </div>
            )
          )}

          <button
            onClick={() =>
              downloadJSON("opportunity_scenario.json", {
                country,
                scenario,
                finalDistribution,
              })
            }
            className="mt-4 w-full px-3 py-2 bg-purple-600 text-white rounded"
          >
            Download Scenario JSON
          </button>
        </div>

        {/* KPIs */}
        <div className="lg:col-span-3 grid md:grid-cols-3 gap-4">
          {[
            ["Avg Opportunity (Baseline)", avgBaseline],
            ["Avg Opportunity (Scenario)", avgScenario],
            ["Improvement", `${improvement} (${improvementPct}%)`],
          ].map(([label, value], i) => (
            <div key={i} className="glass p-4 rounded-xl text-white">
              <div className="text-sm opacity-70">{label}</div>
              <div className="text-3xl font-bold mt-1">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="glass p-4 rounded-xl text-white">
          <h3 className="font-semibold mb-3">Percentile Opportunity</h3>
          <div style={{ height: 350 }}>
            <ResponsiveContainer>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="percentile" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Baseline" fill="#8884d8" />
                <Bar dataKey="Scenario" fill="#00bcd4" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart */}
        <div className="glass p-4 rounded-xl text-white">
          <h3 className="font-semibold mb-3">Average Opportunity Projection</h3>
          <div style={{ height: 350 }}>
            <ResponsiveContainer>
              <LineChart data={avgSeriesForChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="avgOpportunity"
                  stroke="#4ade80"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Interpretation */}
      <div className="glass rounded-2xl p-6 mt-10 card-shadow text-white">
        <h3 className="font-semibold text-white mb-3">Interpretation Guide</h3>
        <ul className="list-disc pl-5 text-gray-300 space-y-2 text-sm">
          <li>
            Education + job programs grow opportunity slowly but steadily.
          </li>
          <li>Cash transfers lift lower percentiles immediately.</li>
          <li>Progressive taxation reduces inequality long-term.</li>
          <li>
            Projections are heuristic — replace with survey microdata when
            available.
          </li>
        </ul>
      </div>
    </div>
  );
}
