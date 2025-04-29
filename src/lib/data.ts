
export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  description: string;
  type: 'income' | 'expense';
}

export interface Budget {
  id: string;
  category: string;
  amount: number;
  spent: number;
}

export interface MonthData {
  month: string;
  income: number;
  expense: number;
}

// Sample transaction categories
export const expenseCategories = [
  'Housing', 'Utilities', 'Groceries', 'Transportation', 
  'Health', 'Insurance', 'Personal', 'Entertainment', 
  'Education', 'Dining Out', 'Shopping', 'Miscellaneous'
];

export const incomeCategories = [
  'Salary', 'Freelance', 'Investments', 'Gifts', 'Other Income'
];

// Sample transactions
export const transactions: Transaction[] = [
  {
    id: '1',
    date: '2025-04-25',
    amount: 2500,
    category: 'Salary',
    description: 'Monthly salary',
    type: 'income',
  },
  {
    id: '2',
    date: '2025-04-24',
    amount: 150,
    category: 'Groceries',
    description: 'Weekly groceries',
    type: 'expense',
  },
  {
    id: '3',
    date: '2025-04-22',
    amount: 45.99,
    category: 'Entertainment',
    description: 'Movie tickets and snacks',
    type: 'expense',
  },
  {
    id: '4',
    date: '2025-04-21',
    amount: 1200,
    category: 'Housing',
    description: 'Monthly rent',
    type: 'expense',
  },
  {
    id: '5',
    date: '2025-04-20',
    amount: 85,
    category: 'Utilities',
    description: 'Electricity bill',
    type: 'expense',
  },
  {
    id: '6',
    date: '2025-04-19',
    amount: 320,
    category: 'Freelance',
    description: 'Logo design project',
    type: 'income',
  },
  {
    id: '7',
    date: '2025-04-18',
    amount: 65,
    category: 'Dining Out',
    description: 'Dinner with friends',
    type: 'expense',
  },
  {
    id: '8',
    date: '2025-04-15',
    amount: 120,
    category: 'Shopping',
    description: 'New clothes',
    type: 'expense',
  },
];

// Sample budgets
export const budgets: Budget[] = [
  { id: '1', category: 'Housing', amount: 1300, spent: 1200 },
  { id: '2', category: 'Utilities', amount: 200, spent: 185 },
  { id: '3', category: 'Groceries', amount: 400, spent: 350 },
  { id: '4', category: 'Transportation', amount: 150, spent: 145 },
  { id: '5', category: 'Entertainment', amount: 100, spent: 95 },
  { id: '6', category: 'Dining Out', amount: 200, spent: 165 },
];

// Sample monthly data
export const monthlyData: MonthData[] = [
  { month: 'Jan', income: 3000, expense: 2700 },
  { month: 'Feb', income: 3200, expense: 2900 },
  { month: 'Mar', income: 2800, expense: 2600 },
  { month: 'Apr', income: 2820, expense: 2250 },
  { month: 'May', income: 3100, expense: 2400 },
  { month: 'Jun', income: 3400, expense: 2800 },
];

// Helper functions
export const getTotal = (items: Transaction[], type: 'income' | 'expense'): number => {
  return items
    .filter(item => item.type === type)
    .reduce((sum, item) => sum + item.amount, 0);
};

export const getCategoryTotal = (items: Transaction[], category: string): number => {
  return items
    .filter(item => item.category === category)
    .reduce((sum, item) => sum + item.amount, 0);
};

export const getCategorySummary = (items: Transaction[], type: 'income' | 'expense'): { name: string; value: number }[] => {
  const filteredItems = items.filter(item => item.type === type);
  const categories = type === 'income' ? incomeCategories : expenseCategories;
  
  const result = categories.map(category => {
    const total = filteredItems
      .filter(item => item.category === category)
      .reduce((sum, item) => sum + item.amount, 0);
    
    return {
      name: category,
      value: total,
    };
  });
  
  return result.filter(item => item.value > 0);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};

export const getFormattedDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};
