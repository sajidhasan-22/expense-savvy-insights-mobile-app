
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction, formatCurrency, getFormattedDate } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ArrowRight, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const recentTransactions = transactions.slice(0, 5);
  
  return (
    <Card className="animate-fade-in animation-delay-400">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Recent Transactions</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/transactions" className="flex items-center gap-1">
            View All <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {recentTransactions.length > 0 ? (
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full",
                    transaction.type === 'income' ? "bg-income/10 text-income" : "bg-expense/10 text-expense"
                  )}>
                    <ClipboardList className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {transaction.category} • {getFormattedDate(transaction.date)}
                    </p>
                  </div>
                </div>
                <div className={cn(
                  "font-medium",
                  transaction.type === 'income' ? "text-income" : "text-expense"
                )}>
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-[200px] items-center justify-center">
            <p className="text-muted-foreground">No recent transactions</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
