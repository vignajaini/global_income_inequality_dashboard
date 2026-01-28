import { Link, Routes, Route } from "react-router-dom";
import MobilityTimeline from "./MobilityTimeline";
import OpportunityCalculator from "./OpportunityCalculator";
import PolicyImpactSimulator from "./PolicyImpactSimulator";
import FactorBreakdown from "./FactorBreakdown";
export default function InsightsRouter() {
  return (
    <div className="container">
      <h1>Insights</h1>

      <div className="subnav">
        <Link to="mobility-timeline">Mobility Timeline</Link>
        <Link to="opportunity-calculator">Opportunity Calculator</Link>
        <Link to="policy-impact">Policy Impact Simulator</Link>
        <Link to="factor-breakdown">Factor Breakdown</Link>
      </div>

      <Routes>
        <Route path="mobility-timeline" element={<MobilityTimeline />} />
        <Route path="opportunity-calculator" element={<OpportunityCalculator />} />
        <Route path="policy-impact" element={<PolicyImpactSimulator />} />
        <Route path="factor-breakdown" element={<FactorBreakdown />} />
      </Routes>
    </div>
  );
}
