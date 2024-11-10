import { Badge } from "@/app/_components/ui/badge";
import { Transaction, TransactionType } from "@prisma/client";
import { CircleIcon } from "lucide-react";

interface TransactionTypeBadgeProps {
  transaction: Transaction;
}
const TransactionTypeBadge = ({ transaction }: TransactionTypeBadgeProps) => {
  if (transaction.type === TransactionType.DEPOSIT) {
    return (
      <Badge className="text-primary font-bold bg-muted hover:bg-muted">
        <CircleIcon className="fill-primary mr-2" size={10} />
        Depósito
      </Badge>
    );
  }

  if (transaction.type === TransactionType.EXPENSE) {
    return (
      <Badge className="text-danger font-bold bg-danger bg-opacity-10 hover:bg-muted">
        <CircleIcon className="fill-danger mr-2" size={10} />
        Despesa
      </Badge>
    );
  }

  if (transaction.type === TransactionType.INVESTMENT) {
    return (
      <Badge className="text-white font-bold bg-muted hover:bg-muted">
        <CircleIcon className="fill-white mr-2" size={10} />
        Investimento
      </Badge>
    );
  }
};
export default TransactionTypeBadge;
