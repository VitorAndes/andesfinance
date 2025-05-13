import { useModal } from "@/context/modalContext";
import type { Invoice } from "@/types/types";
import { Receipt } from "lucide-react";
import { Button } from "./button";

export function CardInvoices() {
	const { openModal } = useModal();

	const invoices: Invoice[] = [
		{
			invoiceId: "3",

			category: "alimentação",
			product: "almoço",
			amount: 12.21,
			transaction_date: "01/02/2004",
			payment_status: "paid",
		},
		{
			invoiceId: "2",

			category: "alimentação",
			product: "almoço",
			amount: 12.21,
			transaction_date: "01/02/2030",
			payment_status: "pending",
		},
		{
			invoiceId: "5",

			category: "alimentação",
			product: "seila",
			amount: 333.33,
			transaction_date: "01/02/2010",
			payment_status: "pending",
		},
		{
			invoiceId: "4",

			category: "alimentação",
			product: "cinema",
			amount: 33.3321,
			transaction_date: "01/02/2020",
			payment_status: "pending",
		},
	];

	return (
		<>
			{invoices.map((invoice) => {
				return (
					<div
						key={invoice.invoiceId}
						className="flex w-full items-start gap-4 rounded-md border border-secondary px-4 py-6 shadow-2xs shadow-default"
					>
						<Receipt
							className={`${invoice.payment_status === "pending" ? "text-orange-500" : "text-lime-500"}`}
						/>
						<div className="flex w-full justify-between">
							<div className="flex flex-col gap-2">
								<div>
									<span className="font-title text-default/50">
										{invoice.payment_status === "pending"
											? "Fatura pendendte"
											: "Fatura paga"}
									</span>
									<h1 className="font-secondary font-semibold text-default">
										{invoice.product} - {invoice.category}
									</h1>
								</div>
								<span className="font-secondary text-default/70">
									{invoice.payment_status === "pending" &&
										`Vencimento - ${invoice.transaction_date}`}
								</span>
							</div>
							<div className="flex flex-col items-end justify-between gap-2">
								<div className="w-20">
									{invoice.payment_status === "pending" && (
										<Button
											variant="ghost"
											type="button"
											className="w-full"
											onClick={() => openModal("invoice", invoice)}
										>
											Pagar
										</Button>
									)}
								</div>
								<span className="font-secondary font-semibold text-default line-through">
									${invoice.amount}
								</span>
							</div>
						</div>
					</div>
				);
			})}
		</>
	);
}
