import { useFinance } from "@/context/FinanceContext";
import { useState } from "react";
import { Search, SlidersHorizontal, ArrowUpDown, Plus, Pencil, Trash2, Download } from "lucide-react";
import { CATEGORIES, type Category, type TransactionType } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import TransactionModal from "@/components/TransactionModal";

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

const TransactionsTable = () => {
  const { filteredTransactions, filters, setFilters, role, deleteTransaction } = useFinance();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const toggleSort = (field: "date" | "amount") => {
    setFilters((f) => ({
      ...f,
      sortBy: field,
      sortOrder: f.sortBy === field && f.sortOrder === "desc" ? "asc" : "desc",
    }));
  };

  const exportCSV = () => {
    const header = "Date,Description,Amount,Category,Type\n";
    const rows = filteredTransactions
      .map((t) => `${t.date},"${t.description}",${t.amount},${t.category},${t.type}`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm animate-fade-in" style={{ animationDelay: "560ms" }}>
      <div className="flex flex-col gap-3 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-sm font-semibold text-foreground">Transactions</h3>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              value={filters.search}
              onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
              className="h-9 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring sm:w-48"
            />
          </div>
          <select
            value={filters.type}
            onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value as TransactionType | "all" }))}
            className="h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select
            value={filters.category}
            onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value as Category | "all" }))}
            className="h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <Button variant="outline" size="sm" onClick={exportCSV} className="h-9 gap-1.5">
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          {role === "admin" && (
            <Button size="sm" onClick={() => { setEditingId(null); setShowModal(true); }} className="h-9 gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Add</span>
            </Button>
          )}
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <SlidersHorizontal className="mb-3 h-8 w-8" />
          <p className="text-sm font-medium">No transactions found</p>
          <p className="text-xs">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground">
                <th className="px-5 py-3 text-left font-medium">
                  <button onClick={() => toggleSort("date")} className="flex items-center gap-1 hover:text-foreground">
                    Date <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-5 py-3 text-left font-medium">Description</th>
                <th className="px-5 py-3 text-left font-medium">Category</th>
                <th className="px-5 py-3 text-right font-medium">
                  <button onClick={() => toggleSort("amount")} className="ml-auto flex items-center gap-1 hover:text-foreground">
                    Amount <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                {role === "admin" && <th className="px-5 py-3 text-right font-medium">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((t) => (
                <tr key={t.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                  <td className="px-5 py-3 text-sm text-muted-foreground whitespace-nowrap">
                    {new Date(t.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </td>
                  <td className="px-5 py-3 text-sm font-medium text-foreground">{t.description}</td>
                  <td className="px-5 py-3">
                    <span className="inline-flex rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                      {t.category}
                    </span>
                  </td>
                  <td className={`px-5 py-3 text-right text-sm font-semibold font-mono ${t.type === "income" ? "text-success" : "text-destructive"}`}>
                    {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                  </td>
                  {role === "admin" && (
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => { setEditingId(t.id); setShowModal(true); }}
                          className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => deleteTransaction(t.id)}
                          className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <TransactionModal
          editingId={editingId}
          onClose={() => { setShowModal(false); setEditingId(null); }}
        />
      )}
    </div>
  );
};

export default TransactionsTable;
