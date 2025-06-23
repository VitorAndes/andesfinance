import type { ComponentProps, ReactNode } from "react";
interface CardMoneyProps extends ComponentProps<"div"> {
  icon: ReactNode;
  title: string;
  value: number;
}

export function CardMoney(CardMoney: CardMoneyProps) {
  return (
    <div className="col-span-1 flex h-24 flex-col rounded-md p-4 shadow-section  md:h-36 md:gap-4 md:py-8">
      <h1 className="flex justify-between font-title font-bold -tracking-wider text-primary text-sm md:text-lg">
        {CardMoney.title} {CardMoney.icon}
      </h1>
      <p className="font-secondary font-semibold text-default md:text-2xl">
        {CardMoney.value
          ? Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(CardMoney.value)
          : "R$0"}
      </p>
    </div>
  );
}
