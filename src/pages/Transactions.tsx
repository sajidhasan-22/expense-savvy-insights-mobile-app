
import Layout from "@/components/Layout";
import TransactionList from "@/components/transactions/TransactionList";
import TransactionForm from "@/components/transactions/TransactionForm";
import { transactions } from "@/lib/data";

const Transactions = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
            <p className="text-muted-foreground mt-1">
              View and manage your transactions
            </p>
          </div>
          <TransactionForm />
        </div>
        
        <TransactionList transactions={transactions} />
      </div>
    </Layout>
  );
};

export default Transactions;
