import { useFinance } from "@/context/FinanceContext";
import { DollarSign, TrendingUp, TrendingDown, Wallet } from "lucide-react";

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

const cards = [
  { key: "balance" as const, label: "Total Balance", icon: Wallet, color: "text-primary" },
  { key: "income" as const, label: "Total Income", icon: TrendingUp, color: "text-success" },
  { key: "expenses" as const, label: "Total Expenses", icon: TrendingDown, color: "text-destructive" },
  { key: "savings" as const, label: "Savings Rate", icon: DollarSign, color: "text-warning" },
];

const SummaryCards = () => {
  const { balance, totalIncome, totalExpenses } = useFinance();
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

  const getValue = (key: string) => {
    switch (key) {
      case "balance": return formatCurrency(balance);
      case "income": return formatCurrency(totalIncome);
      case "expenses": return formatCurrency(totalExpenses);
      case "savings": return `${savingsRate.toFixed(1)}%`;
      default: return "";
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, i) => (
        <div
          key={card.key}
          className="group rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md animate-fade-in"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">{card.label}</p>
            <card.icon className={`h-4 w-4 ${card.color}`} />
          </div>
          <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">{getValue(card.key)}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
