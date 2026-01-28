import { useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { ZoomableImage } from "@/components/ZoomableImage";
import Chatbot from "@/components/Chatbot";
import { generateDashboardPDF } from "@/utils/pdfGenerator";
import { toast } from "sonner";
import dashboard2 from "@/assets/dashboard2.jpg";

const Dashboard2 = () => {
  const imageRef = useRef<HTMLImageElement>(null);

  const insights = [
    "Total income steadily increased from 2000–2023...",
    "Top 10% income share consistently dominates...",
    "Ribbon chart shows shifting inequality rankings over time...",
  ];

  const handleDownloadPDF = async () => {
    if (!imageRef.current) return;

    toast.loading("Generating PDF...");
    try {
      await generateDashboardPDF({
        title: "Inequality Trends Over Time",
        description: "Historical shifts in global income distribution and inequality.",
        insights,
        imageElement: imageRef.current,
      });
      toast.success("PDF downloaded!");
    } catch {
      toast.error("PDF generation failed");
    }
  };

  return (
    <div
      className="
        min-h-screen 
        text-white 
        px-4 pb-20
        bg-gradient-to-br 
        from-[#0a0528] 
        via-[#1b0c42] 
        to-[#3e1b6f]
      "
    >
      {/* Navbar */}
      <Navbar />
      <Chatbot />

      {/* Page Wrapper */}
      <div className="pt-28 container mx-auto max-w-6xl animate-fade-in">

        {/* BACK BUTTON */}
        <Link to="/home">
          <Button
            variant="ghost"
            className="
              mb-8 text-white/90 
              hover:bg-white/20 
              backdrop-blur-xl 
              px-5 py-3 rounded-xl
            "
          >
            <ArrowLeft size={18} className="mr-2" /> Back to Home
          </Button>
        </Link>

        {/* TITLE + PDF BUTTON */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Inequality Trends Over Time
          </h1>

          <Button
            onClick={handleDownloadPDF}
            className="
              bg-white/20 text-white 
              backdrop-blur-xl 
              px-6 py-3 rounded-xl
              hover:bg-white/30 
              transition-all gap-2
            "
          >
            <Download size={18} /> Download PDF
          </Button>
        </div>

        {/* DASHBOARD IMAGE */}
        <div
          className="
            rounded-3xl overflow-hidden 
            bg-white/10 backdrop-blur-xl 
            border border-white/20 
            shadow-[0_8px_35px_rgba(255,255,255,0.15)]
            p-2 transition-all
            hover:shadow-[0_12px_45px_rgba(255,255,255,0.25)]
          "
        >
          <ZoomableImage src={dashboard2} alt="Inequality Trend Dashboard" />

          {/* Hidden Image for PDF */}
          <img ref={imageRef} src={dashboard2} alt="hidden" className="hidden" />
        </div>

        {/* INSIGHTS SECTION */}
        <div
          className="
            mt-10 rounded-3xl p-8 
            bg-white/10 backdrop-blur-xl 
            border border-white/20
            shadow-[0_8px_35px_rgba(255,255,255,0.15)]
          "
        >
          <h2 className="text-3xl font-semibold mb-6">Key Insights</h2>

          <div className="space-y-4">
            {insights.map((text, index) => (
              <div
                key={index}
                className="
                  p-4 rounded-xl 
                  bg-white/10 text-white/90 
                  border border-white/20
                  hover:bg-white/20 
                  transition
                "
              >
                {index + 1}. {text}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard2;
