import { BALANCE_TREND } from "@/data/mockData";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const BalanceTrendChart = () => (
  <div className="rounded-xl border border-border bg-card p-5 shadow-sm animate-fade-in" style={{ animationDelay: "320ms" }}>
    <h3 className="mb-4 text-sm font-semibold text-foreground">Balance Trend</h3>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={BALANCE_TREND} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(230, 80%, 56%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(230, 80%, 56%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
          <Tooltip
            contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "13px" }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, "Balance"]}
          />
          <Area type="monotone" dataKey="balance" stroke="hsl(230, 80%, 56%)" strokeWidth={2.5} fill="url(#balanceGrad)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default BalanceTrendChart;
