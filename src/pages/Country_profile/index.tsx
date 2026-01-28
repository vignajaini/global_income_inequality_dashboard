import { Link, Routes, Route } from "react-router-dom";
import CountryOverview from "./CountryOverview";
import RegionalComparison from "./RegionalComparison";
import CountryTrends from "./CountryTrends";
import PolicyInsights from "./PolicyInsights";

export default function CountryProfileRouter() {
  return (
    <div className="container">
      <h1>Country Profiles</h1>

      <div className="subnav">
        <Link to="overview">Country Overview</Link>
        <Link to="regional-comparison">Regional Comparison</Link>
        <Link to="country-trends">Country Trends</Link>
        <Link to="policy-insights">Policy Insights</Link>
      </div>

      <Routes>
        <Route path="overview" element={<CountryOverview />} />
        <Route path="regional-comparison" element={<RegionalComparison />} />
        <Route path="country-trends" element={<CountryTrends />} />
        <Route path="policy-insights" element={<PolicyInsights />} />
      </Routes>
    </div>
  );
}
