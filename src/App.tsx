import { ChartPaymentMethod } from "@/components/charts/chartPaymentMethod";
import { ChartSpendLocal } from "@/components/charts/chartSpendLocal";
import { ChartTransactions } from "@/components/charts/chartTransactions";
import { Button } from "@/components/common/button";
import { CardInvoices } from "@/components/common/cardInvoices";
import { CardModal } from "@/components/common/cardModal";
import { CardMoney } from "@/components/common/cardMoney";
import { CardSection } from "@/components/common/cardSection";

import { ArrowDownCircle, ArrowUpCircle, CreditCard } from "lucide-react";
import { SideBar } from "./components/sidebar/sideBar";
import { TableClient } from "./components/table/tableClient";
import { transactionsData } from "./data/transactionsData";

export function App() {
	return (
		<div className="flex gap-4 justify-center">
			<SideBar />
			<div className=" flex-1 overflow-auto m-auto">
				<header className="sticky top-0 z-10 flex h-18 flex-col justify-between gap-4 p-4 backdrop-blur-xs lg:flex-row lg:items-center">
					<h1 className="font-semibold font-title text-default text-lg lg:text-3xl">
						Dashboard
					</h1>
					<div className="flex gap-2">
						<Button modalType={"income"}>Orçamento do mês</Button>
						<Button modalType={"expense"}>Adicionar despesa</Button>
					</div>
				</header>
				<main className="m-auto mt-12 space-y-12 p-2 md:p-6 lg:mt-0 2xl:max-w-7xl">
					<section className="grid gap-4 lg:grid-cols-3">
						<CardMoney
							icon={<ArrowUpCircle className="text-emerald-400" />}
							title={"Disponível no mês"}
							value={"totalBalance"}
						/>
						<CardMoney
							icon={<ArrowDownCircle className="text-red-400" />}
							title={"Gasto mensal atual"}
							value={"totalExpense"}
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
							<TableClient transactions={transactionsData} categories={[]} />
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
