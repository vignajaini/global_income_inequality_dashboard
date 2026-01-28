import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { feature } from "topojson-client";

type Topology = {
  objects: {
    countries: any;
  };
};

export default function GlobalHeatmap() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [hoverCountry, setHoverCountry] = useState<string | null>(null);
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function drawMap() {
      try {
        const worldUrl =
          "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

        const topoJson: Topology = await d3.json(worldUrl);
        const geoData = feature(topoJson, topoJson.objects.countries);

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const width = 850;
        const height = 500;

        const projection = d3.geoMercator().fitSize([width, height], geoData);
        const path = d3.geoPath().projection(projection);

        const color = d3.scaleSequential(d3.interpolateYlOrRd).domain([0, 100]);

        svg
          .selectAll("path")
          .data(geoData.features)
          .enter()
          .append("path")
          .attr("d", path as any)
          .attr("fill", () => color(Math.random() * 100))
          .attr("stroke", "#ffffff30")
          .attr("strokeWidth", 0.6)
          .on("mouseenter", (event: any, d: any) => {
            const randomValue = Math.floor(Math.random() * 100);
            setHoverCountry(
              d.properties.name ||
                d.properties.NAME ||
                d.properties.ADMIN ||
                "Unknown"
            );
            setHoverValue(randomValue);
          })
          .on("mouseleave", () => {
            setHoverCountry(null);
            setHoverValue(null);
          });
      } catch (err) {
        console.error("Error loading map:", err);
        setError("Failed to load world map data.");
      }
    }

    drawMap();
  }, []);

  return (
    <div
      className="
        min-h-screen relative overflow-hidden px-6 pt-28 pb-20 
        bg-gradient-to-br from-[#150b2e] via-[#1b103f] to-[#0a162e]
        text-gray-200
      "
    >
      {/* GLOWING BACKGROUND BLOBS */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-purple-600 opacity-30 blur-[150px]" />
      <div className="absolute bottom-[-150px] left-[-150px] w-[600px] h-[600px] rounded-full bg-blue-500 opacity-30 blur-[150px]" />
      <div className="absolute top-[45%] left-[30%] w-[450px] h-[450px] rounded-full bg-pink-400 opacity-25 blur-[160px]" />

      <h1 className="relative z-10 text-4xl font-bold mb-10 text-center">
        🌍 Global Inequality Heatmap
      </h1>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-8">

        {/* LEFT PANEL (MAP) */}
        <div className="glass bg-white/10 border border-white/10 p-6 rounded-2xl shadow-xl">
          {error && <p className="text-red-400">{error}</p>}

          <svg
            ref={svgRef}
            width={850}
            height={500}
            className="rounded-xl mt-3 bg-white/5 backdrop-blur"
          />

          {/* LEGEND */}
          <div className="mt-8">
            <h4 className="text-lg font-semibold mb-2">Heatmap Legend</h4>

            <div
              className="h-4 w-72 rounded-md"
              style={{
                background:
                  "linear-gradient(to right, #ffffcc, #ffeda0, #feb24c, #f03b20)",
              }}
            ></div>

            <div className="flex justify-between w-72 text-xs mt-1 text-gray-300">
              <span>Low Inequality</span>
              <span>High Inequality</span>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL – INSIGHTS */}
        <div className="glass bg-white/10 border border-white/10 p-6 rounded-2xl shadow-xl max-h-[550px] overflow-y-auto">

          <h3 className="text-xl font-semibold">Country Insights</h3>

          {!hoverCountry && (
            <p className="text-gray-400 mt-3">
              Hover over any country on the map to view inequality score.
            </p>
          )}

          {hoverCountry && (
            <div className="mt-4 bg-white/10 p-4 rounded-xl border border-white/10">
              <h4 className="text-lg font-semibold mb-1">{hoverCountry}</h4>
              <p className="text-gray-200">
                Inequality Score:{" "}
                <span className="font-bold text-yellow-300">{hoverValue}</span>
              </p>
              <p className="text-xs text-gray-400 mt-2">
                * Score is simulated for demonstration purposes.
              </p>
            </div>
          )}

          <div className="mt-8">
            <h4 className="text-lg font-semibold mb-2">Global Insights</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              Heatmaps visually highlight inequality patterns around the world.
            </p>

            <ul className="mt-3 text-sm text-gray-300 leading-relaxed space-y-2">
              <li>• Sub-Saharan Africa shows higher inequality levels.</li>
              <li>• Europe tends to have lower inequality scores.</li>
              <li>• Asia displays mixed inequality patterns across regions.</li>
              <li>• Use this heatmap to perform quick global comparisons.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
