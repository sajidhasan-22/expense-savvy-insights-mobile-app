
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DonutChart from "@/components/charts/DonutChart";
import { Transaction, getCategorySummary } from "@/lib/data";

interface ExpenseSummaryProps {
  transactions: Transaction[];
}

export default function ExpenseSummary({ transactions }: ExpenseSummaryProps) {
  const expenseData = getCategorySummary(transactions, 'expense');
  
  // Custom colors for expense categories
  const expenseColors = [
    "#ef4444", // red
    "#f97316", // orange
    "#f59e0b", // amber
    "#eab308", // yellow
    "#84cc16", // lime
    "#10b981", // emerald
    "#06b6d4", // cyan
    "#0ea5e9", // sky
    "#3b82f6", // blue
    "#6366f1", // indigo
    "#8b5cf6", // violet
    "#a855f7", // purple
  ];
  
  return (
    <Card className="animate-fade-in animation-delay-200">
      <CardHeader>
        <CardTitle className="text-lg">Expense Summary</CardTitle>
      </CardHeader>
      <CardContent>
        {expenseData.length > 0 ? (
          <div className="h-[300px]">
            <DonutChart data={expenseData} colors={expenseColors} />
          </div>
        ) : (
          <div className="flex h-[300px] items-center justify-center">
            <p className="text-muted-foreground">No expense data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
