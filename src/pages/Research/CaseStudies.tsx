import { Navbar } from "@/components/Navbar";
import { BookOpen } from "lucide-react";

export default function CaseStudies() {
  const cases = [
    {
      title: "How Brazil Reduced Extreme Poverty (2003–2014)",
      region: "Latin America",
      description:
        "A deep dive into Brazil's Bolsa Família program, tracking its impact on child education and rural mobility.",
      link: "#",
    },
    {
      title: "Rising Inequality in the United States",
      region: "North America",
      description:
        "Analyzes wage stagnation, wealth concentration, and policy gaps influencing widening inequality.",
      link: "#",
    },
    {
      title: "Social Mobility in Scandinavian Countries",
      region: "Europe",
      description:
        "Explores why Norway, Sweden, and Denmark consistently score highest in mobility and equal opportunity.",
      link: "#",
    },
  ];

  return (
    <div
      className="
        min-h-screen relative overflow-hidden text-gray-200
        bg-gradient-to-br from-[#1a0b2e] via-[#230f45] to-[#0d1b3d]
      "
    >
      {/* ⭐ SAME NEON BLOBS AS HOME ⭐ */}
      <div
        className="absolute -top-40 -right-40 w-[550px] h-[550px]
                   rounded-full bg-purple-600 opacity-40 blur-[160px] pointer-events-none"
      />

      <div
        className="absolute bottom-[-150px] left-[-150px] w-[550px] h-[550px]
                   rounded-full bg-blue-500 opacity-40 blur-[160px] pointer-events-none"
      />

      <div
        className="absolute top-[40%] left-[35%] w-[450px] h-[450px]
                   rounded-full bg-pink-500 opacity-25 blur-[200px] pointer-events-none"
      />

      <Navbar />

      {/* PAGE CONTENT */}
      <div className="pt-28 pb-20 px-4 relative z-10">
        <div className="container mx-auto max-w-5xl">

          {/* HEADER */}
          <div className="text-center mb-16">
            <div className="inline-block p-3 rounded-full bg-white/10 backdrop-blur mb-4">
              <BookOpen className="text-purple-300" size={32} />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Case Studies
            </h1>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore real-world examples showcasing policy outcomes, inequality patterns,
              and mobility solutions.
            </p>
          </div>

          {/* CASE STUDY CARDS */}
          <div className="grid md:grid-cols-1 gap-6">
            {cases.map((c, index) => (
              <div
                key={index}
                className="
                  glass rounded-xl p-6 card-shadow
                  transition-transform hover:scale-[1.02]
                  bg-[rgba(255,255,255,0.05)]
                "
              >
                <h3 className="text-xl font-semibold text-white">{c.title}</h3>

                <p className="text-gray-300 text-sm mt-1">
                  <strong className="text-purple-300">Region:</strong> {c.region}
                </p>

                <p className="text-gray-300 mt-3">{c.description}</p>

                <button
                  onClick={() => alert("Case study not available yet")}
                  className="
                    mt-4 px-4 py-2 rounded-md text-white
                    bg-gradient-to-r from-purple-500 to-blue-500
                    hover:opacity-90 transition-all shadow-md
                  "
                >
                  View Full Study
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
