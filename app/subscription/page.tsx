import { auth, clerkClient } from "@clerk/nextjs/server";
import Navbar from "../_components/navbar";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "../_components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";
import AcquirePlanButton from "./_components/acquire-plan-button";
import { Badge } from "../_components/ui/badge";
import { getCurrentMonthTransactions } from "../_data/get-current-month-transactions";

const SubscriptionPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  const user = await clerkClient().users.getUser(userId);
  const currentMonthTransactions = await getCurrentMonthTransactions();
  const hasPremiumPlan = user.publicMetadata.subscriptionPlan === "premium";

  return (
    <>
      <Navbar />
      <div className="space-y-6 p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold">Assinatura</h1>

        <div className="flex flex-col gap-6 sm:flex-row">
          <Card className="w-full sm:w-[450px]">
            <CardHeader className="border-b border-solid py-6 sm:py-8">
              <h2 className="text-center text-xl sm:text-2xl font-semibold">
                Plano Básico
              </h2>
              <div className="flex items-center justify-center gap-1 sm:gap-3 mt-4">
                <span className="text-3xl sm:text-4xl">R$</span>
                <span className="text-5xl sm:text-6xl font-semibold">0</span>
                <div className="text-lg sm:text-2xl text-muted-foreground">
                  /mês
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 py-6 sm:py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p className="text-sm sm:text-base">
                  Apenas 10 transações por mês ({currentMonthTransactions}/10)
                </p>
              </div>
              <div className="flex items-center gap-2">
                <XIcon />
                <p className="text-sm sm:text-base">Relatórios de IA</p>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full sm:w-[450px]">
            <CardHeader className="relative border-b border-solid py-6 sm:py-8">
              {hasPremiumPlan && (
                <Badge className="absolute left-4 top-4 sm:top-12 bg-primary/10 text-primary">
                  Ativo
                </Badge>
              )}
              <h2 className="text-center text-xl sm:text-2xl font-semibold">
                Plano Premium
              </h2>
              <div className="flex items-center justify-center gap-1 sm:gap-3 mt-4">
                <span className="text-3xl sm:text-4xl">R$</span>
                <span className="text-5xl sm:text-6xl font-semibold">15</span>
                <div className="text-lg sm:text-2xl text-muted-foreground">
                  /mês
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 py-6 sm:py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p className="text-sm sm:text-base">Transações ilimitadas</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p className="text-sm sm:text-base">Relatórios de IA</p>
              </div>
              <div className="mt-4">
                <AcquirePlanButton />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPage;
