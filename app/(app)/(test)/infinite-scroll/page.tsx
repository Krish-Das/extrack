"use client";

import { fetchTransactions } from "./fetchTransactions";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function TransactionList() {
  const { data, status, error, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["transaction"],
    queryFn: fetchTransactions,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

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

      <div ref={ref} className="rounded bg-gray-200 p-10">
        {isFetching && "Loading..."}
      </div>
    </div>
  );
}
