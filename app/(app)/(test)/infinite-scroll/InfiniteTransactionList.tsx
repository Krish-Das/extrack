"use client";

import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPaginatedData } from "./actions/infiniteAction";
import { TRANSACTION_PER_PAGE_FETCH_LIMIT } from "@/lib/defaultValues";
import InfiniteTransactionWrapper from "./InfiniteTransactionSkeleton";

export default function InfiniteTransactionList() {
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
    <InfiniteTransactionWrapper />
  ) : status === "error" ? (
    <p>{error.message}</p>
  ) : (
    <div className="mb-1 flex flex-col">
      {data.pages.map((page) => (
        <Fragment key={page.nextOffset}>
          {page.data.map((transaction, idx) => (
            <div key={idx} className="h-16 w-full rounded-md bg-secondary">
              - {transaction.label}
            </div>
          ))}
        </Fragment>
      ))}

      <div ref={ref}>{isFetching && <InfiniteTransactionWrapper />}</div>
    </div>
  );
}
