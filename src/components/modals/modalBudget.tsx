import { useModal } from "@/context/modalContext";
import { db } from "@/db/dexie";
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
		.trim()
		.max(25)
		.min(1, { message: "Digite ao menos um caractere na descrição." }),
	incomeAmount: z
		.number()
		.int()
		.nonnegative()
		.positive({ message: "O valor deve ser maior que zero " }),
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

	function createId() {
		return Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
	}

	const onSubmitIncomeForm = async ({
		incomeDescription,
	}: createIncomeForm) => {
		try {
			await db.incomes.add({
				incomeId: createId(),
				amount: incomeAmount,
				description: incomeDescription,
				transaction_date: new Date().toISOString(),
			});

			toast.success("novo saldo adicionado!");
			reset();
		} catch (error) {
			console.error(`falha ao adicionar novo income: ${error}`);
		}
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
