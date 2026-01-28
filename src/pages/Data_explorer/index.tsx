import { Link, Routes, Route } from "react-router-dom";
import Overview from "./Overview";
import GlobalHeatmap from "./GlobalHeatmap";
import TrendTime from "./TrendTime";
import VariableCorrelations from "./VariableCorrelations";
import UploadMerge from "./UploadMerge";

export default function DataExplorerRouter() {
  return (
    <div className="container">
      <h1>Data Explorer</h1>

      <div className="subnav">
        <Link to="overview">Overview</Link>
        <Link to="global-heatmap">Global Heatmap</Link>
        <Link to="trend-time">Trend & Time Analysis</Link>
        <Link to="correlations">Variable Correlations</Link>
        <Link to="upload-merge">Upload & Merge</Link>
      </div>

      <Routes>
        <Route path="overview" element={<Overview />} />
        <Route path="global-heatmap" element={<GlobalHeatmap />} />
        <Route path="trend-time" element={<TrendTime />} />
        <Route path="correlations" element={<VariableCorrelations />} />
        <Route path="upload-merge" element={<UploadMerge />} />
      </Routes>
    </div>
  );
}
