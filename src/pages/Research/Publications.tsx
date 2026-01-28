import { Navbar } from "@/components/Navbar";
import { FileText } from "lucide-react";

export default function Publications() {
  const publications = [
    {
      title: "Global Inequality: Trends and Patterns (2024)",
      authors: "Equal World Research Group",
      description:
        "A comprehensive analysis of income inequality trends across 160 countries from 1990 to 2023.",
      link: "#",
    },
    {
      title: "Economic Mobility Barriers in Developing Nations",
      authors: "Dr. A. Mehra, Prof. D. Lewis",
      description:
        "Examines the structural barriers to social mobility and suggests evidence-based policy actions.",
      link: "#",
    },
    {
      title: "Wealth Distribution & Tax Policy Effectiveness",
      authors: "Global Equity Council",
      description:
        "Evaluates how tax reforms impact wealth inequality and middle-class expansion.",
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
      {/* ⭐ Neon Blobs — same as Home page */}
      <div className="absolute -top-40 -right-40 w-[550px] h-[550px] rounded-full bg-purple-600 opacity-40 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-150px] left-[-150px] w-[550px] h-[550px] rounded-full bg-blue-500 opacity-40 blur-[160px] pointer-events-none" />
      <div className="absolute top-[40%] left-[35%] w-[450px] h-[450px] rounded-full bg-pink-500 opacity-25 blur-[200px] pointer-events-none" />

      <Navbar />

      {/* PAGE CONTENT */}
      <div className="pt-28 pb-20 px-4 relative z-10">
        <div className="container mx-auto max-w-5xl">

          {/* HEADER */}
          <div className="text-center mb-16">
            <div className="inline-block p-3 rounded-full bg-white/10 backdrop-blur mb-4">
              <FileText className="text-purple-300" size={32} />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Publications
            </h1>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore research articles, reports, and policy papers published by the Equal World team.
            </p>
          </div>

          {/* PUBLICATION CARDS */}
          <div className="space-y-6">
            {publications.map((pub, index) => (
              <div
                key={index}
                className="
                  glass rounded-xl p-6 card-shadow
                  transition-transform hover:scale-[1.02]
                  bg-[rgba(255,255,255,0.05)]
                "
              >
                <h3 className="text-xl font-semibold text-white">{pub.title}</h3>

                <p className="text-gray-300 mt-2 text-sm">
                  <strong className="text-purple-300">Authors:</strong> {pub.authors}
                </p>

                <p className="text-gray-300 mt-3">{pub.description}</p>

                <button
                  onClick={() => alert("PDF link not added yet")}
                  className="
                    mt-4 px-4 py-2 rounded-md text-white
                    bg-gradient-to-r from-purple-500 to-blue-500
                    hover:opacity-90 transition-all shadow-md
                  "
                >
                  View Publication
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
