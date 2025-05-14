import { db } from "@/db/dexie";
import { useLiveQuery } from "dexie-react-hooks";
import { useMemo } from "react";

function formatAmount(typeAmount: { amount: number }[] = []) {
	const total = typeAmount.reduce((acc, item) => acc + (item.amount ?? 0), 0);
	return (total / 100).toLocaleString("pt-BR");
}

export function useQueryAmount() {
	const incomes = useLiveQuery(() => db.incomes.toArray());
	const expenses = useLiveQuery(() => db.expenses.toArray());
	const invoices = useLiveQuery(() => db.invoices.toArray());

	const incomesAmount = useMemo(() => formatAmount(incomes), [incomes]);
	const expensesAmount = useMemo(() => formatAmount(expenses), [expenses]);
	const invoicesAmount = useMemo(() => formatAmount(invoices), [invoices]);

	return { incomesAmount, expensesAmount, invoicesAmount };
}
