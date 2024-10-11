import { getTransactions } from "@/actions/handle-transaction";
import TransactionItem from "./TransactionItem";
import InlineNavigation from "../navigation/InlineNavigation";
import EmptyTransaction from "./EmptyTransaction";
import EndOfTransaction from "./EndOfTransaction";
import { notFound } from "next/navigation";

export default async function TransactionDisplay({
  hasAllTransactions = true,
  pageNo,
}: {
  hasAllTransactions?: boolean;
  pageNo?: number;
}) {
  // TODO: Limit the transactions
  const { transactions, error } = await getTransactions(
    hasAllTransactions,
    pageNo,
  );

  // TODO: Build custom components for following cases
  if (error) return <p>{error}</p>;
  if (!transactions) return <p>Unable to load transactions</p>;

  if (pageNo && transactions.length === 0) notFound();

  return (
    <section className="flex flex-col justify-center gap-2">
      {!hasAllTransactions && (
        <InlineNavigation
          heading="Recent transactions"
          href="/transactions"
          linkText="View all"
        />
      )}

      {transactions.length === 0 ? (
        <EmptyTransaction />
      ) : (
        <div className="space-y-1">
          {transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      )}
      {hasAllTransactions && <EndOfTransaction />}
    </section>
  );
}
