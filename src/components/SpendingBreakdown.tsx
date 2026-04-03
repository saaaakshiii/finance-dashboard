import { useFinance } from "@/context/FinanceContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { CATEGORY_COLORS, type Category } from "@/data/mockData";
import { useMemo } from "react";

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

const SpendingBreakdown = () => {
  const { transactions } = useFinance();

  const data = useMemo(() => {
    const map = new Map<Category, number>();
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => map.set(t.category, (map.get(t.category) || 0) + t.amount));
    return Array.from(map.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm animate-fade-in" style={{ animationDelay: "400ms" }}>
      <h3 className="mb-4 text-sm font-semibold text-foreground">Spending Breakdown</h3>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <div className="h-48 w-48 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={2} dataKey="value">
                {data.map((entry) => (
                  <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))", 
                borderRadius: "8px", 
                fontSize: "13px",
                color: "hsl(var(--foreground))" }}
                labelStyle={{
                  color:"hsl(var(--foreground))"
                }}
                itemStyle={{
                  color:"hsl(var(--foreground))"
                }}
                formatter={(value: number) => [formatCurrency(value)]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-2 w-full">
          {data.slice(0, 5).map((d) => (
            <div key={d.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[d.name] }} />
                <span className="text-muted-foreground">{d.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium text-foreground">{formatCurrency(d.value)}</span>
                <span className="text-xs text-muted-foreground w-10 text-right">{((d.value / total) * 100).toFixed(0)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpendingBreakdown;
