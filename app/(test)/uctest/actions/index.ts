"use server";

import { db } from "@/db";
import { transax } from "@/db/drizzle/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export const getTransactions = async () => {
  const user = await currentUser();

  if (!user) return { error: "You must be signed in to add transaction" };

  const cachedTransactions = unstable_cache(
    async (userId: string) => {
      try {
        const data = await db
          .select()
          .from(transax)
          .where(eq(transax.userId, userId))
          .orderBy(desc(transax.date));

        const transactions =
          data &&
          data.map(({ ...transaction }) => ({
            ...transaction,
            amount: transaction.amount / 100,
          }));

        return { transactions };
      } catch (error) {
        return { error: "An error occured while fetching transactions" };
      }
    },
    [user.id], // TODO: Read the docs for this argument
    {
      tags: ["transactions"],
      revalidate: false,
    },
  );

  const { transactions, error } = await cachedTransactions(user.id);

  if (error) return { error };
  return { transactions };
};
