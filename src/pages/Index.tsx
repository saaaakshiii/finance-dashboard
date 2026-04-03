import { FinanceProvider } from "@/context/FinanceContext";
import Header from "@/components/Header";
import SummaryCards from "@/components/SummaryCards";
import BalanceTrendChart from "@/components/BalanceTrendChart";
import SpendingBreakdown from "@/components/SpendingBreakdown";
import InsightsPanel from "@/components/InsightsPanel";
import TransactionsTable from "@/components/TransactionsTable";

const Dashboard = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="container py-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Dashboard</h2>
        <p className="text-sm text-muted-foreground">Track and manage your financial activity</p>
      </div>
      <SummaryCards />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <BalanceTrendChart />
        <SpendingBreakdown />
      </div>
      <InsightsPanel />
      <TransactionsTable />
    </main>
  </div>
);

const Index = () => (
  <FinanceProvider>
    <Dashboard />
  </FinanceProvider>
);

export default Index;
