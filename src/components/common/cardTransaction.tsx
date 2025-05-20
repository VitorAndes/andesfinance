import { useNormalizeDate } from "@/hooks/useNormalizedDate";
import { BanknoteArrowDown, BanknoteArrowUp } from "lucide-react";

interface CardTransactionProps {
	type: "income" | "expense";
	local: string;
	tag: string;
	paymentDate: string;
	amount: string;
	paymentMethod?: string;
}

export function CardTransaction({
	local,
	paymentDate,
	paymentMethod,
	amount,
	tag,
	type,
}: CardTransactionProps) {
	return (
		<>
			<div className="flex w-full gap-4 rounded-md border border-secondary px-4 py-6 shadow-2xs shadow-default">
				{type === "expense" ? (
					<BanknoteArrowDown className="text-red-500" />
				) : (
					<BanknoteArrowUp className="text-lime-500" />
				)}
				<div className="flex w-full justify-between">
					<div className="flex flex-col gap-2">
						<div>
							<span className="font-title text-default/70">
								{type === "expense" ? "Compra realizada" : "Pagamento recebido"}
							</span>
							<h1 className="font-title font-semibold text-default md:text-lg">
								{local} - {tag}
							</h1>
						</div>
						<span className="font-secondary text-default/70">
							{type === "expense" ? "pago em: " : "recebido em: "}
							{useNormalizeDate(paymentDate)}
						</span>
					</div>
					<div
						className={`flex flex-col items-end gap-2 ${paymentMethod ? "justify-between" : "justify-end"}`}
					>
						{paymentMethod && (
							<p className="font-secondary text-default">{paymentMethod}</p>
						)}
						<span
							className={`font-secondary font-semibold text-default ${type === "expense" && "line-through"}`}
						>
							R${amount}
						</span>
					</div>
				</div>
			</div>
		</>
	);
}
