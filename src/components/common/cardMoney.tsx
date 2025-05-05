import type { ComponentProps, ReactNode } from "react";
interface CardMoneyProps extends ComponentProps<"div"> {
	icon: ReactNode;
	title: string;
	value: string;
}

export function CardMoney(CardMoney: CardMoneyProps) {
	return (
		<div className="col-span-1 flex h-20 flex-col rounded-md bg-primary p-4 text-secondary shadow-default shadow-xs md:h-36 md:gap-4 md:py-8">
			<h1 className="flex justify-between font-title text-xs md:text-lg">
				{CardMoney.title} {CardMoney.icon}
			</h1>
			<p className="font-secondary font-semibold md:text-3xl">
				R${CardMoney.value}
			</p>
		</div>
	);
}
