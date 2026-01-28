import { Navbar } from "@/components/Navbar";
import { CheckCircle2 } from "lucide-react";

const Timeline = () => {
  const timelineEvents = [
    {
      year: "2000",
      title: "Baseline Measurement",
      description:
        "Initial global income inequality metrics established. Gini index baselines set for major economies.",
      dashboard: "Dashboard 1 & 2",
    },
    {
      year: "2005",
      title: "Emerging Market Growth",
      description:
        "Rising economies like China and India show significant income growth but increasing inequality.",
      dashboard: "Dashboard 2",
    },
    {
      year: "2008",
      title: "Financial Crisis Impact",
      description:
        "Global financial crisis causes sharp inequality spikes in developed nations.",
      dashboard: "Dashboard 2",
    },
    {
      year: "2010",
      title: "Recovery Patterns",
      description:
        "Uneven recovery shows top 10% income share increasing while bottom 10% stagnates.",
      dashboard: "Dashboard 1 & 3",
    },
    {
      year: "2015",
      title: "Regional Divergence",
      description:
        "Clear patterns emerge showing different inequality trajectories across regions.",
      dashboard: "Dashboard 3",
    },
    {
      year: "2020",
      title: "Pandemic Disruption",
      description:
        "COVID-19 pandemic exacerbates existing inequalities, widening wealth gaps.",
      dashboard: "All Dashboards",
    },
    {
      year: "2023",
      title: "Current State",
      description:
        "Global Gini index at 0.43, with persistent disparities across and within countries.",
      dashboard: "All Dashboards",
    },
  ];

  return (
    <div
      className="
        min-h-screen relative overflow-hidden text-gray-200
        bg-gradient-to-br from-[#1a0b2e] via-[#240f45] to-[#0a1b3c]
      "
    >
      {/* 🌈 Neon Lights (Same as Home Page) */}
      <div
        className="absolute -top-40 -right-40 w-[550px] h-[550px] rounded-full 
        bg-purple-600 opacity-40 blur-[160px] pointer-events-none"
      ></div>

      <div
        className="absolute bottom-[-150px] left-[-150px] w-[550px] h-[550px] rounded-full 
        bg-blue-500 opacity-40 blur-[160px] pointer-events-none"
      ></div>

      <div
        className="absolute top-[30%] right-[20%] w-[350px] h-[350px] rounded-full 
        bg-pink-400 opacity-30 blur-[180px] pointer-events-none"
      ></div>

      <Navbar />

      <div className="pt-24 pb-20 px-4 relative z-10">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-blue-300 bg-clip-text text-transparent">
                Inequality Timeline
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Key milestones in global income inequality trends
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div
              className="
                absolute left-8 md:left-1/2 top-0 bottom-0 w-1 
                bg-gradient-to-b from-purple-400 via-blue-300 to-cyan-300
              "
            />

            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <div
                  key={event.year}
                  className={`relative flex items-start gap-8 animate-fade-in-up ${
                    index % 2 === 0
                      ? "md:flex-row"
                      : "md:flex-row-reverse"
                  }`}
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  {/* Year Badge */}
                  <div
                    className="
                      absolute left-8 md:left-1/2 -translate-x-1/2 
                      flex items-center justify-center
                    "
                  >
                    <div
                      className="
                        w-16 h-16 rounded-full 
                        bg-gradient-to-br from-purple-400 to-blue-400
                        flex items-center justify-center 
                        text-black font-bold text-lg shadow-lg
                      "
                    >
                      {event.year}
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className={`ml-24 md:ml-0 md:w-5/12 ${
                      index % 2 === 0
                        ? "md:text-right md:mr-auto md:pr-16"
                        : "md:ml-auto md:pl-16"
                    }`}
                  >
                    <div
                      className="
                        glass rounded-xl p-6 card-shadow
                        hover:scale-105 transition-transform backdrop-blur-xl
                      "
                    >
                      <CheckCircle2
                        className="text-purple-300 mb-3"
                        size={24}
                      />
                      <h3 className="text-2xl font-bold mb-3 text-white">
                        {event.title}
                      </h3>
                      <p className="text-gray-300 mb-4">{event.description}</p>
                      <div
                        className="
                          inline-block px-4 py-2 rounded-full 
                          bg-purple-500/20 text-sm text-purple-300
                        "
                      >
                        {event.dashboard}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
