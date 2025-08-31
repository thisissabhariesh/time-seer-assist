import { Button } from "@/components/ui/button";
import { TrendingUp, BarChart3, Brain, Database } from "lucide-react";
import heroImage from "@/assets/hero-dashboard.jpg";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Background Image */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src={heroImage} 
          alt="Time Series Forecasting Dashboard" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 animate-float">
        <BarChart3 className="w-8 h-8 text-primary/30" />
      </div>
      <div className="absolute top-40 right-32 animate-float" style={{ animationDelay: "1s" }}>
        <TrendingUp className="w-6 h-6 text-primary/20" />
      </div>
      <div className="absolute bottom-40 left-32 animate-float" style={{ animationDelay: "2s" }}>
        <Brain className="w-10 h-10 text-primary/25" />
      </div>

      <div className="relative container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Database className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Time Series Forecasting</span>
            </div>
            
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              TimeSeer Assist
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Advanced pharmaceutical sales forecasting powered by Auto-ARIMA models. 
              Upload your data and get instant insights with professional-grade time series analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-lg bg-gradient-card border border-border/50 hover:shadow-glow transition-all duration-300">
              <TrendingUp className="w-8 h-8 text-primary mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Accurate Forecasting</h3>
              <p className="text-sm text-muted-foreground">Auto-ARIMA models with seasonal detection for precise predictions</p>
            </div>
            
            <div className="p-6 rounded-lg bg-gradient-card border border-border/50 hover:shadow-glow transition-all duration-300">
              <BarChart3 className="w-8 h-8 text-primary mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Visual Analytics</h3>
              <p className="text-sm text-muted-foreground">Interactive charts and performance metrics dashboard</p>
            </div>
            
            <div className="p-6 rounded-lg bg-gradient-card border border-border/50 hover:shadow-glow transition-all duration-300">
              <Brain className="w-8 h-8 text-primary mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Smart Insights</h3>
              <p className="text-sm text-muted-foreground">Automated model selection and performance optimization</p>
            </div>
          </div>

          <Button 
            onClick={onGetStarted}
            size="lg"
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300 px-8 py-3 text-lg font-semibold"
          >
            Get Started
            <TrendingUp className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};