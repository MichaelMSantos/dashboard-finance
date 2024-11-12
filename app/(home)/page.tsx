import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import TransactionPieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";

interface HomeProps {
  searchParams: {
    month: string;
  };
}
const Home = async ({ searchParams: { month } }: HomeProps) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const monthIsInvalid = !month || (!isMatch(month, "MM") && month !== "all");
  if (monthIsInvalid) {
    redirect("/?month=all");
  }

  const dashboard = await getDashboard(month);
  return (
    <>
      <Navbar />
      <div className="p-6 space-y-6 flex flex-col overflow-hidden">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>
        <div className="grid h-full grid-cols-[2fr,1fr] gap-6 overflow-hidden">
          <div className="flex flex-col gap-6 overflow-hidden">
            <SummaryCards month={month} {...dashboard} />

            <div className="grid grid-cols-3 grid-rows-1 gap-6 h-full overflow-hidden">
              <TransactionPieChart {...dashboard} />
              <ExpensesPerCategory
                expensesPerCategory={dashboard.TotalExpensePerCategory}
              />
            </div>
          </div>
          <LastTransactions lastTransactions={dashboard.LastTransactions} />
        </div>
      </div>
    </>
  );
};

export default Home;