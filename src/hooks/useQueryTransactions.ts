import { db } from "@/db/dexie";
import { useLiveQuery } from "dexie-react-hooks";

import type {
	ExpenseTransaction,
	IncomeTransaction,
	Transaction,
} from "@/types/transaction";
import type { Expense, Income } from "@/types/types";

function mapExpenseToTransaction(expense: Expense): ExpenseTransaction {
	return {
		id: expense.expenseId,
		name: expense.product,
		amount: (expense.amount / 100).toLocaleString("pt-Br"),
		paymentDate: expense.transaction_date,
		tag: expense.category,
		type: "compras",
		paymentMethod: expense.payment_type,
	};
}

function mapIncomeToTransaction(income: Income): IncomeTransaction {
	return {
		id: income.incomeId,
		name: income.description,
		amount: (income.amount / 100).toLocaleString("pt-BR"),
		paymentDate: income.transaction_date,
		type: "recebimentos",
	};
}

export function useQueryTransactions(): { transactions: Transaction[] } {
	const incomes = useLiveQuery(() => db.incomes.toArray());
	const expenses = useLiveQuery(() => db.expenses.toArray());
	const invoices = useLiveQuery(() => db.invoices.toArray());

	if (!incomes || !expenses || !invoices) {
		return { transactions: [] };
	}

	const transactions: Transaction[] = [
		...incomes.map(mapIncomeToTransaction),
		...expenses.map(mapExpenseToTransaction),
	];

	return { transactions };
}
