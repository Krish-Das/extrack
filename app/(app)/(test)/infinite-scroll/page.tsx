import { ContentWrapper } from "@/components/contentwrapper";
import { Main } from "@/components/mainwrapper";
import BackNavigation from "@/components/navigation/AppNavigateBack";
import InfiniteTransactionList from "./InfiniteTransactionList";

export default function IFOPage() {
  return (
    <Main>
      <ContentWrapper>
        <BackNavigation heading="Infinite transactions" />
        <InfiniteTransactionList />
      </ContentWrapper>
    </Main>
  );
}
