"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPaginatedData } from "./actions/infiniteAction";
import { TRANSACTION_PER_PAGE_FETCH_LIMIT } from "@/lib/defaultValues";

export default function TransactionList() {
  const { data, status, error, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["transaction"],
    queryFn: async ({ pageParam = 0 }) => fetchPaginatedData(pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.data.length < TRANSACTION_PER_PAGE_FETCH_LIMIT
        ? undefined
        : lastPage.nextOffset,
    initialPageParam: 0,
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
        <div key={page.nextOffset} className="flex flex-col gap-2 p-5">
          {page.data.map((transaction, idx) => (
            <div key={idx} className="p-10">
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
