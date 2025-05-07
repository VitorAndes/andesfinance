import type { Invoice } from "@/types/prisma";
import { Receipt } from "lucide-react";
import { Button } from "./button";

export function CardInvoices() {
	const invoices: Invoice[] = [
		{
			expenseId: 3,
			userId: "2",
			categoryId: 3,
			product: "almoço",
			amount: 12.21,
			transaction_date: "01/02/2004",
			payment_status: "paid",
		},
		{
			expenseId: 2,
			userId: "2",
			categoryId: 3,
			product: "almoço",
			amount: 12.21,
			transaction_date: "01/02/2004",
			payment_status: "pending",
		},
	];

	function mapInvoiceToUI(invoice: (typeof invoices)[number]): Invoice {
		return {
			userId: invoice.userId,
			expenseId: invoice.expenseId,
			product: invoice.product,
			categoryId: invoice.categoryId,
			transaction_date: invoice.transaction_date,
			amount: invoice.amount,
			payment_status: invoice.payment_status === "paid" ? "paid" : "pending",
		};
	}

	return (
		<>
			{invoices.map((invoice) => {
				const uiInvoice = mapInvoiceToUI(invoice);

				return (
					<div
						key={invoice.expenseId}
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
										{invoice.product} - {invoice.categoryId}
									</h1>
								</div>
								<span className="font-secondary text-default/70">
									{invoice.payment_status === "pending" &&
										`Vencimento - ${new Date(invoice.transaction_date).toLocaleDateString()}`}
								</span>
							</div>
							<div className="flex flex-col items-end justify-between gap-2">
								<div className="w-20">
									{invoice.payment_status === "pending" && (
										<Button
											variant="ghost"
											type="button"
											className="w-full"
											modalType={"invoice"}
											modalData={uiInvoice}
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
