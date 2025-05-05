"use client";
import { useModal } from "@/context/modalContext";
import { Button } from "../common/button";
import { Input } from "../common/input";

export function ModalIncome() {
	const { closeModal } = useModal();
	return (
		<>
			<div className=" -top-10 absolute left-2/12 w-2/3 rounded-lg bg-default py-8 shadow shadow-default">
				<h1 className="text-center font-semibold font-title text-secondary lg:text-lg ">
					Adicionar nova renda
				</h1>
			</div>

			<form action="" className="mt-12 space-y-2">
				<Input
					type="text"
					id="budget"
					name="budget"
					placeholder="R$ 0,00"
					htmlFor="budget"
					label="Valor da renda"
				/>
				<Input htmlFor={"description"} label={"Descrição"} />

				<Input
					type="date"
					id="date"
					name="date"
					htmlFor="date"
					label="Inicio/Fim do ciclo"
				/>
			</form>
			<div className="flex place-content-end gap-4">
				<Button variant="danger" onClick={closeModal}>
					Cancelar
				</Button>
				<Button variant="ghost">Salvar</Button>
			</div>
		</>
	);
}
