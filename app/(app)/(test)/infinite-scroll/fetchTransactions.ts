const transactions = Array.from({ length: 100 }).map((_, i) => ({
  id: i,
  label: `Transaction ${i}`,
}));
type TTransactionType = (typeof transactions)[0];
const LIMIT = 10;

export function fetchTransactions({
  pageParam,
}: {
  pageParam: number;
}): Promise<{
  data: TTransactionType[];
  currentPage: number;
  nextPage: number | null;
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: transactions.slice(pageParam, pageParam + LIMIT),
        currentPage: pageParam,
        nextPage:
          pageParam + LIMIT < transactions.length ? pageParam + LIMIT : null,
      });
    }, 1000);
  });
}
