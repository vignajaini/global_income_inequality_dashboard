import { Link, Routes, Route } from "react-router-dom";
import Datasets from "./Datasets";
import CaseStudies from "./CaseStudies";
import Publications from "./Publications";
import DataDictionary from "./DataDictionary";

export default function ResearchRouter() {
  return (
    <div className="container">
      <h1>Research</h1>

      <div className="subnav">
        <Link to="datasets">Datasets</Link>
        <Link to="case-studies">Case Studies</Link>
        <Link to="publications">Publications</Link>
        <Link to="data-dictionary">Data Dictionary</Link>
      </div>

      <Routes>
        <Route path="datasets" element={<Datasets />} />
        <Route path="case-studies" element={<CaseStudies />} />
        <Route path="publications" element={<Publications />} />
        <Route path="data-dictionary" element={<DataDictionary />} />
      </Routes>
    </div>
  );
}
