import { db } from "@/db/dexie";
import { useLiveQuery } from "dexie-react-hooks";

function formatAmount(typeAmount: { amount: number }[] = []) {
	return typeAmount.reduce((acc, item) => acc + (item.amount ?? 0), 0);
}

export function useQueryAmount() {
	const incomes = useLiveQuery(() => db.incomes.toArray());
	const expenses = useLiveQuery(() => db.expenses.toArray());
	const invoices = useLiveQuery(() => db.invoices.toArray());

	const incomesAmount =
		(Number(formatAmount(incomes)) - Number(formatAmount(expenses))) / 100;
	const expensesAmount = formatAmount(expenses) / 100;
	const invoicesAmount = formatAmount(invoices) / 100;

	return { incomesAmount, expensesAmount, invoicesAmount };
}
