import { Button } from "@/components/ui/button";
import { revalidateTag } from "next/cache";
import { GrPowerReset } from "react-icons/gr";

export default function ReRenderButton() {
  async function createInvoice() {
    "use server";
    revalidateTag("transactions");
  }
  return (
    <form action={createInvoice}>
      <Button className="gap-1" variant="secondary" type="submit">
        <GrPowerReset />
        Rerender
      </Button>
    </form>
  );
}
