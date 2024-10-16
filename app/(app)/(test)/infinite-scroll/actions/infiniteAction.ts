"use server";

import { db } from "@/db";
import { transax } from "@/db/drizzle/schema";
import { TRANSACTION_PER_PAGE_FETCH_LIMIT } from "@/lib/defaultValues";
import { auth } from "@clerk/nextjs/server";
import { sql, eq, desc } from "drizzle-orm";

export async function fetchPaginatedData(
  offset: number = 0,
  limit: number = TRANSACTION_PER_PAGE_FETCH_LIMIT,
) {
  try {
    const { userId } = auth();

    if (!userId) throw new Error("User not found");

    const data = await db
      .select()
      .from(transax)
      .where(eq(transax.userId, userId))
      .orderBy(desc(transax.date))
      .limit(limit)
      .offset(offset);

    const transactions =
      data &&
      data.map(({ ...transaction }) => ({
        ...transaction,
        amount: transaction.amount / 100,
      }));

    const totalCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(transax)
      .then((res) => res[0].count);

    return {
      data: transactions,
      totalCount,
      nextOffset: offset + limit,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
}
