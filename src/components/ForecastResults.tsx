import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Calendar, Activity } from "lucide-react";

interface ForecastResultsProps {
  results: {
    weeklyResults: Array<{
      column: string;
      mse: number;
      mape: number;
      order: string;
      forecast: number[];
    }>;
    monthlyResults: Array<{
      column: string;
      mse: number;
      mape: number;
      order: string;
      forecast: number[];
    }>;
    bestModels: Array<{
      column: string;
      bestDataset: string;
      mape: number;
    }>;
  };
}

export const ForecastResults = ({ results }: ForecastResultsProps) => {
  const renderResultsTable = (data: any[], type: string) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((item, index) => (
          <Card key={index} className="bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                {item.column}
                <Badge variant={item.mape < 10 ? "default" : item.mape < 15 ? "secondary" : "outline"}>
                  {item.mape < 10 ? "Excellent" : item.mape < 15 ? "Good" : "Fair"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">MAPE</p>
                  <p className="font-semibold text-lg">{item.mape.toFixed(2)}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">MSE</p>
                  <p className="font-semibold text-lg">{item.mse.toFixed(0)}</p>
                </div>
              </div>
              
              <div>
                <p className="text-xs text-muted-foreground">Model Order</p>
                <p className="font-mono text-sm text-primary">{item.order}</p>
              </div>
              
              <div>
                <p className="text-xs text-muted-foreground mb-2">12-Month Forecast</p>
                <div className="h-12 flex items-end gap-1">
                  {item.forecast.slice(0, 6).map((value: number, i: number) => (
                    <div
                      key={i}
                      className="bg-primary/20 rounded-t flex-1"
                      style={{ height: `${(value / Math.max(...item.forecast)) * 100}%` }}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <Card className="bg-gradient-card border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Forecasting Results by Dataset
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="weekly" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Weekly Data
            </TabsTrigger>
            <TabsTrigger value="monthly" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Monthly Data
            </TabsTrigger>
            <TabsTrigger value="best" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Best Models
            </TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">Weekly Sales Forecasting</h3>
              <p className="text-muted-foreground">
                Auto-ARIMA analysis results for weekly pharmaceutical sales data
              </p>
            </div>
            {renderResultsTable(results.weeklyResults, "Weekly")}
          </TabsContent>

          <TabsContent value="monthly" className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">Monthly Sales Forecasting</h3>
              <p className="text-muted-foreground">
                Auto-ARIMA analysis results for monthly pharmaceutical sales data
              </p>
            </div>
            {renderResultsTable(results.monthlyResults, "Monthly")}
          </TabsContent>

          <TabsContent value="best" className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">Best Models per Column</h3>
              <p className="text-muted-foreground">
                Optimal models selected based on lowest MAPE scores
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {results.bestModels.map((item, index) => (
                <Card key={index} className="bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center justify-between">
                      {item.column}
                      <Badge variant="default">
                        Best
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Best Dataset</p>
                      <p className="font-semibold text-lg">{item.bestDataset}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">MAPE</p>
                      <p className="font-semibold text-lg text-success">{item.mape.toFixed(2)}%</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};