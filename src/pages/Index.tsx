
import Layout from "@/components/Layout";
import { ArrowDownIcon, ArrowUpIcon, Coins, DollarSign } from "lucide-react";
import OverviewCard from "@/components/dashboard/OverviewCard";
import ExpenseSummary from "@/components/dashboard/ExpenseSummary";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import MonthlyComparison from "@/components/dashboard/MonthlyComparison";
import { formatCurrency, getTotal, monthlyData, transactions } from "@/lib/data";

const Dashboard = () => {
  // Calculate totals
  const totalIncome = getTotal(transactions, 'income');
  const totalExpenses = getTotal(transactions, 'expense');
  const balance = totalIncome - totalExpenses;
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of your financial situation
          </p>
        </div>
        
        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <OverviewCard
            title="Total Income"
            value={formatCurrency(totalIncome)}
            icon={<ArrowUpIcon className="h-4 w-4" />}
            change={{ value: 12, positive: true }}
          />
          <OverviewCard
            title="Total Expenses"
            value={formatCurrency(totalExpenses)}
            icon={<ArrowDownIcon className="h-4 w-4" />}
            change={{ value: 8, positive: false }}
          />
          <OverviewCard
            title="Current Balance"
            value={formatCurrency(balance)}
            icon={<Coins className="h-4 w-4" />}
            change={{ value: 4, positive: balance >= 0 }}
          />
        </div>
        
        {/* Charts and Data */}
        <div className="grid gap-4 md:grid-cols-3">
          <MonthlyComparison data={monthlyData} />
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <ExpenseSummary transactions={transactions} />
          <RecentTransactions transactions={transactions} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
