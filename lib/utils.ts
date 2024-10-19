import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

//  TODO: Localize these variables in future
export const LOCALE = "en-IN" as const;
export const TIMEZONE = "Asia/Kolkata" as const;

export type GroupedTransactionsType = {
  [date: string]: transactionSchemaType[];
};

// --- --- General Utility functions --- ---
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function wait(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export function formatCurrency(amount: number) {
  const format = new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  const formattedCurrency = format.format(amount);

  return formattedCurrency;
}

export function formatDate(
  date: Date | string,
  monthLength: "long" | "short" = "short",
  showYear: boolean = false,
) {
  return new Intl.DateTimeFormat(LOCALE, {
    timeZone: TIMEZONE,
    day: "numeric",
    month: monthLength,
    ...(showYear && { year: "numeric" }), // Include 'year' only if showYear is true
  }).format(new Date(date));
}

export function toNormalCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// --- --- Utility functions for Transactions --- ---
export function groupTransactions(transactions: transactionSchemaType[]) {
  const groupedTransactionsObject = transactions.reduce(
    (acc: GroupedTransactionsType, transaction) => {
      const date = formatDate(transaction.date);

      const updatedTransaction = {
        ...transaction,
        amount: transaction.amount / 100,
      };

      if (acc[date]) {
        acc[date].push(updatedTransaction);
      } else {
        acc[date] = [updatedTransaction];
      }

      return acc;
    },
    {} as GroupedTransactionsType, // Initialize as an empty object
  );

  const groupedTransactionsArray = Object.entries(
    groupedTransactionsObject,
  ).map(([date, transactions]) => ({
    Date: date,
    transactions,
  }));

  return groupedTransactionsArray;
}
