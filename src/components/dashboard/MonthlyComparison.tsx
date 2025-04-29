
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BarChart from "@/components/charts/BarChart";
import { MonthData } from "@/lib/data";

interface MonthlyComparisonProps {
  data: MonthData[];
}

export default function MonthlyComparison({ data }: MonthlyComparisonProps) {
  const barKeys = [
    { key: 'income', name: 'Income', color: '#10b981' },
    { key: 'expense', name: 'Expenses', color: '#ea384c' },
  ];
  
  return (
    <Card className="col-span-3 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg">Monthly Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <BarChart
            data={data}
            barKeys={barKeys}
            xAxisKey="month"
          />
        </div>
      </CardContent>
    </Card>
  );
}
