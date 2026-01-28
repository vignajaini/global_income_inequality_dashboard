import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, TrendingUp, Activity, LineChart, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import dashboard2 from "@/assets/dashboard2.jpg";

const Dashboard2 = () => {
  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />

      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <Link to="/home">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2" size={18} />
              Back to Home
            </Button>
          </Link>

          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                Inequality Trends Over Time
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Historical trends showing how income inequality has evolved across different nations and time periods
            </p>

            {/* KPI Cards */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="glass rounded-xl p-4">
                <TrendingUp className="text-secondary mb-2" size={24} />
                <div className="text-2xl font-bold">23 Years</div>
                <div className="text-sm text-muted-foreground">Time Period</div>
              </div>
              <div className="glass rounded-xl p-4">
                <Activity className="text-primary mb-2" size={24} />
                <div className="text-2xl font-bold">8 Countries</div>
                <div className="text-sm text-muted-foreground">Tracked</div>
              </div>
              <div className="glass rounded-xl p-4">
                <LineChart className="text-accent mb-2" size={24} />
                <div className="text-2xl font-bold">Upward</div>
                <div className="text-sm text-muted-foreground">Overall Trend</div>
              </div>
              <div className="glass rounded-xl p-4">
                <Layers className="text-secondary mb-2" size={24} />
                <div className="text-2xl font-bold">4 Charts</div>
                <div className="text-sm text-muted-foreground">Visual Types</div>
              </div>
            </div>

            {/* Dashboard Image */}
            <div className="glass rounded-2xl p-4 mb-8 card-shadow">
              <img
                src={dashboard2}
                alt="Inequality Trends Over Time Dashboard"
                className="w-full rounded-lg"
              />
            </div>

            {/* Insights */}
            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Trend Analysis</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="avg-income">
                  <AccordionTrigger>Average Income Growth (2000-2023)</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      The stacked area chart shows a steady increase in total average income over time (green area), 
                      with distinct periods of increase (green) and decrease (red). The overall upward trajectory 
                      indicates global economic growth, though with periodic setbacks likely corresponding to 
                      economic crises.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="income-share-time">
                  <AccordionTrigger>Top 10% vs Bottom 10% Share by Year</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      The dual-country area chart (2000-2001) shows the income share dynamics. The blue areas 
                      represent the top 10% income share, while orange represents the bottom 10%. The visualization 
                      reveals that in most countries, the top 10% consistently hold a significantly larger share, 
                      with minimal change year over year.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="ribbon-chart">
                  <AccordionTrigger>Country Rankings Over Time</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      The colorful ribbon chart tracks how top 10% income share rankings have shifted among 8 
                      countries from 2000 to 2023. Each colored stream represents a country, with position changes 
                      indicating shifts in inequality levels. Notable patterns include China and India's fluctuating 
                      positions and Australia's relatively stable ranking.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="scatter">
                  <AccordionTrigger>Income vs Inequality Correlation</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      The scatter plot reveals the relationship between average income (x-axis) and Gini index 
                      (y-axis) across countries. The positive correlation suggests that higher-income countries 
                      don't necessarily have lower inequality. The clustering of points indicates distinct groups 
                      of countries with similar economic profiles.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard2;
