import { Skeleton } from "@/components/ui/skeleton";
import { TRANSACTION_PER_PAGE_FETCH_LIMIT } from "@/lib/defaultValues";

export default function InfiniteTransactionWrapper() {
  return (
    <div className="flex flex-col gap-1">
      {Array.from({ length: TRANSACTION_PER_PAGE_FETCH_LIMIT }).map(
        (_, idx) => (
          <TransactionSkeleton key={idx} />
        ),
      )}
    </div>
  );
}

export function TransactionSkeleton() {
  return <Skeleton className="h-[4.5rem] w-full rounded-md" />;
}
