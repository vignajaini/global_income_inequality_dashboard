// src/pages/Insights/PolicyImpactSimulator.tsx
import React, { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

/* --------------------------------------------
   Types
----------------------------------------------*/
type Country = "IND" | "USA" | "BRA" | "CHN";

interface PolicyInputs {
  educationBoost: number;
  taxProgressivity: number;
  cashTransfers: number;
  wageSubsidy: number;
  years: number;
}

/* --------------------------------------------
   Mock baseline stats
----------------------------------------------*/
const BASE_COUNTRY_STATS = {
  IND: { gdp: 3.5, inequality: 0.41, opportunity: 52, poverty: 18 },
  USA: { gdp: 2.1, inequality: 0.39, opportunity: 68, poverty: 11 },
  CHN: { gdp: 4.8, inequality: 0.38, opportunity: 61, poverty: 7 },
  BRA: { gdp: 2.2, inequality: 0.51, opportunity: 48, poverty: 21 },
};

/* --------------------------------------------
   Simulation Engine
----------------------------------------------*/
function simulatePolicyImpact(country: Country, policy: PolicyInputs) {
  const base = BASE_COUNTRY_STATS[country];
  const { educationBoost, taxProgressivity, cashTransfers, wageSubsidy, years } = policy;

  const weights = {
    edu: 0.35,
    tax: 0.25,
    cash: 0.2,
    wage: 0.2,
  };

  const timeline = [];
  let gdp = base.gdp;
  let inequality = base.inequality;
  let opportunity = base.opportunity;
  let poverty = base.poverty;

  for (let year = 1; year <= years; year++) {
    const t = year / years;

    const eduEffect = educationBoost * weights.edu * Math.log(1 + t);
    const taxEffect = taxProgressivity * weights.tax * t * 0.8;
    const cashEffect = cashTransfers * weights.cash * (1 - Math.exp(-t * 2));
    const wageEffect = wageSubsidy * weights.wage * Math.log(1 + t * 1.2);

    gdp = gdp + eduEffect * 0.6 + wageEffect * 0.4;

    inequality =
      inequality -
      taxEffect * 0.02 -
      cashEffect * 0.015 -
      eduEffect * 0.01 +
      Math.sin(t * 2) * 0.001;

    opportunity =
      opportunity + eduEffect * 9 + cashEffect * 6 + wageEffect * 8 - taxEffect * 2;

    poverty =
      poverty - cashEffect * 1.8 - wageEffect * 1.1 - eduEffect * 0.8 + Math.random() * 0.15;

    timeline.push({
      year,
      gdp: +gdp.toFixed(2),
      inequality: +inequality.toFixed(3),
      opportunity: +opportunity.toFixed(1),
      poverty: +poverty.toFixed(1),
    });
  }

  return timeline;
}

/* --------------------------------------------
   COMPONENT
----------------------------------------------*/
const PolicyImpactSimulator: React.FC = () => {
  const [country, setCountry] = useState<Country>("IND");

  const [years, setYears] = useState(15);
  const [educationBoost, setEducationBoost] = useState(0.4);
  const [taxProgressivity, setTaxProgressivity] = useState(0.25);
  const [cashTransfers, setCashTransfers] = useState(0.2);
  const [wageSubsidy, setWageSubsidy] = useState(0.3);

  const policy: PolicyInputs = {
    educationBoost,
    taxProgressivity,
    cashTransfers,
    wageSubsidy,
    years,
  };

  const results = useMemo(() => simulatePolicyImpact(country, policy), [country, policy]);
  const last = results[results.length - 1];
  const base = BASE_COUNTRY_STATS[country];

  const diff = {
    gdp: +(last.gdp - base.gdp).toFixed(2),
    inequality: +(base.inequality - last.inequality).toFixed(3),
    opportunity: +(last.opportunity - base.opportunity).toFixed(1),
    poverty: +(base.poverty - last.poverty).toFixed(1),
  };

  return (
    <div
      className="
        min-h-screen relative overflow-hidden text-gray-200 
        bg-gradient-to-br from-[#1a0b2e] via-[#230f45] to-[#0d1b3d]
        p-6
      "
    >
      {/* Neon BG */}
      <div className="absolute -top-40 -right-40 w-[550px] h-[550px] bg-purple-600 opacity-40 blur-[160px] rounded-full"></div>
      <div className="absolute bottom-[-150px] left-[-150px] w-[550px] h-[550px] bg-blue-500 opacity-40 blur-[160px] rounded-full"></div>

      <h1 className="text-3xl font-bold mb-6 text-white">
        Policy Impact Simulator — Advanced
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        {/* Controls */}
        <div className="glass p-6 rounded-xl card-shadow text-white space-y-4">
          <h3 className="text-lg font-semibold">Policy Controls</h3>

          <label>Country</label>
          <select
            className="w-full p-2 rounded bg-white/10"
            value={country}
            onChange={(e) => setCountry(e.target.value as Country)}
          >
            <option value="IND">India</option>
            <option value="USA">USA</option>
            <option value="CHN">China</option>
            <option value="BRA">Brazil</option>
          </select>

          <label>Simulation Years</label>
          <select
            className="w-full p-2 rounded bg-white/10"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
          >
            <option value={10}>10 Years</option>
            <option value={15}>15 Years</option>
            <option value={20}>20 Years</option>
          </select>

          {/* Sliders */}
          {[
            ["Education Boost", educationBoost, setEducationBoost],
            ["Tax Progressivity", taxProgressivity, setTaxProgressivity],
            ["Cash Transfers", cashTransfers, setCashTransfers],
            ["Wage Subsidy", wageSubsidy, setWageSubsidy],
          ].map(
            ([
              label,
              value,
              setter,
            ]: [string, number, React.Dispatch<React.SetStateAction<number>>], i) => (
              <div key={i}>
                <label>{label}</label>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={value}
                  onChange={(e) => setter(parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="text-xs">{Math.round(value * 100)}%</div>
              </div>
            )
          )}
        </div>

        {/* KPI Cards */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            ["GDP Growth", last.gdp + "%", "+" + diff.gdp],
            ["Inequality (Gini)", last.inequality, "-" + diff.inequality],
            ["Opportunity", last.opportunity, "+" + diff.opportunity],
            ["Poverty (%)", last.poverty + "%", "-" + diff.poverty],
          ].map(([label, val, change], i) => (
            <div key={i} className="glass p-4 rounded-xl text-white">
              <div className="text-sm opacity-70">{label}</div>
              <div className="text-3xl font-bold">{val}</div>
              <div className="text-xs text-green-300">{change}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass p-4 rounded-xl text-white">
          <h3 className="font-semibold mb-3">Opportunity Over Time</h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={results}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line dataKey="opportunity" stroke="#4ade80" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-4 rounded-xl text-white">
          <h3 className="font-semibold mb-3">Inequality & Poverty</h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={results}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line dataKey="inequality" stroke="#f87171" strokeWidth={2} />
                <Line dataKey="poverty" stroke="#4ade80" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* GDP Chart */}
        <div className="glass p-4 rounded-xl text-white lg:col-span-2">
          <h3 className="font-semibold mb-3">GDP Projection</h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={results}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="gdp" fill="#38bdf8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="glass p-6 mt-10 rounded-xl text-white">
        <h3 className="font-semibold mb-2">Interpretation</h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-300 text-sm">
          <li>Education + wage subsidies raise productivity and opportunity.</li>
          <li>Progressive taxes reduce inequality sustainably.</li>
          <li>Cash transfers dramatically lower poverty in short term.</li>
          <li>Heuristic model — connect real microdata for accurate forecasting.</li>
        </ul>
      </div>
    </div>
  );
};

export default PolicyImpactSimulator;
