import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

import sampleData from "./sample_trend_data.json";

export default function TrendTimeAnalysis() {
  const countries = Object.keys(sampleData);

  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedMetric, setSelectedMetric] = useState("Gini Index");
  const [yearRange, setYearRange] = useState([1990, 2020]);

  const metricOptions = Object.keys(sampleData[selectedCountry]);

  const filteredData = sampleData[selectedCountry][selectedMetric].filter(
    (item: any) => item.year >= yearRange[0] && item.year <= yearRange[1]
  );

  return (
    <div
      className="
        min-h-screen w-full
        p-10
        bg-gradient-to-br 
        from-[#0a0528] 
        via-[#1b0c42] 
        to-[#3e1b6f]
        bg-fixed 
        text-white
      "
    >
      {/* PAGE TITLE */}
      <h1 className="text-4xl font-bold mb-8">Trend & Time Analysis</h1>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* FILTER PANEL */}
        <Card className="p-6 bg-white/10 backdrop-blur-xl text-white border border-white/20">
          <CardHeader>
            <CardTitle className="text-xl text-white">Filters</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">

            {/* COUNTRY */}
            <div>
              <p className="font-semibold mb-1 text-white">Select Country</p>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="border rounded-md p-2 bg-white/10 text-white">
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
            </div>

            {/* METRIC */}
            <div>
              <p className="font-semibold mb-1 text-white">Select Metric</p>
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger className="border rounded-md p-2 bg-white/10 text-white">
                  {selectedMetric}
                </SelectTrigger>

                <SelectContent className="bg-[#1f1f35] text-white">
                  {metricOptions.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* YEAR RANGE */}
            <div className="space-y-3">
              <p className="font-semibold text-white">Year Range</p>

              <Slider
                min={1990}
                max={2022}
                step={1}
                value={yearRange}
                onValueChange={setYearRange}
              />

              <div className="flex justify-between text-sm text-white/80">
                <span>{yearRange[0]}</span>
                <span>{yearRange[1]}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CHART SECTION */}
        <Card className="lg:col-span-3 p-6 bg-white/10 backdrop-blur-xl text-white border border-white/20">
          <CardHeader>
            <CardTitle className="text-xl text-white">
              {selectedMetric} — {selectedCountry}
            </CardTitle>
          </CardHeader>

          <CardContent>
            {filteredData.length > 0 ? (
              <div className="w-full h-[450px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff30" />

                    <XAxis
                      dataKey="year"
                      tick={{ fill: "#ffffff", fontSize: 12 }}
                      stroke="#ffffff50"
                    />

                    <YAxis
                      tick={{ fill: "#ffffff", fontSize: 12 }}
                      stroke="#ffffff50"
                    />

                    <Tooltip
                      contentStyle={{
                        background: "rgba(20,20,35,0.85)",
                        border: "1px solid #ffffff30",
                        borderRadius: "10px",
                        color: "#fff",
                      }}
                    />

                    <Legend wrapperStyle={{ color: "#ffffff" }} />

                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#c084fc"
                      strokeWidth={3}
                      dot={{ r: 4, fill: "#fff" }}
                      activeDot={{ r: 6, fill: "#fff" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-center text-gray-300 py-12">
                No data available.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
