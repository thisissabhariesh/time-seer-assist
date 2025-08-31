import { useState } from "react";
import { ForecastDashboard } from "@/components/ForecastDashboard";
import { HeroSection } from "@/components/HeroSection";

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {!showDashboard ? (
        <HeroSection onGetStarted={() => setShowDashboard(true)} />
      ) : (
        <ForecastDashboard />
      )}
    </div>
  );
};

export default Index;