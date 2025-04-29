
import { Button } from "./button";
import { DownloadIcon } from "lucide-react";
import { Transaction } from "@/lib/data";
import { useToast } from "./use-toast";

interface ExportButtonProps {
  data: Transaction[];
  filename?: string;
}

export default function ExportButton({ 
  data, 
  filename = 'transactions-export'
}: ExportButtonProps) {
  const { toast } = useToast();

  const exportToCSV = () => {
    if (data.length === 0) {
      toast({
        title: "No data to export",
        description: "There are no transactions to export",
        variant: "destructive",
      });
      return;
    }
    
    // Get headers from the first transaction
    const headers = Object.keys(data[0]).join(',');
    
    // Map transactions to CSV rows
    const csvContent = data.map(transaction => {
      return Object.values(transaction).join(',');
    });
    
    // Create CSV content with headers
    const csv = [headers, ...csvContent].join('\n');
    
    // Create a blob with the CSV content
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    
    // Create a download link
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export successful",
      description: "Your data has been exported as a CSV file",
    });
  };
  
  return (
    <Button onClick={exportToCSV} className="flex items-center">
      <DownloadIcon className="mr-2 h-4 w-4" />
      Export to CSV
    </Button>
  );
}
