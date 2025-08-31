import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Award, BarChart3 } from "lucide-react";

interface MetricsOverviewProps {
  results: {
    weeklyResults: Array<{
      column: string;
      mse: number;
      mape: number;
      order: string;
    }>;
    monthlyResults: Array<{
      column: string;
      mse: number;
      mape: number;
      order: string;
    }>;
    bestModels: Array<{
      column: string;
      bestDataset: string;
      mape: number;
    }>;
    overallBest: {
      dataset: string;
      column: string;
      order: string;
      mape: number;
    };
  };
}

export const MetricsOverview = ({ results }: MetricsOverviewProps) => {
  const avgWeeklyMape = results.weeklyResults.reduce((acc, r) => acc + r.mape, 0) / results.weeklyResults.length;
  const avgMonthlyMape = results.monthlyResults.reduce((acc, r) => acc + r.mape, 0) / results.monthlyResults.length;
  const bestPerformingModels = results.bestModels.filter(m => m.mape < 10).length;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Analysis Results</h2>
        <p className="text-muted-foreground">
          Comprehensive Auto-ARIMA forecasting analysis completed
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Weekly Avg MAPE
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgWeeklyMape.toFixed(2)}%</div>
            <Badge variant={avgWeeklyMape < 15 ? "default" : "secondary"} className="mt-2">
              {avgWeeklyMape < 15 ? "Excellent" : "Good"}
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Monthly Avg MAPE
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgMonthlyMape.toFixed(2)}%</div>
            <Badge variant={avgMonthlyMape < 15 ? "default" : "secondary"} className="mt-2">
              {avgMonthlyMape < 15 ? "Excellent" : "Good"}
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Target className="w-4 h-4" />
              Best Performing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bestPerformingModels}/8</div>
            <Badge variant="default" className="mt-2">
              Models &lt;10% MAPE
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Award className="w-4 h-4" />
              Overall Best
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{results.overallBest.mape.toFixed(2)}%</div>
            <Badge variant="default" className="mt-2">
              {results.overallBest.column} - {results.overallBest.dataset}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Best Model Overall
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Dataset</p>
              <p className="font-semibold">{results.overallBest.dataset}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Column</p>
              <p className="font-semibold">{results.overallBest.column}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Model Order</p>
              <p className="font-semibold font-mono text-primary">{results.overallBest.order}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">MAPE</p>
              <p className="font-semibold text-success">{results.overallBest.mape.toFixed(2)}%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};