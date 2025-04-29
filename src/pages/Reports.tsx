
import Layout from "@/components/Layout";
import { monthlyData, transactions } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BarChart from "@/components/charts/BarChart";
import DonutChart from "@/components/charts/DonutChart";
import { getCategorySummary } from "@/lib/data";
import ExportButton from "@/components/ui/ExportButton";

const Reports = () => {
  // Prepare data for charts
  const expenseData = getCategorySummary(transactions, 'expense');
  const incomeData = getCategorySummary(transactions, 'income');
  
  // Colors
  const expenseColors = [
    "#ef4444", "#f97316", "#f59e0b", "#eab308", 
    "#84cc16", "#10b981", "#06b6d4", "#0ea5e9", 
    "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7"
  ];
  
  const incomeColors = [
    "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9", 
    "#3b82f6"
  ];
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
            <p className="text-muted-foreground mt-1">
              Visualize your financial data
            </p>
          </div>
          <ExportButton data={transactions} />
        </div>
        
        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <BarChart 
                data={monthlyData}
                barKeys={[
                  { key: 'income', name: 'Income', color: '#10b981' },
                  { key: 'expense', name: 'Expenses', color: '#ea384c' }
                ]}
                xAxisKey="month"
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Expense and Income Distribution */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Expense Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <DonutChart data={expenseData} colors={expenseColors} />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Income Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <DonutChart data={incomeData} colors={incomeColors} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;
