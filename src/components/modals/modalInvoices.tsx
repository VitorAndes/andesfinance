import type { Invoice } from "@/types/types";
import { BadgeCheck, Receipt } from "lucide-react";
import { type FormEvent, useRef } from "react";
import { Input } from "../common/input";

interface ModalInvoicesProps {
	invoice: Invoice;
}

export function ModalInvoices({ invoice }: ModalInvoicesProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		// const paidAmount = inputRef.current?.value;

		if (inputRef.current) {
			inputRef.current.value = "";
		}
	}

	return (
		<>
			<div className=" -top-10 absolute left-2/12 w-2/3 rounded-lg bg-default py-8 shadow shadow-default">
				<h1 className="text-center font-semibold font-title text-secondary lg:text-lg ">
					Pagamento de fatura
				</h1>
			</div>
			<div className="mt-12 space-y-2">
				<h2 className="font-title font-semibold">Informações da fatura</h2>
				<div className="border border-secondary rounded-md p-4 flex flex-col gap-4">
					<span className="flex items-center justify-between">
						<p className="font-medium font-secondary ">Descrição da fatura</p>
						<p className=" font-secondary font-semibold ">{invoice.product}</p>
					</span>
					<span className="flex items-center justify-between">
						<p className="font-medium font-secondary ">Categoria da fatura</p>
						<p className=" font-secondary font-semibold ">{invoice.category}</p>
					</span>
					<span className="flex items-center justify-between">
						<p className="font-medium font-secondary ">Valor da fatura</p>
						<p className=" font-secondary font-semibold ">R${invoice.amount}</p>
					</span>
					<span className="flex items-center justify-between">
						<p className="font-medium font-secondary ">Vencimento da fatura</p>
						<p className="font-secondary font-semibold  ">
							{invoice.transaction_date}
						</p>
					</span>
					<span className="flex items-center justify-between">
						<p className="font-medium font-secondary ">Status da fatura</p>
						<p className="font-secondary font-semibold flex gap-2 ">
							{invoice.payment_status === "pending" ? "pendente" : "paga"}
							<Receipt
								className={`${invoice.payment_status === "pending" ? "text-orange-500" : "text-lime-500"}`}
							/>
						</p>
					</span>
				</div>
			</div>

			<form onSubmit={handleSubmit}>
				<Input
					ref={inputRef}
					htmlFor={"invoicePayment"}
					label={"Quanto deseja pagar?"}
					icon={<BadgeCheck />}
					onChange={(e) => e.currentTarget.value}
				/>
			</form>
		</>
	);
}
