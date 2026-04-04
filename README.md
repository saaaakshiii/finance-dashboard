# FinanceFlow — Personal Finance Dashboard

A clean, interactive finance dashboard built with **React**, **TypeScript**, **Tailwind CSS**, and **Recharts** for tracking and understanding financial activity.

🔗 **Live Preview:** [Open Dashboard](https://finance-dashboard-ten-self.vercel.app/)

---

## Features

### 📊 Dashboard Overview
- **Summary Cards** — Total Balance, Income, and Expenses at a glance with trend indicators
- **Balance Trend Chart** — Area chart showing balance over time
- **Spending Breakdown** — Donut chart visualizing expenses by category

### 💳 Transactions
- Full transaction list with Date, Description, Amount, Category, and Type
- **Search** — Filter transactions by description or category keywords
- **Filter by Type** — Income / Expense / All
- **Filter by Category** — Food, Transport, Entertainment, Shopping, Bills, Health, Education, Other
- **Sorting** — Sort by date or amount (ascending/descending)
- **CSV Export** — Download filtered transactions as a `.csv` file

### 🔐 Role-Based UI (Simulated)
- **Admin** — Can add, edit, and delete transactions
- **Viewer** — Read-only access; editing controls are hidden
- Role switcher available in the header for demonstration

### 💡 Insights Panel
- Highest spending category identification
- Month-over-month spending comparison
- Average daily expenditure calculation

### 🌗 Dark Mode
- Toggle between light and dark themes
- Preference persisted in `localStorage`

### 💾 Data Persistence
- All transactions, role selection, and dark mode preference saved to `localStorage`
- Data survives page reloads

### 📱 Responsive Design
- Fully responsive layout adapting to mobile, tablet, and desktop
- Mobile-friendly navigation and table scrolling

### ✨ Additional Enhancements
- Smooth fade-in animations on dashboard cards and sections
- Empty state handling with helpful messaging
- Modal form for adding/editing transactions with validation
- Clean, modern fintech-inspired design system with semantic color tokens

---

## Tech Stack

| Layer            | Technology                        |
|------------------|-----------------------------------|
| Framework        | React 18                          |
| Language         | TypeScript 5                      |
| Build Tool       | Vite 5                            |
| Styling          | Tailwind CSS 3 + CSS Variables    |
| Charts           | Recharts                          |
| Icons            | Lucide React                      |
| UI Components    | shadcn/ui (Radix primitives)      |
| State Management | React Context API                 |
| Routing          | React Router DOM                  |

---

## Getting Started

### Prerequisites
- Node.js 18+ or Bun

### Installation

```bash
# Clone the repository
git clone https://github.com/saaaakshiii/finance-dashboard.git
cd finance-dashboard

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
src/
├── components/
│   ├── BalanceTrendChart.tsx   # Area chart for balance over time
│   ├── Header.tsx             # Top nav with role switch & dark mode
│   ├── InsightsPanel.tsx      # AI-style spending insights
│   ├── SpendingBreakdown.tsx  # Donut chart by category
│   ├── SummaryCards.tsx       # KPI cards (balance, income, expenses)
│   ├── TransactionModal.tsx   # Add/Edit transaction form
│   ├── TransactionsTable.tsx  # Filterable, sortable transaction list
│   └── ui/                    # Reusable shadcn/ui components
├── context/
│   └── FinanceContext.tsx     # Global state management
├── data/
│   └── mockData.ts            # Sample transactions & categories
├── pages/
│   └── Index.tsx              # Main dashboard page
└── index.css                  # Design tokens & theme variables
```

---

## Approach

- **Component-driven architecture** — Each dashboard section is an isolated, reusable component
- **Context-based state** — Single `FinanceProvider` manages all app state with memoized selectors for performance
- **Design tokens** — All colors use CSS custom properties via HSL for seamless theming
- **Graceful edge cases** — Empty states, zero-data handling, and input validation throughout

---

## License

This project was developed for evaluation purposes as part of a frontend assignment.  
It is intended solely for educational and demonstration use.
=======