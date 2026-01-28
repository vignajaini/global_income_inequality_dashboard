import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, TrendingDown, Users, Globe, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import dashboard1 from "@/assets/dashboard1.jpg";

const Dashboard1 = () => {
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
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Global Income Distribution Overview
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Comprehensive analysis of income distribution patterns across countries and populations worldwide
            </p>

            {/* KPI Cards */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="glass rounded-xl p-4">
                <Users className="text-primary mb-2" size={24} />
                <div className="text-2xl font-bold">62bn</div>
                <div className="text-sm text-muted-foreground">Sum of Population</div>
              </div>
              <div className="glass rounded-xl p-4">
                <TrendingDown className="text-secondary mb-2" size={24} />
                <div className="text-2xl font-bold">0.43</div>
                <div className="text-sm text-muted-foreground">Avg Gini Index</div>
              </div>
              <div className="glass rounded-xl p-4">
                <Globe className="text-accent mb-2" size={24} />
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
              <div className="glass rounded-xl p-4">
                <BarChart3 className="text-primary mb-2" size={24} />
                <div className="text-2xl font-bold">35%</div>
                <div className="text-sm text-muted-foreground">Avg Income Share</div>
              </div>
            </div>

            {/* Dashboard Image */}
            <div className="glass rounded-2xl p-4 mb-8 card-shadow">
              <img
                src={dashboard1}
                alt="Global Income Distribution Overview Dashboard"
                className="w-full rounded-lg"
              />
            </div>

            {/* Insights */}
            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Key Insights</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="gini">
                  <AccordionTrigger>Gini Index by Year Trend</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      The line chart shows fluctuations in the Gini coefficient over the years (2000-2023), 
                      indicating varying levels of income inequality globally. Sharp peaks suggest periods of 
                      increased inequality, while dips indicate more equitable distribution.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="population">
                  <AccordionTrigger>Population by Income Group</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      The donut chart reveals that the majority of the global population falls into the Lower Middle 
                      Income (26.94%) and Low Income (24.02%) categories, with High Income representing 22.22% and 
                      Upper Middle Income at 23.88%. This highlights significant global income disparity.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="world-map">
                  <AccordionTrigger>Geographic Income Distribution</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      The world map visual provides a geographic perspective of average income by country. Darker 
                      shades indicate higher average incomes, with North America and Europe showing the highest 
                      concentrations, while Africa and parts of Asia show lower average incomes.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="income-share">
                  <AccordionTrigger>Top 10% vs Bottom 10% Income Share</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      The horizontal bar chart compares the income share of the top 10% (blue) versus the bottom 10% 
                      (orange) across countries. China and Mexico show the largest disparities, with the top 10% holding 
                      significantly more wealth. This visualization starkly illustrates the wealth gap within nations.
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

export default Dashboard1;
