import { Link, Routes, Route } from "react-router-dom";
import CompareMetrics from "./CompareMetrics";
import MultiTimeline from "./MultiTimeline";
import MetricSummary from "./MetricSummary";

export default function ComparecountriesRouter() {
  return (
    <div className="container">
      <h1>Compare Countries</h1>

      <div className="subnav">
        <Link to="metrics">Compare Metrics</Link>
        <Link to="multi-timeline">Multi-Timeline</Link>
        <Link to="summary">Metric Summary</Link>
      </div>

      <Routes>
        <Route path="metrics" element={<CompareMetrics />} />
        <Route path="multi-timeline" element={<MultiTimeline />} />
        <Route path="summary" element={<MetricSummary />} />
      </Routes>
    </div>
  );
}
