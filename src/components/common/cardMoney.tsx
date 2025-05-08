import type { ComponentProps, ReactNode } from "react";
interface CardMoneyProps extends ComponentProps<"div"> {
	icon: ReactNode;
	title: string;
	value: string;
}

export function CardMoney(CardMoney: CardMoneyProps) {
	return (
		<div className="col-span-1 flex h-20 flex-col rounded-md p-4  shadow-2xs shadow-default border border-secondary md:h-36 md:gap-4 md:py-8">
			<h1 className="flex justify-between font-title font-bold -tracking-wider text-primary text-xs md:text-lg">
				{CardMoney.title} {CardMoney.icon}
			</h1>
			<p className="font-secondary font-semibold text-default md:text-2xl">
				R$ {CardMoney.value}
			</p>
		</div>
	);
}
