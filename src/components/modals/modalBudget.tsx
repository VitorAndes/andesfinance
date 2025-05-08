import { useModal } from "@/context/modalContext";
import { handleSetIncome } from "@/function/handleLocalStorageSet";
import { useMaskAmount } from "@/hooks/useMaskAmount";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../common/button";
import { Input } from "../common/input";

const schemaBudgetForm = z.object({
	incomeDescription: z
		.string()
		.nonempty({ message: "Adicione uma descrição" })
		.max(25)
		.min(1),
	incomeAmount: z.number().int().nonnegative(),
	incomeTransactionDate: z.string().date("Selecione uma data"),
});

type createIncomeForm = z.infer<typeof schemaBudgetForm>;

export function ModalIncome() {
	const { closeModal } = useModal();

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		reset,
		formState: { errors },
	} = useForm<createIncomeForm>({
		resolver: zodResolver(schemaBudgetForm),
		defaultValues: {
			incomeAmount: 0,
		},
	});

	const incomeAmount = watch("incomeAmount");

	const { handleChangeMaskAmount, maskAmount } = useMaskAmount(
		incomeAmount,
		(amount) => setValue("incomeAmount", amount),
	);

	const onSubmitIncomeForm = (Income: createIncomeForm) => {
		console.log(`new income amount ${Income.incomeAmount}`);

		const { incomeAmount, incomeDescription, incomeTransactionDate } = Income;

		handleSetIncome({
			id: crypto.randomUUID(),
			amount: incomeAmount,
			description: incomeDescription,
			transaction_date: incomeTransactionDate,
		});

		toast.success("novo saldo adicionado!");
		reset();
	};

	return (
		<>
			<div className=" -top-10 absolute left-2/12 w-2/3 rounded-lg bg-default py-8 shadow shadow-default">
				<h1 className="text-center font-semibold font-title text-secondary lg:text-lg ">
					Adicionar nova renda
				</h1>
			</div>

			<form
				onSubmit={handleSubmit(onSubmitIncomeForm)}
				className="mt-12 space-y-2"
			>
				<Input
					errors={errors.incomeAmount?.message}
					value={maskAmount}
					onChange={handleChangeMaskAmount}
					inputMode="numeric"
					type="text"
					htmlFor="budget"
					label="Valor da renda"
				/>
				<Input
					errors={errors.incomeDescription?.message}
					{...register("incomeDescription")}
					htmlFor={"description"}
					label={"Descrição"}
					placeholder="Descrição do saldo"
				/>

				<Input
					errors={errors.incomeTransactionDate?.message}
					{...register("incomeTransactionDate")}
					type="date"
					htmlFor="date"
					label="Inicio/Fim do ciclo"
				/>
				<div className="flex place-content-end mt-5 gap-4">
					<Button variant="danger" onClick={closeModal}>
						Cancelar
					</Button>
					<Button variant="ghost" type="submit">
						Adicionar saldo
					</Button>
				</div>
			</form>
		</>
	);
}
