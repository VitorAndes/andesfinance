import type { Invoice } from "@/context/modalContext";
import { BadgeCheck } from "lucide-react";
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
			<form onSubmit={handleSubmit} className="mt-12 space-y-2">
				<h2 className="font-semibold font-title text-default">
					{invoice.product}
				</h2>
				<p className="font-secondary">Vencimento: {invoice.transaction_date}</p>
				<p className="font-secondary">Valor: ${invoice.amount}</p>

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
