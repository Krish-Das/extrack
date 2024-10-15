import { ContentWrapper } from "@/components/contentwrapper";
import { Main } from "@/components/mainwrapper";
import BackNavigation from "@/components/navigation/AppNavigateBack";
import TransactionDisplay from "@/components/transactions/TransactionDisplay";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export default function TransactionPaginationTest({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const isPageNumberValid =
    searchParams.page === undefined || !isNaN(Number(searchParams.page));
  if (!isPageNumberValid) notFound();

  const pageNo = parseInt(searchParams.page);

  return (
    <Main>
      <ContentWrapper>
        <BackNavigation heading="Pagination page 💀" />
        <TransactionDisplay hasAllTransactions={true} pageNo={pageNo} />
        <PaginateButtons currentPage={pageNo} />
      </ContentWrapper>
    </Main>
  );
}

function PaginateButtons({ currentPage }: { currentPage: number }) {
  const pageNumber = isNaN(Number(currentPage)) ? 1 : currentPage;

  const nextPage = pageNumber + 1;
  const previousPage = pageNumber - 1;

  return (
    <div className="grid w-full grid-cols-2">
      {/* --- --- --- --- Previous button --- --- --- --- */}
      {previousPage > 0 && (
        <Button
          className="col-start-1 max-w-fit"
          variant="outline"
          size="sm"
          asChild
        >
          <Link
            className="inline-flex items-center gap-2 pl-2"
            href={`/pagination?page=${previousPage}`}
          >
            <IoChevronBack />
            Previous
          </Link>
        </Button>
      )}

      {/* --- --- --- --- Next button --- --- --- --- */}
      <Button
        className="col-start-3 max-w-fit"
        variant="outline"
        size="sm"
        asChild
      >
        <Link
          className="inline-flex items-center gap-2 pr-2"
          href={`/pagination?page=${nextPage}`}
        >
          Next
          <IoChevronForward />
        </Link>
      </Button>
    </div>
  );
}
