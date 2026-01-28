import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

// ==================================
// DEMO DATA
// ==================================
const sampleMetrics = [
  "Gini Index",
  "Poverty Rate",
  "GDP per Capita",
  "Inequality Adjusted Index",
];

const correlationData: any = {
  India: {
    "Gini Index": {
      "Gini Index": 1,
      "Poverty Rate": 0.72,
      "GDP per Capita": -0.45,
      "Inequality Adjusted Index": 0.63,
    },
    "Poverty Rate": {
      "Gini Index": 0.72,
      "Poverty Rate": 1,
      "GDP per Capita": -0.69,
      "Inequality Adjusted Index": 0.57,
    },
    "GDP per Capita": {
      "Gini Index": -0.45,
      "Poverty Rate": -0.69,
      "GDP per Capita": 1,
      "Inequality Adjusted Index": -0.48,
    },
    "Inequality Adjusted Index": {
      "Gini Index": 0.63,
      "Poverty Rate": 0.57,
      "GDP per Capita": -0.48,
      "Inequality Adjusted Index": 1,
    },
  },

  China: {
    "Gini Index": {
      "Gini Index": 1,
      "Poverty Rate": 0.55,
      "GDP per Capita": -0.62,
      "Inequality Adjusted Index": 0.45,
    },
    "Poverty Rate": {
      "Gini Index": 0.55,
      "Poverty Rate": 1,
      "GDP per Capita": -0.70,
      "Inequality Adjusted Index": 0.49,
    },
    "GDP per Capita": {
      "Gini Index": -0.62,
      "Poverty Rate": -0.70,
      "GDP per Capita": 1,
      "Inequality Adjusted Index": -0.61,
    },
    "Inequality Adjusted Index": {
      "Gini Index": 0.45,
      "Poverty Rate": 0.49,
      "GDP per Capita": -0.61,
      "Inequality Adjusted Index": 1,
    },
  },
};

const countries = Object.keys(correlationData);

// ==================================
// MAIN COMPONENT
// ==================================
export default function VariableCorrelations() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [selectedCountry, setSelectedCountry] = useState("India");

  const metrics = sampleMetrics;

  useEffect(() => {
    drawCorrelationHeatmap();
  }, [selectedCountry]);

  // ========================================
  // DRAW HEATMAP
  // ========================================
  const drawCorrelationHeatmap = () => {
    const matrix = correlationData[selectedCountry];
    const size = 400;
    const padding = 80;

    const svg = d3
      .select(svgRef.current)
      .attr("width", size + padding)
      .attr("height", size + padding)
      .style("background", "transparent");

    svg.selectAll("*").remove();

    const xScale = d3.scaleBand().range([padding, size]).domain(metrics).padding(0.05);
    const yScale = d3.scaleBand().range([padding, size]).domain(metrics).padding(0.05);

    const colorScale = d3
      .scaleLinear<string>()
      .domain([-1, 0, 1])
      .range(["#ef4444", "#ffffff", "#3b82f6"]);

    const tooltip = d3
      .select("#tooltip")
      .style("position", "absolute")
      .style("padding", "6px 12px")
      .style("background", "#111")
      .style("color", "white")
      .style("border-radius", "6px")
      .style("font-size", "13px")
      .style("visibility", "hidden");

    svg
      .selectAll("rect")
      .data(
        metrics.flatMap((m1) =>
          metrics.map((m2) => ({
            x: m1,
            y: m2,
            value: matrix[m1][m2],
          }))
        )
      )
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.x)!)
      .attr("y", (d) => yScale(d.y)!)
      .attr("width", xScale.bandwidth())
      .attr("height", yScale.bandwidth())
      .attr("fill", (d) => colorScale(d.value))
      .style("cursor", "pointer")
      .on("mousemove", function (event, d) {
        tooltip
          .style("visibility", "visible")
          .style("top", event.pageY - 35 + "px")
          .style("left", event.pageX + 15 + "px")
          .text(`${d.x} vs ${d.y}: ${d.value.toFixed(2)}`);
      })
      .on("mouseout", () => tooltip.style("visibility", "hidden"));

    // X Labels
    svg
      .append("g")
      .attr("transform", `translate(0,${padding - 10})`)
      .selectAll("text")
      .data(metrics)
      .enter()
      .append("text")
      .attr("x", (d) => xScale(d)! + xScale.bandwidth() / 2)
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("fill", "white")
      .text((d) => d);

    // Y Labels
    svg
      .append("g")
      .attr("transform", `translate(${padding - 10},0)`)
      .selectAll("text")
      .data(metrics)
      .enter()
      .append("text")
      .attr("x", 0)
      .attr("y", (d) => yScale(d)! + yScale.bandwidth() / 2)
      .attr("text-anchor", "end")
      .attr("font-size", "12px")
      .attr("fill", "white")
      .text((d) => d);
  };

  // ========================================
  // PAGE UI
  // ========================================
  return (
    <div
      className="
        min-h-screen w-full 
        bg-gradient-to-br 
        from-[#0a0528] via-[#1b0c42] to-[#3e1b6f] 
        bg-fixed 
        p-8 
        text-white
      "
    >
      <div className="max-w-screen-xl mx-auto space-y-8">

        <h1 className="text-3xl font-bold">Variable Correlation Analysis</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* FILTER PANEL */}
          <Card className="p-4 glass border bg-white/10 backdrop-blur-md text-white">
            <CardHeader>
              <CardTitle className="text-white">Filters</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="font-semibold mb-1">Select Country</p>

              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="border p-2 rounded-md bg-white/10 text-white">
                  {selectedCountry}
                </SelectTrigger>

                <SelectContent className="bg-[#1f1f35] text-white">
                  {countries.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="text-sm text-white/80">
                <p>Correlation values:</p>
                <p>• <b>-1</b> = Strong Negative</p>
                <p>• <b>0</b> = No Correlation</p>
                <p>• <b>1</b> = Strong Positive</p>
              </div>
            </CardContent>
          </Card>

          {/* HEATMAP */}
          <Card className="lg:col-span-3 p-4 glass border bg-white/10 backdrop-blur-md text-white">
            <CardHeader>
              <CardTitle className="text-white">
                {selectedCountry} — Correlation Heatmap
              </CardTitle>
            </CardHeader>

            <CardContent>
              <svg ref={svgRef}></svg>
              <div id="tooltip"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
