
import Layout from "@/components/Layout";
import TransactionList from "@/components/transactions/TransactionList";
import TransactionForm from "@/components/transactions/TransactionForm";
import { transactions } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Trash2, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { TooltipProvider } from "@/components/ui/tooltip";

const Transactions = () => {
  const [localTransactions, setLocalTransactions] = useState(transactions);
  const [darkMode, setDarkMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if dark mode was previously enabled
    const isDarkMode = document.documentElement.classList.contains('dark');
    setDarkMode(isDarkMode);
  }, []);

  const handleClearAll = () => {
    setLocalTransactions([]);
    toast({
      title: "All transactions cleared",
      description: "Your transaction history has been cleared successfully",
    });
  };

  const handleAddTransaction = (newTransaction) => {
    setLocalTransactions([newTransaction, ...localTransactions]);
    toast({
      title: "Transaction Added",
      description: "Your new transaction has been saved successfully",
    });
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    // Apply dark mode to document
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    toast({
      title: newDarkMode ? "Dark Mode Enabled" : "Light Mode Enabled",
      description: `The ${newDarkMode ? "dark" : "light"} mode has been activated`,
    });
  };
  
  return (
    <Layout>
      <TooltipProvider>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
              <p className="text-muted-foreground mt-1">
                View and manage your transactions
              </p>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-2">
                <Moon className="h-4 w-4" />
                <Switch 
                  checked={darkMode} 
                  onCheckedChange={toggleDarkMode}
                />
                <span className="text-sm">Dark mode</span>
              </div>
              <TransactionForm onAddTransaction={handleAddTransaction} />
              <Button variant="destructive" onClick={handleClearAll}>
                <Trash2 className="mr-2 h-4 w-4" />
                Clear All
              </Button>
            </div>
          </div>
          
          <TransactionList transactions={localTransactions} />
        </div>
      </TooltipProvider>
    </Layout>
  );
};

export default Transactions;
