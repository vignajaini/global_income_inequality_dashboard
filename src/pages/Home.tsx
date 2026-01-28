import { DashboardCard } from "@/components/DashboardCard";
import { Navbar } from "@/components/Navbar";
import { Sparkles } from "lucide-react";
import dashboard1 from "@/assets/dashboard1.jpg";
import dashboard2 from "@/assets/dashboard2.jpg";
import dashboard3 from "@/assets/dashboard3.jpg";

const Home = () => {
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
        min-h-screen relative overflow-hidden text-gray-200
        bg-gradient-to-br from-[#1a0b2e] via-[#230f45] to-[#0d1b3d]
      "
    >

      {/* Neon Background Blobs */}
      <div className="absolute -top-40 -right-40 w-[550px] h-[550px] rounded-full 
                      bg-purple-600 opacity-40 blur-[160px] pointer-events-none"></div>

      <div className="absolute bottom-[-150px] left-[-150px] w-[550px] h-[550px] rounded-full 
                      bg-blue-500 opacity-40 blur-[160px] pointer-events-none"></div>

      <div className="absolute top-[35%] left-[30%] w-[450px] h-[450px] rounded-full 
                      bg-pink-500 opacity-25 blur-[200px] pointer-events-none"></div>

      <Navbar />

      <div className="pt-28 pb-20 px-4 relative z-10">
        <div className="container mx-auto">

          {/* Welcome Section */}
          <div className="text-center mb-16">
            <div className="inline-block p-3 rounded-full bg-white/10 backdrop-blur mb-4">
              <Sparkles className="text-purple-300" size={32} />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Dashboard Hub
            </h1>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore three comprehensive Power BI dashboards analyzing global
              income inequality patterns.
            </p>
          </div>

          {/* Dashboard Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {dashboards.map((dashboard, index) => (
              <DashboardCard key={dashboard.id} {...dashboard} delay={index * 100} />
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
            <div className="glass rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-purple-300 mb-2">62bn</div>
              <div className="text-sm text-gray-300">Total Population</div>
            </div>

            <div className="glass rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-blue-300 mb-2">0.43</div>
              <div className="text-sm text-gray-300">Avg Gini Index</div>
            </div>

            <div className="glass rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-cyan-300 mb-2">15+</div>
              <div className="text-sm text-gray-300">Countries Analyzed</div>
            </div>

            <div className="glass rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-purple-300 mb-2">20+</div>
              <div className="text-sm text-gray-300">Years of Data</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
