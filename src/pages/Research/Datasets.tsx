// src/pages/Research/Datasets.tsx
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Download } from "lucide-react";

export default function Datasets() {
  const datasets = [
    {
      name: "Global Income Distribution Dataset",
      description:
        "Includes global income share, GDP per capita, and income inequality indicators from 1990–2023.",
      size: "8.3 MB",
      format: "CSV",
      link: "#",
    },
    {
      name: "Country-Level Gini Index Dataset",
      description:
        "Gini coefficients across 180+ countries with annual updates and demographic breakdowns.",
      size: "5.1 MB",
      format: "CSV / Excel",
      link: "#",
    },
    {
      name: "Poverty & Economic Mobility Dataset",
      description:
        "Compares poverty rates, social mobility, opportunity ratios, and intergenerational mobility metrics.",
      size: "10.2 MB",
      format: "CSV / JSON",
      link: "#",
    },
  ];

  const [selected, setSelected] = useState<number | null>(0);

  return (
    <div
      className="
        min-h-screen relative overflow-hidden text-gray-200
        bg-gradient-to-br from-[#1a0b2e] via-[#230f45] to-[#0d1b3d]
      "
    >
      {/* ⭐ SAME NEON BLOBS AS HOME PAGE ⭐ */}
      <div
        className="absolute -top-40 -right-40 w-[550px] h-[550px]
                   rounded-full bg-purple-600 opacity-40 blur-[160px] pointer-events-none"
      />

      <div
        className="absolute bottom-[-150px] left-[-150px] w-[550px] h-[550px]
                   rounded-full bg-blue-500 opacity-40 blur-[160px] pointer-events-none"
      />

      <div
        className="absolute top-[35%] left-[30%] w-[450px] h-[450px]
                   rounded-full bg-pink-500 opacity-25 blur-[200px] pointer-events-none"
      />

      <Navbar />

      {/* Page Content */}
      <div className="pt-28 pb-24 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-block p-3 rounded-full bg-white/10 backdrop-blur mb-4">
              <Download className="text-purple-300" size={30} />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Research Datasets
            </h1>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore official datasets used across inequality dashboards and
              insights.
            </p>
          </div>

          {/* DATASET LIST */}
          <div className="glass rounded-2xl p-8 card-shadow mb-10">
            <h2 className="text-2xl font-semibold mb-6 text-white">
              Available Data Files
            </h2>

            <div className="space-y-6">
              {datasets.map((d, idx) => (
                <div
                  key={idx}
                  className="
                    bg-[rgba(255,255,255,0.05)]
                    border border-[rgba(255,255,255,0.07)]
                    rounded-xl p-6 cursor-pointer
                    transition-transform hover:scale-[1.02]
                  "
                  onClick={() => setSelected(idx)}
                >
                  <div className="flex items-start gap-6">
                    {/* LEFT CONTENT */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">
                        {d.name}
                      </h3>

                      <p className="text-gray-300 mt-2">{d.description}</p>

                      {/* EXPANDED DETAILS */}
                      {selected === idx && (
                        <div
                          className="
                            mt-4 p-4 rounded-lg
                            bg-[rgba(0,0,0,0.35)]
                            border border-[rgba(255,255,255,0.05)]
                            backdrop-blur-lg
                          "
                        >
                          <div className="flex flex-wrap items-center gap-6">
                            <p className="text-sm text-gray-300">
                              <strong className="text-purple-300">Size:</strong>{" "}
                              {d.size}
                            </p>

                            <p className="text-sm text-gray-300">
                              <strong className="text-blue-300">Format:</strong>{" "}
                              {d.format}
                            </p>
                          </div>

                          <div className="mt-4">
                            <a
                              href={d.link}
                              onClick={(e) => {
                                if (d.link === "#") {
                                  e.preventDefault();
                                  alert("Download link not set yet.");
                                }
                              }}
                              className="
                                inline-flex items-center gap-2
                                px-4 py-2 rounded-md text-white text-sm
                                bg-gradient-to-r from-purple-500 to-blue-500
                                hover:opacity-90 transition-all shadow-md
                              "
                            >
                              <Download size={16} />
                              Download Dataset
                            </a>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* RIGHT SIDE META */}
                    <div className="hidden md:block w-40 text-right">
                      <div className="text-sm text-gray-400">Format</div>
                      <div className="text-white font-medium mt-1">
                        {d.format}
                      </div>

                      <div className="text-sm text-gray-400 mt-3">Size</div>
                      <div className="text-white font-medium mt-1">
                        {d.size}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ADDITIONAL GLASS INFO CARDS */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass rounded-xl p-6 card-shadow">
              <h4 className="font-semibold text-white mb-2">Usage Notes</h4>
              <p className="text-gray-300 text-sm">
                These datasets are for research and academic use. Cite the
                platform if used in any reports.
              </p>
            </div>

            <div className="glass rounded-xl p-6 card-shadow">
              <h4 className="font-semibold text-white mb-2">Updates</h4>
              <p className="text-gray-300 text-sm">
                All datasets receive annual updates. Contact the research team
                for past versions.
              </p>
            </div>

            <div className="glass rounded-xl p-6 card-shadow">
              <h4 className="font-semibold text-white mb-2">Request Access</h4>
              <p className="text-gray-300 text-sm">
                Need additional variables? Use the contact page to submit a data
                request.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
