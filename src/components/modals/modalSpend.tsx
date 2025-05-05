import { useModal } from "@/context/modalContext";
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

export function ModalSpend() {
	const { closeModal } = useModal();
	return (
		<>
			<div className=" -top-10 absolute left-2/12 w-2/3 rounded-lg bg-default py-8 shadow shadow-default">
				<h1 className="text-center font-semibold font-title text-secondary lg:text-lg ">
					Adicionar nova despesa
				</h1>
			</div>
			<form action="" className="mt-12 space-y-2">
				<Input
					type="text"
					id="product"
					name="product"
					htmlFor="product"
					label="Descrição"
					placeholder="Nome do produto"
				/>
				<Input
					type="text"
					id="spend"
					name="spend"
					htmlFor="spend"
					placeholder="R$ 0,00"
					label="Valor"
				/>

				<InputSelect
					id="paymentMethod"
					htmlFor="paymentMethod"
					label="Forma de pagamento"
					options={methodOptions}
				/>
				<InputSelect
					id="tag"
					htmlFor="tag"
					label="Categoria"
					options={tagOptions}
				/>
				<Input
					type="date"
					id="paymentDate"
					name="paymentDate"
					htmlFor="paymentDate"
					label="Data do pagamento"
				/>
			</form>
			<div className="flex place-content-end gap-4">
				<Button variant="danger" onClick={closeModal}>
					Cancelar
				</Button>
				<Button variant="ghost">Adicionar</Button>
			</div>
		</>
	);
}
