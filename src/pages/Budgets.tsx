
import Layout from "@/components/Layout";
import { budgets, formatCurrency } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const Budgets = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Budgets</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage your spending limits
          </p>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {budgets.map((budget) => {
            const percentUsed = (budget.spent / budget.amount) * 100;
            let progressColor = "bg-budget-low";
            
            if (percentUsed >= 90) {
              progressColor = "bg-budget-high";
            } else if (percentUsed >= 70) {
              progressColor = "bg-budget-medium";
            }
            
            return (
              <Card key={budget.id} className="animate-fade-in">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{budget.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">
                        {formatCurrency(budget.spent)}
                      </span>
                      <span className="text-sm font-medium">
                        {formatCurrency(budget.amount)}
                      </span>
                    </div>
                    <Progress 
                      value={percentUsed} 
                      className={cn("h-2", progressColor)} 
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>
                        {formatCurrency(budget.amount - budget.spent)} remaining
                      </span>
                      <span>{percentUsed.toFixed(0)}% used</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Budgets;
