import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "@/components/DashboardCard";
import { TrendingDown, BarChart3, Globe } from "lucide-react";
import dashboard1 from "@/assets/dashboard1.jpg";
import dashboard2 from "@/assets/dashboard2.jpg";
import dashboard3 from "@/assets/dashboard3.jpg";

const Landing = () => {
  const dashboards = [
    {
      id: 1,
      title: "Global Income Distribution Overview",
      description:
        "Comprehensive analysis of income distribution patterns across countries and populations worldwide.",
      image: dashboard1,
    },
    {
      id: 2,
      title: "Inequality Trends Over Time",
      description:
        "Historical trends showing how income inequality has evolved across different nations and time periods.",
      image: dashboard2,
    },
    {
      id: 3,
      title: "Country-Level Inequality Deep Dive",
      description:
        "Detailed country-specific analysis exploring income distribution and Gini index patterns.",
      image: dashboard3,
    },
  ];

  return (
    <div
      className="
        min-h-screen 
        bg-gradient-to-br 
        from-[#0a0528] 
        via-[#1b0c42] 
        to-[#3e1b6f] 
        text-white
      "
    >
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
                Global Income Inequality
              </span>
              <br />
              <span className="text-white">Data Analysis</span>
            </h1>

            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Explore comprehensive dashboards revealing patterns, trends, and insights into global income distribution and inequality.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/login">
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 rounded-xl shadow-lg"
                >
                  <BarChart3 className="mr-2" />
                  Explore Dashboards
                </Button>
              </Link>

              <Link to="/signup">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 rounded-xl border-white/40 hover:bg-white/10 text-white"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          {/* Feature Icons */}
          <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto">
            <div
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-6 text-center animate-fade-in-up"
              style={{ animationDelay: "100ms" }}
            >
              <Globe className="mx-auto mb-4 text-purple-300" size={40} />
              <h3 className="text-xl font-semibold mb-2">Global Coverage</h3>
              <p className="text-white/70">Data from countries worldwide</p>
            </div>

            <div
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-6 text-center animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              <TrendingDown className="mx-auto mb-4 text-pink-300" size={40} />
              <h3 className="text-xl font-semibold mb-2">Trend Analysis</h3>
              <p className="text-white/70">Historical patterns over decades</p>
            </div>

            <div
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-6 text-center animate-fade-in-up"
              style={{ animationDelay: "300ms" }}
            >
              <BarChart3 className="mx-auto mb-4 text-blue-300" size={40} />
              <h3 className="text-xl font-semibold mb-2">Interactive Visuals</h3>
              <p className="text-white/70">Explore data dynamically</p>
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARDS SECTION */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 animate-fade-in">
            Featured Dashboards
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {dashboards.map((dashboard, index) => (
              <DashboardCard key={dashboard.id} {...dashboard} delay={index * 100} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
