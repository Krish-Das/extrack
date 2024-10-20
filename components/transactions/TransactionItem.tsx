import { cn, formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";
import { HiArrowDown, HiArrowUp } from "react-icons/hi2";
import { IoChevronForwardSharp } from "react-icons/io5";

export default function TransactionItem({
  transaction,
  showDate = true,
}: {
  transaction: transactionSchemaType;
  showDate?: boolean;
}) {
  const transactionDate = formatDate(transaction.date);
  const formattedAmount = formatCurrency(transaction.amount);

  return (
    <>
      <Link
        href={`/transactions/${transaction.id}`}
        // NOTE: This Conditional will be removed on the new redesign
        className={cn(
          "flex items-center justify-between p-4 transition hover:bg-accent hover:text-accent-foreground",
          showDate && "rounded-md bg-card",
        )}
      >
        <div className="flex items-start gap-2">
          {transaction.isExpense ? (
            <HiArrowDown className="text-danger mt-[0.2rem]" />
          ) : (
            <HiArrowUp className="mt-[0.2rem] text-success" />
          )}

          <div>
            {transaction.label ? (
              <h6 className="font-semibold">{transaction.label}</h6>
            ) : (
              <small className="italic text-foreground/40">Add label</small>
            )}

            {showDate && (
              <p className="text-xs text-foreground/60">{transactionDate}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <p
            className={cn(
              "text-sm text-foreground",
              !transaction.isExpense && "text-success",
            )}
          >
            {formattedAmount}
          </p>

          <IoChevronForwardSharp size={12} className="text-primary/30" />
        </div>
      </Link>
    </>
  );
}
