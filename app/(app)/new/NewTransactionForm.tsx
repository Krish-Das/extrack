"use client";

import { IoArrowUpSharp, IoCaretDown } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { IoCalendarClear } from "react-icons/io5";
import CurrencyInput from "react-currency-input-field";

export default function NewTransactionForm() {
  return (
    <div className="space-y-2">
      <div className="inline-flex items-center gap-2">
        <Button
          className="h-10 gap-2 rounded-full px-5 shadow-none"
          variant="secondary"
          type="button"
        >
          <IoCaretDown size={20} className="text-foreground/50" />
          Category
        </Button>

        <Button
          className="h-10 gap-2 rounded-full px-5 shadow-none"
          variant="secondary"
          type="button"
        >
          <IoCalendarClear className="text-foreground/50" />
          18 Apr
        </Button>
      </div>

      {/* --- --- INPUTS --- --- */}
      <section className="flex w-full flex-col items-start justify-center gap-8 rounded-3xl bg-card p-10">
        <div className="justify-betweens inline-flex w-full items-center">
          <input
            className="min-w-0 flex-1 bg-transparent text-lg outline-none"
            placeholder="Add a Label"
          />

          <IoArrowUpSharp
            size={16}
            className={cn("rotate-0 text-success transition-all")}
          />
        </div>

        <CurrencyInput
          decimalsLimit={2}
          allowNegativeValue={false}
          maxLength={8}
          placeholder="Amount"
          className="w-full truncate border-none bg-transparent text-5xl font-light tracking-tight outline-none"
        />
      </section>

      <div className="flex flex-row-reverse items-center gap-2">
        <Button className="h-14 w-full rounded-full bg-destructive text-base shadow-none">
          Add
        </Button>
        <Button
          className="h-14 w-full rounded-full text-base text-foreground/50"
          variant="ghost"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
