import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  delay?: number;
}

export const DashboardCard = ({ id, title, description, image, delay = 0 }: DashboardCardProps) => {
  return (
    <div
      className="
        rounded-3xl overflow-hidden
        bg-white/20 backdrop-blur-xl
        border border-white/30
        shadow-[0_8px_35px_rgba(255,255,255,0.25)]
        transition-all duration-500
        hover:shadow-[0_12px_45px_rgba(255,255,255,0.35)]
        hover:scale-[1.03]
        animate-fade-in-up
      "
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Image Section */}
      <div className="relative group overflow-hidden">
        <img
          src={image}
          alt={title}
          className="
            w-full h-64 object-cover
            transition-transform duration-700
            group-hover:scale-110
          "
        />

        {/* Soft fading overlay */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-t from-black/40 via-transparent to-transparent
            opacity-0 group-hover:opacity-100
            transition-opacity duration-500
          "
        />
      </div>

      {/* Content Section */}
      <div className="p-7">
        <h3
          className="
            text-2xl font-bold mb-3
            bg-gradient-to-r from-white via-white/80 to-white/60
            bg-clip-text text-transparent
          "
        >
          {title}
        </h3>

        <p className="text-white/80 mb-6 tracking-wide leading-relaxed">
          {description}
        </p>

        <Link to={`/dashboard${id}`}>
          <Button
            className="
              w-full py-5 text-lg font-medium
              rounded-2xl
              bg-white/30 backdrop-blur-xl
              hover:bg-white/40 hover:scale-[1.02]
              transition-all duration-300
              text-white
            "
          >
            Explore Dashboard
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </Link>
      </div>
    </div>
  );
};
