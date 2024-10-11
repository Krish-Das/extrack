import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { MAX_TRANSACTION_FETCH_LIMIT } from "./defaultValues";

//  TODO: Localize these variables in future
export const LOCALE = "en-IN" as const;
export const TIMEZONE = "Asia/Kolkata" as const;

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

/**
 * Calculates the offset for paginated database results based on the given page number.
 * The offset is used to determine how many records to skip.
 *
 * @param {number} offsetLevel - The current page number, must be 1 or greater. If a number less than 1 is provided, it defaults to 1.
 * @returns {number} The calculated offset, based on the `MAX_TRANSACTION_FETCH_LIMIT` and page number.
 */
export function calculateTransactionOffset(offsetLevel: number): number {
  const page = Math.max(1, offsetLevel); // Ensure page is at least 1
  return MAX_TRANSACTION_FETCH_LIMIT * (page - 1);
}
