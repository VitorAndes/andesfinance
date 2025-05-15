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
import { SideBar } from "./components/sidebar/sideBar";
import { TableClient } from "./components/table/table";
import { useModal } from "./context/modalContext";
import { useSideBar } from "./context/useSidebar";
import { useQueryAmount } from "./hooks/useQueryAmount";

export function App() {
	const { openModal } = useModal();
	const { isSidebarOpen, setIsSidebarOpen } = useSideBar();

	const { expensesAmount, incomesAmount, invoicesAmount } = useQueryAmount();

	return (
		<div className="flex min-h-screen">
			<SideBar />
			<div className=" flex-1 overflow-auto h-screen ">
				<header className="sticky top-0 z-10 flex h-18 flex-col justify-between gap-4 p-4 backdrop-blur-xs lg:flex-row lg:items-center">
					<div className="flex gap-2 items-center">
						<button
							aria-label="close modal button"
							className=" size-11 items-center justify-center p-1 text-default flex"
							type="button"
							onClick={() => setIsSidebarOpen(!isSidebarOpen)}
						>
							<SidebarClose className="w-full h-full" />
						</button>
						<h1 className="font-semibold font-title text-default text-lg lg:text-3xl">
							Dashboard
						</h1>
					</div>

					<div className="flex gap-2">
						<Button onClick={() => openModal("income")}>
							Orçamento do mês
						</Button>
						<Button onClick={() => openModal("expense")}>
							Adicionar despesa
						</Button>
					</div>
				</header>
				<main className="m-auto mt-12 space-y-12 p-2 md:p-6 lg:mt-0 2xl:max-w-7xl">
					<section className="grid gap-4 lg:grid-cols-3">
						<CardMoney
							icon={<ArrowUpCircle className="text-emerald-400" />}
							title={"Disponível no mês"}
							value={incomesAmount}
						/>
						<CardMoney
							icon={<ArrowDownCircle className="text-red-400" />}
							title={"Gasto mensal atual"}
							value={expensesAmount}
						/>
						<CardMoney
							icon={<CreditCard className="text-orange-400" />}
							title={"Fatura atual"}
							value={invoicesAmount}
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
							<TableClient />
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
