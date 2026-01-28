import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// GLOBAL WIDGETS
import ChatbotWidget from "@/components/Chatbot";
import FeedbackWidget from "@/components/FeedbackWidget";

// AUTH & BASE PAGES
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Timeline from "./pages/Timeline";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

// DASHBOARDS
import Dashboard1 from "./pages/Dashboard1Enhanced";
import Dashboard2 from "./pages/Dashboard2Enhanced";
import Dashboard3 from "./pages/Dashboard3Enhanced";

// DATA EXPLORER
import DE_Overview from "./pages/Data_explorer/Overview";
import DE_Heatmap from "./pages/Data_explorer/GlobalHeatmap";
import DE_TrendTime from "./pages/Data_explorer/TrendTime";
import DE_Correlations from "./pages/Data_explorer/VariableCorrelations";
import DE_UploadMerge from "./pages/Data_explorer/UploadMerge";

// COUNTRY PROFILE
import CP_Overview from "./pages/Country_profile/CountryOverview";
import CP_Regional from "./pages/Country_profile/RegionalComparison";
import CP_Trends from "./pages/Country_profile/CountryTrends";
import CP_Policy from "./pages/Country_profile/PolicyInsights";

// COMPARE COUNTRIES
import CC_Metrics from "./pages/Compare_countries/CompareMetrics";
import CC_MultiTimeline from "./pages/Compare_countries/MultiTimeline";
import CC_Summary from "./pages/Compare_countries/MetricSummary";

// INSIGHTS
import IN_Mobility from "./pages/Insights/MobilityTimeline";
import IN_Opportunity from "./pages/Insights/OpportunityCalculator";
import IN_PolicyImpact from "./pages/Insights/PolicyImpactSimulator";
import IN_Factors from "./pages/Insights/FactorBreakdown";

// ⭐ RESEARCH PAGES (You must create UI pages for these)
import RS_Datasets from "./pages/Research/Datasets";
import RS_CaseStudies from "./pages/Research/CaseStudies";
import RS_Publications from "./pages/Research/Publications";
import RS_DataDictionary from "./pages/Research/DataDictionary";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>

        {/* Toast Notifications */}
        <Toaster />
        <Sonner />

        <BrowserRouter>

          {/* Global Widgets */}
          <ChatbotWidget />
          <FeedbackWidget />

          <Routes>

            {/* PUBLIC ROUTES */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* PROTECTED ROUTES */}
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
            <Route path="/timeline" element={<ProtectedRoute><Timeline /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />

            {/* DASHBOARDS */}
            <Route path="/dashboard1" element={<ProtectedRoute><Dashboard1 /></ProtectedRoute>} />
            <Route path="/dashboard2" element={<ProtectedRoute><Dashboard2 /></ProtectedRoute>} />
            <Route path="/dashboard3" element={<ProtectedRoute><Dashboard3 /></ProtectedRoute>} />

            {/* DATA EXPLORER */}
            <Route path="/data-explorer/overview" element={<ProtectedRoute><DE_Overview /></ProtectedRoute>} />
            <Route path="/data-explorer/global-heatmap" element={<ProtectedRoute><DE_Heatmap /></ProtectedRoute>} />
            <Route path="/data-explorer/trend-time" element={<ProtectedRoute><DE_TrendTime /></ProtectedRoute>} />
            <Route path="/data-explorer/correlations" element={<ProtectedRoute><DE_Correlations /></ProtectedRoute>} />
            <Route path="/data-explorer/upload-merge" element={<ProtectedRoute><DE_UploadMerge /></ProtectedRoute>} />

            {/* COUNTRY PROFILE */}
            <Route path="/country-profile/overview" element={<ProtectedRoute><CP_Overview /></ProtectedRoute>} />
            <Route path="/country-profile/regional-comparison" element={<ProtectedRoute><CP_Regional /></ProtectedRoute>} />
            <Route path="/country-profile/country-trends" element={<ProtectedRoute><CP_Trends /></ProtectedRoute>} />
            <Route path="/country-profile/policy-insights" element={<ProtectedRoute><CP_Policy /></ProtectedRoute>} />

            {/* COMPARE COUNTRIES */}
            <Route path="/compare-countries/metrics" element={<ProtectedRoute><CC_Metrics /></ProtectedRoute>} />
            <Route path="/compare-countries/multi-timeline" element={<ProtectedRoute><CC_MultiTimeline /></ProtectedRoute>} />
            <Route path="/compare-countries/summary" element={<ProtectedRoute><CC_Summary /></ProtectedRoute>} />

            {/* INSIGHTS */}
            <Route path="/insights/mobility-timeline" element={<ProtectedRoute><IN_Mobility /></ProtectedRoute>} />
            <Route path="/insights/opportunity-calculator" element={<ProtectedRoute><IN_Opportunity /></ProtectedRoute>} />
            <Route path="/insights/policy-impact" element={<ProtectedRoute><IN_PolicyImpact /></ProtectedRoute>} />
            <Route path="/insights/factor-breakdown" element={<ProtectedRoute><IN_Factors /></ProtectedRoute>} />

            {/* ⭐ RESEARCH ROUTES ADDED */}
            <Route path="/research/datasets" element={<ProtectedRoute><RS_Datasets /></ProtectedRoute>} />
            <Route path="/research/case-studies" element={<ProtectedRoute><RS_CaseStudies /></ProtectedRoute>} />
            <Route path="/research/publications" element={<ProtectedRoute><RS_Publications /></ProtectedRoute>} />
            <Route path="/research/data-dictionary" element={<ProtectedRoute><RS_DataDictionary /></ProtectedRoute>} />

            {/* 404 PAGE */}
            <Route path="*" element={<NotFound />} />

          </Routes>

        </BrowserRouter>

      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
