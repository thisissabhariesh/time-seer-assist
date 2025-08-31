import { useState } from "react";
import { FileUpload } from "./FileUpload";
import { MetricsOverview } from "./MetricsOverview";
import { ForecastResults } from "./ForecastResults";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ForecastDashboard = () => {
  const [weeklyData, setWeeklyData] = useState<File | null>(null);
  const [monthlyData, setMonthlyData] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const handleAnalysis = async () => {
    if (!weeklyData || !monthlyData) {
      toast({
        title: "Missing Data",
        description: "Please upload both weekly and monthly sales data files.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis process
    setTimeout(() => {
      const mockResults = {
        weeklyResults: generateMockResults("Weekly"),
        monthlyResults: generateMockResults("Monthly"),
        bestModels: generateBestModels(),
        overallBest: {
          dataset: "Weekly",
          column: "N02BE",
          order: "(2,1,1)x(1,1,1)[52]",
          mape: 8.45
        }
      };
      
      setResults(mockResults);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: "Time series forecasting analysis has been completed successfully.",
      });
    }, 3000);
  };

  const generateMockResults = (type: string) => {
    const columns = ['M01AB', 'M01AE', 'N02BA', 'N02BE', 'N05B', 'N05C', 'R03', 'R06'];
    return columns.map(col => ({
      column: col,
      mse: Math.random() * 1000 + 100,
      mape: Math.random() * 20 + 5,
      order: type === "Weekly" ? `(${Math.floor(Math.random() * 3) + 1},1,${Math.floor(Math.random() * 3) + 1})` : `(${Math.floor(Math.random() * 3) + 1},1,${Math.floor(Math.random() * 3) + 1})x(1,1,1)[${type === "Weekly" ? "52" : "12"}]`,
      forecast: Array.from({ length: 12 }, () => Math.random() * 1000 + 500)
    }));
  };

  const generateBestModels = () => {
    const columns = ['M01AB', 'M01AE', 'N02BA', 'N02BE', 'N05B', 'N05C', 'R03', 'R06'];
    return columns.map(col => ({
      column: col,
      bestDataset: Math.random() > 0.5 ? "Weekly" : "Monthly",
      mape: Math.random() * 15 + 5
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold">TimeSeer Assist</h1>
            </div>
            
            {results && (
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export Results
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {!results ? (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Upload Sales Data</h2>
              <p className="text-muted-foreground mb-8">
                Upload your weekly and monthly pharmaceutical sales CSV files to begin the analysis
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FileUpload
                title="Weekly Sales Data"
                description="Upload salesweekly.csv file"
                onFileSelect={setWeeklyData}
                selectedFile={weeklyData}
              />
              <FileUpload
                title="Monthly Sales Data"
                description="Upload salesmonthly.csv file"
                onFileSelect={setMonthlyData}
                selectedFile={monthlyData}
              />
            </div>

            <div className="text-center">
              <Button
                onClick={handleAnalysis}
                disabled={!weeklyData || !monthlyData || isAnalyzing}
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300 px-8 py-3 text-lg"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                    Analyzing Data...
                  </>
                ) : (
                  <>
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Start Analysis
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <MetricsOverview results={results} />
            <ForecastResults results={results} />
          </div>
        )}
      </div>
    </div>
  );
};