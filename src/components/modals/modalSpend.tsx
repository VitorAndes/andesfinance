import { useModal } from "@/context/modalContext";
import { useMaskAmount } from "@/hooks/useMaskAmount";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../common/button";
import { Input } from "../common/input";
import { InputSelect } from "../common/inputSelect";

const methodOptions = [
	{ id: 1, name: "Crédito", value: "credit" },
	{ id: 2, name: "Débito", value: "debit" },
	{ id: 3, name: "Dinheiro", value: "cash" },
] satisfies { id: number; name: string; value: string }[];

const tagOptions = [
	{
		id: 1,
		name: "alimentação",
		value: "alimentação",
	},
	{
		id: 2,
		name: "transporte",
		value: "transporte",
	},
] satisfies { id: number; name: string; value: string }[];

const categoryEnum = ["alimentação", "transporte"] as const;

const schemaExpenseForm = z.object({
	expenseAmount: z.number().int().nonnegative(),
	expenseDescription: z
		.string()
		.nonempty({ message: "Adicione uma descrição" })
		.max(25)
		.min(1),
	expensePaymentMethod: z.enum(["debit", "credit", "cash"]),
	expenseCategory: z.enum(categoryEnum),
	expenseTransactionDate: z.string().date("selecione uma data"),
});

type createExpenseForm = z.infer<typeof schemaExpenseForm>;

export function ModalSpend() {
	const { closeModal } = useModal();
	const {
		handleSubmit,
		reset,
		register,
		watch,
		setValue,
		formState: { errors },
	} = useForm<createExpenseForm>({
		resolver: zodResolver(schemaExpenseForm),
		defaultValues: {
			expenseAmount: 0,
		},
	});

	const expenseAmount = watch("expenseAmount");

	const { handleChangeMaskAmount, maskAmount } = useMaskAmount(
		expenseAmount,
		(amount) => setValue("expenseAmount", amount),
	);

	const onSubmitExpenseForm = (Expense: createExpenseForm) => {
		console.log(
			`aqui o expense: ${Expense.expensePaymentMethod}, ${Expense.expenseTransactionDate}, ${Expense.expenseAmount},${Expense.expenseCategory}, ${Expense.expenseDescription}`,
		);
		toast.success("nova expense");
		reset();
	};

	return (
		<>
			<div className=" -top-10 absolute left-2/12 w-2/3 rounded-lg bg-default py-8 shadow shadow-default">
				<h1 className="text-center font-semibold font-title text-secondary lg:text-lg ">
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
					options={tagOptions}
				/>
				<Input
					type="date"
					{...register("expenseTransactionDate")}
					htmlFor="paymentDate"
					label="Data do pagamento"
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
