import { useFinance } from "@/context/FinanceContext";
import { useMemo } from "react";
import { TrendingUp, TrendingDown, PieChart, BarChart3 } from "lucide-react";

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

const InsightsPanel = () => {
  const { transactions } = useFinance();

  const insights = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "expense");

    // Highest spending category
    const catMap = new Map<string, number>();
    expenses.forEach((t) => catMap.set(t.category, (catMap.get(t.category) || 0) + t.amount));
    const topCategory = [...catMap.entries()].sort((a, b) => b[1] - a[1])[0];

    // Monthly comparison
    const byMonth = new Map<string, { income: number; expense: number }>();
    transactions.forEach((t) => {
      const month = t.date.slice(0, 7);
      const m = byMonth.get(month) || { income: 0, expense: 0 };
      if (t.type === "income") m.income += t.amount;
      else m.expense += t.amount;
      byMonth.set(month, m);
    });
    const months = [...byMonth.entries()].sort((a, b) => b[0].localeCompare(a[0]));
    const currentMonth = months[0];
    const prevMonth = months[1];

    const expenseChange = prevMonth
      ? ((currentMonth[1].expense - prevMonth[1].expense) / prevMonth[1].expense) * 100
      : 0;

    // Largest single transaction
    const largest = expenses.sort((a, b) => b.amount - a.amount)[0];

    // Average daily spending
    const avgDaily = expenses.length > 0
      ? expenses.reduce((s, t) => s + t.amount, 0) / 30
      : 0;

    return [
      {
        title: "Top Spending Category",
        value: topCategory ? topCategory[0] : "N/A",
        sub: topCategory ? formatCurrency(topCategory[1]) : "",
        icon: PieChart,
        color: "text-primary",
      },
      {
        title: "Monthly Expense Change",
        value: `${expenseChange >= 0 ? "+" : ""}${expenseChange.toFixed(1)}%`,
        sub: `vs ${prevMonth ? prevMonth[0] : "N/A"}`,
        icon: expenseChange >= 0 ? TrendingUp : TrendingDown,
        color: expenseChange >= 0 ? "text-destructive" : "text-success",
      },
      {
        title: "Largest Expense",
        value: largest ? formatCurrency(largest.amount) : "N/A",
        sub: largest ? largest.description : "",
        icon: BarChart3,
        color: "text-warning",
      },
      {
        title: "Avg. Daily Spending",
        value: formatCurrency(avgDaily),
        sub: "Based on 30-day period",
        icon: TrendingDown,
        color: "text-muted-foreground",
      },
    ];
  }, [transactions]);

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm animate-fade-in" style={{ animationDelay: "480ms" }}>
      <h3 className="mb-4 text-sm font-semibold text-foreground">Key Insights</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {insights.map((insight, i) => (
          <div key={i} className="flex items-start gap-3 rounded-lg bg-secondary/50 p-3">
            <div className={`mt-0.5 ${insight.color}`}>
              <insight.icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{insight.title}</p>
              <p className="text-sm font-semibold text-foreground">{insight.value}</p>
              <p className="text-xs text-muted-foreground">{insight.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightsPanel;
