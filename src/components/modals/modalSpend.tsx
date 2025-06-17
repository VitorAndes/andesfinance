import { useModal } from "@/context/modalContext";
import { db } from "@/db/dexie";
import { useMaskAmount } from "@/hooks/useMaskAmount";
import { useQueryCategory } from "@/hooks/useQueryCategory";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../common/button";
import { Input } from "../common/input";
import { InputSelect } from "../common/inputSelect";

const methodOptions = [
	{ id: "1", name: "Crédito" },
	{ id: "2", name: "Débito" },
	{ id: "3", name: "Dinheiro" },
] satisfies { name: string; id: string }[];

const paymentMethodEnum = ["débito", "crédito", "dinheiro"] as const;
type PaymentMethod = (typeof paymentMethodEnum)[number];

const schemaExpenseForm = (validCategories: string[]) =>
	z.object({
		expenseAmount: z
			.number()
			.int()
			.nonnegative()
			.positive({ message: "O valor deve ser maior que zero " }),
		expenseDescription: z
			.string()
			.toLowerCase()
			.nonempty({ message: "Adicione uma descrição" })
			.trim()
			.max(25)
			.min(1, { message: "Digite ao menos um caractere na descrição." }),
		expensePaymentMethod: z
			.string()
			.toLowerCase()

			.refine((val) => paymentMethodEnum.includes(val as PaymentMethod), {
				message: "Selecione uma forma de pagamento",
			}),
		expenseCategory: z.string().refine((val) => validCategories.includes(val), {
			message: "Categoria inválida",
		}),
		expenseTransactionDate: z.string().date("selecione uma data"),
	});

type CreateExpenseForm = z.infer<ReturnType<typeof schemaExpenseForm>>;

export function ModalSpend() {
	const { closeModal } = useModal();

	const { category } = useQueryCategory();

	const categoryNames = category?.map((cat) => cat.name) ?? [];

	const formSchema = useMemo(
		() => schemaExpenseForm(categoryNames),
		[categoryNames],
	);

	const {
		handleSubmit,
		reset,
		register,
		watch,
		setValue,
		formState: { errors },
	} = useForm<CreateExpenseForm>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			expenseAmount: 0,
		},
	});

	const expenseAmount = watch("expenseAmount");

	const { handleChangeMaskAmount, maskAmount } = useMaskAmount(
		expenseAmount,
		(amount) => setValue("expenseAmount", amount),
	);

	function createId() {
		return Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
	}

	const onSubmitExpenseForm = async ({
		expenseCategory,
		expenseDescription,
		expensePaymentMethod,
		expenseTransactionDate,
	}: CreateExpenseForm) => {
		try {
			const id = createId();

			const spendCommonData = {
				product: expenseDescription,
				transaction_date: expenseTransactionDate,
				category: expenseCategory,
			};

			switch (expensePaymentMethod) {
				case "crédito":
					await db.invoices.add({
						invoiceId: id,
						payment_status: "pending",
						amount: expenseAmount,
						...spendCommonData,
					});
					toast.success("nova fatura adicionada");
					break;

				default:
					await db.expenses.add({
						expenseId: id,
						payment_type: expensePaymentMethod,
						amount: expenseAmount,
						...spendCommonData,
					});
					toast.success("nova despesa adicionada");
					break;
			}

			reset();
		} catch (error) {
			console.error(`falha ao adicionar nova expense: ${error}`);
		}
	};

	return (
		<>
			<div className="-top-10 absolute left-2/12 w-2/3 rounded-lg bg-default py-8 shadow shadow-default">
				<h1 className="text-center font-semibold font-title text-secondary lg:text-lg">
					Adicionar nova despesa
				</h1>
			</div>
			<form
				onSubmit={handleSubmit(onSubmitExpenseForm)}
				className="mt-12 space-y-2"
			>
				<Input
					type="text"
					errors={errors.expenseDescription?.message}
					{...register("expenseDescription")}
					htmlFor="product"
					label="Descrição"
					placeholder="Nome do produto"
				/>
				<Input
					type="text"
					errors={errors.expenseAmount?.message}
					value={maskAmount}
					onChange={handleChangeMaskAmount}
					htmlFor="spend"
					placeholder="R$ 0,00"
					label="Valor"
				/>
				<InputSelect
					errors={errors.expensePaymentMethod?.message}
					{...register("expensePaymentMethod")}
					htmlFor="paymentMethod"
					label="Forma de pagamento"
					options={methodOptions}
				/>
				<InputSelect
					errors={errors.expenseCategory?.message}
					{...register("expenseCategory")}
					id="tag"
					htmlFor="tag"
					label="Categoria"
					options={category}
				/>
				<Input
					type="date"
					{...register("expenseTransactionDate")}
					htmlFor="paymentDate"
					label="Data do pagamento / vencimento"
					errors={errors.expenseTransactionDate?.message}
				/>
				<div className="flex place-content-end gap-4 mt-5">
					<Button variant="danger" onClick={closeModal}>
						Cancelar
					</Button>
					<Button variant="ghost" type="submit">
						Adicionar
					</Button>
				</div>
			</form>
		</>
	);
}
