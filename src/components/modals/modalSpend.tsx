import { useModal } from "@/context/modalContext";
import { handleSetExpense } from "@/function/handleExpenseLocalStorage";
import { useMaskAmount } from "@/hooks/useMaskAmount";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../common/button";
import { Input } from "../common/input";
import { InputSelect } from "../common/inputSelect";

const methodOptions = [
	{ name: "Crédito" },
	{ name: "Débito" },
	{ name: "Dinheiro" },
] satisfies { name: string }[];

const tagOptions = [
	{
		name: "alimentação",
	},
	{
		name: "transporte",
	},
] satisfies { name: string }[];

const categoryEnum = ["alimentação", "transporte"] as const;
const paymentMethodEnum = ["Débito", "Crédito", "Dinheiro"] as const;
type PaymentMethod = (typeof paymentMethodEnum)[number];
type categoryEnum = (typeof categoryEnum)[number];

const schemaExpenseForm = z.object({
	expenseAmount: z
		.number()
		.int()
		.nonnegative()
		.positive({ message: "O valor deve ser maior que zero " }),
	expenseDescription: z
		.string()
		.nonempty({ message: "Adicione uma descrição" })
		.max(25)
		.min(1),
	expensePaymentMethod: z
		.string()
		.refine((val) => paymentMethodEnum.includes(val as PaymentMethod), {
			message: "Selecione uma forma de pagamento",
		}),

	expenseCategory: z
		.string()
		.refine((val) => categoryEnum.includes(val as categoryEnum), {
			message: "Selecione uma categoria",
		}),
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
	});

	const expenseAmount = watch("expenseAmount");

	const { handleChangeMaskAmount, maskAmount } = useMaskAmount(
		expenseAmount,
		(amount) => setValue("expenseAmount", amount),
	);
	function createId() {
		return Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
	}

	const onSubmitExpenseForm = ({
		expenseCategory,
		expenseDescription,
		expensePaymentMethod,
		expenseTransactionDate,
	}: createExpenseForm) => {
		handleSetExpense({
			expenseId: createId(),
			amount: expenseAmount,
			category: expenseCategory,
			payment_type: expensePaymentMethod,
			product: expenseDescription,
			transaction_date: expenseTransactionDate,
		});

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
