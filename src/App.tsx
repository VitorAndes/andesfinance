import { ChartPaymentMethod } from "@/components/charts/chartPaymentMethod";
import { ChartSpendLocal } from "@/components/charts/chartSpendLocal";
import { ChartTransactions } from "@/components/charts/chartTransactions";
import { Button } from "@/components/common/button";
import { CardInvoices } from "@/components/common/cardInvoices";
import { CardModal } from "@/components/common/cardModal";
import { CardMoney } from "@/components/common/cardMoney";
import { CardSection } from "@/components/common/cardSection";

import {
	ArrowDownCircle,
	ArrowUpCircle,
	CreditCard,
	SidebarClose,
} from "lucide-react";
import { useEffect, useState } from "react";
import { SideBar } from "./components/sidebar/sideBar";
import { TableClient } from "./components/table/tableClient";
import { useModal } from "./context/modalContext";
import { transactionsData } from "./data/transactionsData";
import { getAllExpenses } from "./function/handleExpenseLocalStorage";
import { getAllIncome } from "./function/handleIncomeLocalStorage";

export function App() {
	const { openModal } = useModal();
	const [isSideBarOpen, setIsSideBarOpen] = useState(false);
	const [allIncome, setAllIncome] = useState("");
	const [allExpense, setAllExpense] = useState("");

	useEffect(() => {
		const allIncome = getAllIncome();
		const allIncomeAmount = allIncome.reduce(
			(acc, income) => acc + income.amount,
			0,
		);
		const incomeAmount = (allIncomeAmount / 100).toLocaleString("pt-BR");
		setAllIncome(incomeAmount);
	});

	useEffect(() => {
		const allExpense = getAllExpenses();
		const allExpenseAmount = allExpense.reduce(
			(acc, expense) => acc + expense.amount,
			0,
		);

		const expenseAmount = (allExpenseAmount / 100).toLocaleString("pt-BR");
		setAllExpense(expenseAmount);
	});

	return (
		<div className="flex min-h-screen">
			<SideBar isSideBarOpen={isSideBarOpen} />
			<div className=" flex-1 overflow-auto h-screen ">
				<header className="sticky top-0 z-10 flex h-18 flex-col justify-between gap-4 p-4 backdrop-blur-xs lg:flex-row lg:items-center">
					<div className="flex gap-2 items-center">
						<button
							aria-label="close modal button"
							className="flex size-11 items-center justify-center p-1 text-default"
							type="button"
							onClick={() => setIsSideBarOpen((prev) => !prev)}
						>
							<SidebarClose className="w-full h-full" />
						</button>
						<h1 className="font-semibold font-title text-default text-lg lg:text-3xl">
							Dashboard
						</h1>
					</div>

					<div className="flex gap-2">
						<Button modalType={"income"} onClick={() => openModal("income")}>
							Orçamento do mês
						</Button>
						<Button modalType={"expense"} onClick={() => openModal("expense")}>
							Adicionar despesa
						</Button>
					</div>
				</header>
				<main className="m-auto mt-12 space-y-12 p-2 md:p-6 lg:mt-0 2xl:max-w-7xl">
					<section className="grid gap-4 lg:grid-cols-3">
						<CardMoney
							icon={<ArrowUpCircle className="text-emerald-400" />}
							title={"Disponível no mês"}
							value={allIncome}
						/>
						<CardMoney
							icon={<ArrowDownCircle className="text-red-400" />}
							title={"Gasto mensal atual"}
							value={allExpense}
						/>
						<CardMoney
							icon={<CreditCard className="text-orange-400" />}
							title={"Fatura atual"}
							value={"totalInvoice"}
						/>
					</section>
					<section className="gap-4 lg:grid lg:grid-cols-3">
						<CardSection title={"Lugares gastos"} className="col-span-2">
							<ChartSpendLocal />
						</CardSection>

						<CardSection title={"Métodos de pagamento"} className="col-span-1">
							<ChartPaymentMethod />
						</CardSection>
					</section>
					<section className="h-96 w-full">
						<CardSection title={"Gráfico de Transações"}>
							<ChartTransactions />
						</CardSection>
					</section>

					<section className="grid gap-4 lg:grid-cols-3">
						<CardSection
							className="lg:col-span-2"
							title={"Relátorio de transações"}
						>
							<TableClient
								transactions={transactionsData}
								categories={[{ name: "alimentação" }]}
							/>
						</CardSection>
						<CardSection className="lg:col-span-1" title={"Faturas"}>
							<CardInvoices />
						</CardSection>
					</section>
				</main>
				<CardModal />
			</div>
		</div>
	);
}
