export type TransactionType = "income" | "expense";

export type Category =
  | "Salary"
  | "Freelance"
  | "Food & Dining"
  | "Shopping"
  | "Transportation"
  | "Entertainment"
  | "Utilities"
  | "Healthcare"
  | "Rent"
  | "Investment"
  | "Other";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: Category;
  type: TransactionType;
}

export const CATEGORIES: Category[] = [
  "Salary", "Freelance", "Food & Dining", "Shopping", "Transportation",
  "Entertainment", "Utilities", "Healthcare", "Rent", "Investment", "Other",
];

export const CATEGORY_COLORS: Record<Category, string> = {
  "Salary": "hsl(var(--chart-1))",
  "Freelance": "hsl(var(--chart-4))",
  "Food & Dining": "hsl(var(--chart-3))",
  "Shopping": "hsl(var(--chart-5))",
  "Transportation": "hsl(var(--chart-2))",
  "Entertainment": "hsl(var(--chart-1))",
  "Utilities": "hsl(var(--chart-4))",
  "Healthcare": "hsl(var(--chart-3))",
  "Rent": "hsl(var(--chart-5))",
  "Investment": "hsl(var(--chart-2))",
  "Other": "hsl(var(--muted-foreground))",
};

const generateId = () => Math.random().toString(36).slice(2, 10);

export const initialTransactions: Transaction[] = [
  { id: generateId(), date: "2026-03-01", description: "Monthly Salary", amount: 5200, category: "Salary", type: "income" },
  { id: generateId(), date: "2026-03-02", description: "Grocery Store", amount: 87.50, category: "Food & Dining", type: "expense" },
  { id: generateId(), date: "2026-03-03", description: "Uber Ride", amount: 24.00, category: "Transportation", type: "expense" },
  { id: generateId(), date: "2026-03-04", description: "Netflix Subscription", amount: 15.99, category: "Entertainment", type: "expense" },
  { id: generateId(), date: "2026-03-05", description: "Freelance Project", amount: 1200, category: "Freelance", type: "income" },
  { id: generateId(), date: "2026-03-06", description: "Electric Bill", amount: 95.00, category: "Utilities", type: "expense" },
  { id: generateId(), date: "2026-03-07", description: "Coffee Shop", amount: 12.40, category: "Food & Dining", type: "expense" },
  { id: generateId(), date: "2026-03-08", description: "Online Shopping", amount: 156.00, category: "Shopping", type: "expense" },
  { id: generateId(), date: "2026-03-10", description: "Dentist Visit", amount: 200.00, category: "Healthcare", type: "expense" },
  { id: generateId(), date: "2026-03-12", description: "Monthly Rent", amount: 1400.00, category: "Rent", type: "expense" },
  { id: generateId(), date: "2026-03-14", description: "Stock Dividends", amount: 340.00, category: "Investment", type: "income" },
  { id: generateId(), date: "2026-03-15", description: "Restaurant Dinner", amount: 65.00, category: "Food & Dining", type: "expense" },
  { id: generateId(), date: "2026-03-16", description: "Gas Station", amount: 48.00, category: "Transportation", type: "expense" },
  { id: generateId(), date: "2026-03-18", description: "Gym Membership", amount: 45.00, category: "Healthcare", type: "expense" },
  { id: generateId(), date: "2026-03-20", description: "Internet Bill", amount: 60.00, category: "Utilities", type: "expense" },
  { id: generateId(), date: "2026-03-22", description: "Clothing Store", amount: 230.00, category: "Shopping", type: "expense" },
  { id: generateId(), date: "2026-03-24", description: "Concert Tickets", amount: 120.00, category: "Entertainment", type: "expense" },
  { id: generateId(), date: "2026-03-25", description: "Freelance Design", amount: 800.00, category: "Freelance", type: "income" },
  { id: generateId(), date: "2026-03-27", description: "Supermarket", amount: 102.30, category: "Food & Dining", type: "expense" },
  { id: generateId(), date: "2026-03-29", description: "Water Bill", amount: 35.00, category: "Utilities", type: "expense" },
  // February data
  { id: generateId(), date: "2026-02-01", description: "Monthly Salary", amount: 5200, category: "Salary", type: "income" },
  { id: generateId(), date: "2026-02-03", description: "Grocery Store", amount: 95.00, category: "Food & Dining", type: "expense" },
  { id: generateId(), date: "2026-02-05", description: "Freelance Work", amount: 600, category: "Freelance", type: "income" },
  { id: generateId(), date: "2026-02-08", description: "Monthly Rent", amount: 1400.00, category: "Rent", type: "expense" },
  { id: generateId(), date: "2026-02-10", description: "Shopping Mall", amount: 310.00, category: "Shopping", type: "expense" },
  { id: generateId(), date: "2026-02-12", description: "Electricity", amount: 88.00, category: "Utilities", type: "expense" },
  { id: generateId(), date: "2026-02-15", description: "Dining Out", amount: 78.00, category: "Food & Dining", type: "expense" },
  { id: generateId(), date: "2026-02-18", description: "Bus Pass", amount: 55.00, category: "Transportation", type: "expense" },
  { id: generateId(), date: "2026-02-20", description: "Movie Night", amount: 30.00, category: "Entertainment", type: "expense" },
  { id: generateId(), date: "2026-02-25", description: "Doctor Visit", amount: 150.00, category: "Healthcare", type: "expense" },
  // January data
  { id: generateId(), date: "2026-01-01", description: "Monthly Salary", amount: 5200, category: "Salary", type: "income" },
  { id: generateId(), date: "2026-01-05", description: "New Year Shopping", amount: 420.00, category: "Shopping", type: "expense" },
  { id: generateId(), date: "2026-01-08", description: "Monthly Rent", amount: 1400.00, category: "Rent", type: "expense" },
  { id: generateId(), date: "2026-01-10", description: "Groceries", amount: 110.00, category: "Food & Dining", type: "expense" },
  { id: generateId(), date: "2026-01-15", description: "Investment Return", amount: 250.00, category: "Investment", type: "income" },
  { id: generateId(), date: "2026-01-20", description: "Heating Bill", amount: 120.00, category: "Utilities", type: "expense" },
  { id: generateId(), date: "2026-01-25", description: "Taxi", amount: 32.00, category: "Transportation", type: "expense" },
];

export const BALANCE_TREND = [
  { month: "Oct", balance: 8200 },
  { month: "Nov", balance: 9100 },
  { month: "Dec", balance: 8650 },
  { month: "Jan", balance: 10300 },
  { month: "Feb", balance: 11200 },
  { month: "Mar", balance: 12740 },
];
