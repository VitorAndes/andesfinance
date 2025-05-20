import { useModal } from "@/context/modalContext";
import { useNormalizeDate } from "@/hooks/useNormalizedDate";
import { useQueryInvoices } from "@/hooks/useQueryInvoices";
import { Receipt } from "lucide-react";
import { Button } from "./button";

export function CardInvoices() {
	const { openModal } = useModal();

	const invoices = useQueryInvoices();

	if (invoices.length === 0) return "Nenhuma fatura encontrada";

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
											? "Fatura pendente"
											: "Fatura paga"}
									</span>
									<h1 className="font-secondary font-semibold text-default">
										{invoice.product} - {invoice.category}
									</h1>
								</div>
								<span className="font-secondary text-default/70">
									{invoice.payment_status === "pending" &&
										`Vencimento - ${useNormalizeDate(invoice.transaction_date)}`}
								</span>
							</div>
							<div className="flex flex-col items-end justify-between">
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
								<span className="font-secondary font-semibold text-default ">
									R${(invoice.amount / 100).toLocaleString("pt-BR")}
								</span>
							</div>
						</div>
					</div>
				);
			})}
		</>
	);
}
