import { ContentWrapper } from "@/components/contentwrapper";
import { Main } from "@/components/mainwrapper";
import ReRenderButton from "./ReRenderButton";
import { getTransactions } from "./actions";
import { notFound } from "next/navigation";

// TODO: Export this variable from @/lib/defaultValues
const LOCALE = "en-IN";

function convertToIndiaTime(date: Date | string): string {
  return new Intl.DateTimeFormat(LOCALE, {
    dateStyle: "full",
    timeStyle: "long",
    timeZone: "Asia/Kolkata",
  }).format(new Date(date));
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString(LOCALE, {
    month: "short",
    day: "numeric",
  });
}

export default async function UnstableCacheTestPage() {
  const { transactions, error } = await getTransactions();

  // TODO: Handle this error Properly
  if (error) return <p>{error}</p>;

  if (!transactions) return notFound();

  return (
    <>
      <Main>
        <ContentWrapper>
          <h2>UnstableCacheTestPage</h2>
          {transactions.map((transaction) => (
            <div key={transaction.id}>
              <p>Label: {transaction.label}</p>
              <p>INTL: {convertToIndiaTime(transaction.date)}</p>
              <p>LocaleDate: {formatDate(transaction.date)}</p>
            </div>
          ))}

          <ReRenderButton />
        </ContentWrapper>
      </Main>
    </>
  );
}
