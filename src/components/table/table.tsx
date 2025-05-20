import { useFilter } from "@/hooks/useFilter";
import { usePagination } from "@/hooks/usePagination";

import { useQueryCategory } from "@/hooks/useQueryCategory";
import { useQueryTransactions } from "@/hooks/useQueryTransactions";
import { ListRestart } from "lucide-react";
import { CardTransaction } from "../common/cardTransaction";
import { Input } from "../common/input";
import { InputSelect } from "../common/inputSelect";
import { PAGINATION_CONFIG, TablePagination } from "./tablePagination";

const methodOptions = [{ name: "Débito" }, { name: "Dinheiro" }] satisfies {
	name: string;
}[];
const transactionTypeOptions = [
	{
		name: "Recebimentos",
	},
	{
		name: "Compras",
	},
] satisfies { name: string }[];

export function TableClient() {
	const { category } = useQueryCategory();

	const { transactions } = useQueryTransactions();

	const {
		filteredData,
		searchName,
		setSearchName,
		searchTag,
		setSearchTag,
		searchMethod,
		setSearchMethod,
		searchType,
		setSearchType,
		searchDate,
		setSearchDate,
	} = useFilter(transactions);

	const { pageSize } = PAGINATION_CONFIG;
	const {
		currentPage,
		setCurrentPage,
		totalPages,
		paginatedItems,
		totalItems,
	} = usePagination(filteredData, pageSize);

	function resetarFiltro() {
		setSearchDate("");
		setSearchMethod("");
		setSearchName("");
		setSearchTag("");
		setSearchType("");
		setCurrentPage(1);
	}

	return (
		<>
			<div className="relative mb-4 flex flex-col flex-wrap items-center gap-2 lg:flex-row">
				<div className="w-full">
					<Input
						id="filter"
						type="text"
						htmlFor={"filter"}
						label={"Filtrar por nome"}
						value={searchName}
						onChange={(e) => {
							setSearchName(e.target.value);
							setCurrentPage(1);
						}}
					/>
				</div>

				<div className="w-full flex-1">
					<InputSelect
						label={"Categoria"}
						htmlFor={"tag"}
						value={searchTag}
						onChange={(e) => {
							setSearchTag(e.target.value);
						}}
						options={category}
					/>
				</div>

				<div className="w-full flex-1">
					<InputSelect
						value={searchMethod}
						label={"Método de pagamento"}
						htmlFor={"paymentMethod"}
						onChange={(e) => {
							setSearchMethod(e.target.value);
						}}
						options={methodOptions}
					/>
				</div>
				<div className="w-full flex-1">
					<InputSelect
						value={searchType}
						label={"Tipo de transação"}
						htmlFor={"type"}
						onChange={(e) => {
							setSearchType(e.target.value);
						}}
						options={transactionTypeOptions}
					/>
				</div>

				<div className="w-full flex-1">
					<Input
						type="date"
						htmlFor={"date"}
						value={searchDate}
						label={"Data da transação"}
						onChange={(e) => {
							setSearchDate(e.target.value);
						}}
					/>
				</div>
				<button
					className="lg:-top-11 -top-9 absolute right-0 flex cursor-pointer items-center gap-2 text-xs active:text-primary lg:text-base font-secondary"
					onClick={resetarFiltro}
					type="button"
				>
					Limpar filtros
					<ListRestart />
				</button>
			</div>

			<div className="flex flex-col justify-between h-full gap-5">
				<div className="flex w-full flex-col gap-2">
					<div className="flex flex-col gap-2">
						{paginatedItems.length === 0 ? (
							<div className="flex ">
								<div className="flex-1 py-4 text-center font-secondary">
									Nenhuma transação encontrada
								</div>
							</div>
						) : (
							paginatedItems.map((transaction) =>
								transaction.type === "compras" ? (
									<CardTransaction
										key={transaction.id}
										type={"expense"}
										local={transaction.name}
										tag={transaction.tag ?? ""}
										paymentDate={transaction.paymentDate}
										amount={transaction.amount}
										paymentMethod={transaction.paymentMethod}
									/>
								) : (
									<CardTransaction
										key={transaction.id}
										type={"income"}
										local={transaction.name}
										tag={""}
										paymentDate={transaction.paymentDate}
										amount={transaction.amount}
									/>
								),
							)
						)}
					</div>
				</div>
				<TablePagination
					pageNumber={currentPage}
					totalPages={totalPages}
					totalRows={totalItems}
					goToPage={setCurrentPage}
				/>
			</div>
		</>
	);
}
