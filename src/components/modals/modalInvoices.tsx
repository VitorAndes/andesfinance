import { db } from "@/db/dexie";
import { useMaskAmount } from "@/hooks/useMaskAmount";
import type { Invoice } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { BadgeCheck, Receipt } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Input } from "../common/input";

interface ModalInvoicesProps {
	invoice: Invoice;
}

const schemaInvoiceForm = z.object({
	amount: z
		.number()
		.int()
		.nonnegative()
		.positive({ message: "o valor deve ser maior que zero" }),
});

type createInvoiceForm = z.infer<typeof schemaInvoiceForm>;

export function ModalInvoices({ invoice }: ModalInvoicesProps) {
	const {
		reset,
		watch,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<createInvoiceForm>({
		resolver: zodResolver(schemaInvoiceForm),
		defaultValues: {
			amount: 0,
		},
	});

	const invoiceAmount = watch("amount");

	const { handleChangeMaskAmount, maskAmount } = useMaskAmount(
		invoiceAmount,
		(amount) => setValue("amount", amount),
	);

	const onSubmitInvoiceForm = async ({ amount }: createInvoiceForm) => {
		try {
			if (amount > invoice.amount) {
				toast.warning("Valor pago maior que o valor da fatura.");
				return;
			}

			const newAmountInCents = invoice.amount - amount;

			await db.invoices.update(invoice.invoiceId, {
				amount: newAmountInCents,
				...(newAmountInCents === 0 && { payment_status: "paid" }),
			});

			const existingExpense = await db.expenses
				.where({ expenseId: invoice.invoiceId })
				.first();

			if (existingExpense) {
				await db.expenses.update(existingExpense.expenseId, {
					amount: existingExpense.amount + amount,
				});
			} else {
				await db.expenses.add({
					amount: amount,
					category: invoice.category,
					transaction_date: invoice.transaction_date,
					payment_type: "crédito",
					expenseId: invoice.invoiceId,
					product: invoice.product,
				});
			}

			invoice.amount = newAmountInCents;

			toast.success(`Fatura paga com sucesso: ${invoice.product}`);
		} catch (error) {
			toast.error(`Erro ao atualizar fatura: ${error}`);
		}

		reset();
	};

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
						<p className=" font-secondary font-semibold ">
							R${(invoice.amount / 100).toLocaleString("pt-BR")}
						</p>
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

			<form onSubmit={handleSubmit(onSubmitInvoiceForm)}>
				<Input
					htmlFor={"invoicePayment"}
					label={"Quanto deseja pagar?"}
					icon={<BadgeCheck />}
					value={maskAmount}
					errors={errors.amount?.message}
					onChange={handleChangeMaskAmount}
				/>
			</form>
		</>
	);
}
