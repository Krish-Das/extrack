"use client";

import { fetchTransactions } from "./fetchTransactions";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function TransactionList() {
  const { data, status, error } = useInfiniteQuery({
    queryKey: ["transaction"],
    queryFn: fetchTransactions,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  return status === "pending" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>{error.message}</p>
  ) : (
    <div>
      {data.pages.map((page) => (
        <div key={page.currentPage} className="flex flex-col gap-2 p-5">
          {page.data.map((transaction) => (
            <div key={transaction.id} className="p-10">
              - {transaction.label}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
