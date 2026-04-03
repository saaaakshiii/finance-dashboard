import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from "react";
import { Transaction, initialTransactions, type Category, type TransactionType } from "@/data/mockData";

export type Role = "admin" | "viewer";

interface Filters {
  search: string;
  type: TransactionType | "all";
  category: Category | "all";
  sortBy: "date" | "amount";
  sortOrder: "asc" | "desc";
}

interface FinanceContextType {
  transactions: Transaction[];
  role: Role;
  setRole: (role: Role) => void;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  filteredTransactions: Transaction[];
  addTransaction: (t: Omit<Transaction, "id">) => void;
  editTransaction: (id: string, t: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const FinanceContext = createContext<FinanceContextType | null>(null);

export const useFinance = () => {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error("useFinance must be used within FinanceProvider");
  return ctx;
};

const loadFromStorage = <T,>(key: string, fallback: T): T => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() =>
    loadFromStorage("finance_transactions", initialTransactions)
  );
  const [role, setRole] = useState<Role>(() => loadFromStorage("finance_role", "admin"));
  const [darkMode, setDarkMode] = useState(() => loadFromStorage("finance_dark", false));
  const [filters, setFilters] = useState<Filters>({
    search: "",
    type: "all",
    category: "all",
    sortBy: "date",
    sortOrder: "desc",
  });

  useEffect(() => {
    localStorage.setItem("finance_transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("finance_role", JSON.stringify(role));
  }, [role]);

  useEffect(() => {
    localStorage.setItem("finance_dark", JSON.stringify(darkMode));
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleDarkMode = useCallback(() => setDarkMode((d) => !d), []);

  const addTransaction = useCallback((t: Omit<Transaction, "id">) => {
    setTransactions((prev) => [{ ...t, id: Math.random().toString(36).slice(2, 10) }, ...prev]);
  }, []);

  const editTransaction = useCallback((id: string, t: Omit<Transaction, "id">) => {
    setTransactions((prev) => prev.map((tx) => (tx.id === id ? { ...t, id } : tx)));
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  }, []);

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];
    if (filters.type !== "all") result = result.filter((t) => t.type === filters.type);
    if (filters.category !== "all") result = result.filter((t) => t.category === filters.category);
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter((t) => t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
    }
    result.sort((a, b) => {
      const mul = filters.sortOrder === "asc" ? 1 : -1;
      if (filters.sortBy === "date") return mul * (new Date(a.date).getTime() - new Date(b.date).getTime());
      return mul * (a.amount - b.amount);
    });
    return result;
  }, [transactions, filters]);

  const totalIncome = useMemo(() => transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0), [transactions]);
  const totalExpenses = useMemo(() => transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0), [transactions]);
  const balance = totalIncome - totalExpenses;

  return (
    <FinanceContext.Provider
      value={{
        transactions, role, setRole, filters, setFilters, filteredTransactions,
        addTransaction, editTransaction, deleteTransaction,
        totalIncome, totalExpenses, balance, darkMode, toggleDarkMode,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};
