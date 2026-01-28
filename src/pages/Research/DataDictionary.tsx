import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { BookOpen } from "lucide-react";

export default function DataDictionary() {
  const [search, setSearch] = useState("");

  const terms = [
    { term: "Gini Index", meaning: "A measure of income inequality (0 = equal, 1 = unequal)." },
    { term: "Palma Ratio", meaning: "Ratio of richest 10% income to poorest 40%." },
    { term: "GDP per Capita", meaning: "Economic output per person." },
    { term: "Mobility Index", meaning: "How easily people move between income classes." },
    { term: "Poverty Line", meaning: "Minimum level of income deemed adequate." },
  ];

  const filtered = terms.filter((t) =>
    t.term.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="
        min-h-screen relative overflow-hidden text-gray-200
        bg-gradient-to-br from-[#1a0b2e] via-[#230f45] to-[#0d1b3d]
      "
    >
      {/* ⭐ Neon blobs — matching Home page */}
      <div className="absolute -top-40 -right-40 w-[550px] h-[550px] rounded-full bg-purple-600 opacity-40 blur-[160px]" />
      <div className="absolute bottom-[-150px] left-[-150px] w-[550px] h-[550px] rounded-full bg-blue-500 opacity-40 blur-[160px]" />
      <div className="absolute top-[40%] left-[35%] w-[450px] h-[450px] rounded-full bg-pink-500 opacity-25 blur-[200px]" />

      <Navbar />

      <div className="pt-28 pb-20 px-4 relative z-10">
        <div className="container mx-auto max-w-4xl">

          {/* Header */}
          <div className="text-center mb-14">
            <div className="inline-block p-3 rounded-full bg-white/10 backdrop-blur mb-4">
              <BookOpen className="text-purple-300" size={32} />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Data Dictionary
            </h1>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A reference guide for variables, indicators, and terminology used in datasets.
            </p>
          </div>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search terms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full px-4 py-3 rounded-xl mb-8
              bg-white/10 backdrop-blur border border-white/20
              placeholder-gray-300 text-white
              focus:outline-none focus:ring-2 focus:ring-purple-400
            "
          />

          {/* Dictionary Content */}
          <div className="glass rounded-2xl p-8 card-shadow bg-white/5">
            {filtered.length === 0 && (
              <p className="text-gray-300">No matching terms found.</p>
            )}

            <ul className="space-y-6">
              {filtered.map((item, idx) => (
                <li key={idx} className="pb-4 border-b border-white/10">
                  <h3 className="text-xl font-semibold text-white">{item.term}</h3>
                  <p className="text-gray-300 mt-2">{item.meaning}</p>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
