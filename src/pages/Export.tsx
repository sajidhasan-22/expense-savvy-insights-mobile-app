
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ExportButton from "@/components/ui/ExportButton";
import { transactions } from "@/lib/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const Export = () => {
  const [exportType, setExportType] = useState<"all" | "income" | "expense">("all");
  const [timeRange, setTimeRange] = useState("all-time");
  
  // Filter transactions based on type
  const filteredTransactions = 
    exportType === "all" 
      ? transactions 
      : transactions.filter(t => t.type === exportType);
  
  // Time ranges don't filter real data in this demo, but would in a real app
  const timeRangeOptions = [
    { value: "all-time", label: "All Time" },
    { value: "current-month", label: "Current Month" },
    { value: "last-month", label: "Last Month" },
    { value: "last-3-months", label: "Last 3 Months" },
    { value: "last-6-months", label: "Last 6 Months" },
    { value: "current-year", label: "Current Year" },
  ];
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Export Data</h1>
          <p className="text-muted-foreground mt-1">
            Download your financial data as CSV files
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Transaction Export</CardTitle>
              <CardDescription>
                Download your transactions as a CSV file
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Transaction Type</label>
                <Select 
                  value={exportType} 
                  onValueChange={(value) => setExportType(value as "all" | "income" | "expense")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Transactions</SelectItem>
                    <SelectItem value="income">Income Only</SelectItem>
                    <SelectItem value="expense">Expenses Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Time Range</label>
                <Select 
                  value={timeRange} 
                  onValueChange={setTimeRange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeRangeOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <ExportButton 
                data={filteredTransactions} 
                filename={`${exportType}-transactions-${timeRange}`}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Other Exports</CardTitle>
              <CardDescription>
                Download additional financial data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center p-3 border rounded-md bg-secondary/50">
                <div>
                  <h3 className="font-medium">Budget Report</h3>
                  <p className="text-sm text-muted-foreground">
                    Download your budget vs actual spending
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
              
              <div className="flex justify-between items-center p-3 border rounded-md bg-secondary/50">
                <div>
                  <h3 className="font-medium">Monthly Summary</h3>
                  <p className="text-sm text-muted-foreground">
                    Income and expenses by month
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
              
              <div className="flex justify-between items-center p-3 border rounded-md bg-secondary/50">
                <div>
                  <h3 className="font-medium">Category Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Detailed breakdown by category
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Export;
