"use server";
import { db } from "@/db";
import { transax } from "@/db/drizzle/schema";
import { currentUser } from "@clerk/nextjs";
import { and, desc, eq, sql } from "drizzle-orm";

export async function fetchTransactions() {
  const user = await currentUser();
  if (!user) return;

  const userId = user.id;

  const prepareGetTransaction = db
    .select()
    .from(transax)
    .where(eq(transax.userId, sql.placeholder("userId")))
    .orderBy(desc(transax.date))
    .prepare("prepareGetTransaction");

  const data = await prepareGetTransaction.execute({ userId });

  const transactions =
    data &&
    data.map(({ ...transaction }) => ({
      ...transaction,
      amount: transaction.amount / 100,
    }));

  return { transactions };
}
