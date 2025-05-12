import { type Expense, STORAGE_KEYS } from "@/types/types";

export function handleSetExpense({
	expenseId,
	product,
	amount,
	payment_type,
	category,
	transaction_date,
}: Expense) {
	const allExpenseLocal = localStorage.getItem(STORAGE_KEYS.EXPENSES);
	const allExpense: Expense[] = allExpenseLocal
		? JSON.parse(allExpenseLocal)
		: [];

	allExpense.push({
		expenseId,
		product,
		amount,
		category,
		payment_type,
		transaction_date,
	});
	const allExpenseStringFormat = JSON.stringify(allExpense);
	localStorage.setItem(STORAGE_KEYS.EXPENSES, allExpenseStringFormat);
}

export function getAllExpenses() {
	const allExpenseLocal = localStorage.getItem(STORAGE_KEYS.EXPENSES);
	const allExpense: Expense[] = allExpenseLocal
		? JSON.parse(allExpenseLocal)
		: [];

	return allExpense;
}
