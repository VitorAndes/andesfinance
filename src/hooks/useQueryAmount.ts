import { db } from "@/db/dexie";
import { useLiveQuery } from "dexie-react-hooks";

function formatAmount(typeAmount: { amount: number }[] = []) {
	const total = typeAmount.reduce((acc, item) => acc + (item.amount ?? 0), 0);
	return (total / 100).toLocaleString("pt-BR");
}

export function useQueryAmount() {
	const incomes = useLiveQuery(() => db.incomes.toArray());
	const expenses = useLiveQuery(() => db.expenses.toArray());
	const invoices = useLiveQuery(() => db.invoices.toArray());

	const incomesAmount = formatAmount(incomes);
	const expensesAmount = formatAmount(expenses);
	const invoicesAmount = formatAmount(invoices);

	return { incomesAmount, expensesAmount, invoicesAmount };
}
