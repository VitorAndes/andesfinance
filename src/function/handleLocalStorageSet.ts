import { type Income, STORAGE_KEYS } from "@/types/types";

export function handleSetIncome({
	id,
	amount,
	description,
	transaction_date,
}: Income) {
	const allIncomeLocal = localStorage.getItem(STORAGE_KEYS.INCOMES);

	const allIncome: Income[] = allIncomeLocal ? JSON.parse(allIncomeLocal) : [];

	allIncome.push({
		id,
		amount,
		description,
		transaction_date,
	});
	const allIncomeStringFormat = JSON.stringify(allIncome);

	localStorage.setItem(STORAGE_KEYS.INCOMES, allIncomeStringFormat);
}

export function getAllIncome() {
	const allIncomeLocal = localStorage.getItem(STORAGE_KEYS.INCOMES);
	const allIncome: Income[] = allIncomeLocal ? JSON.parse(allIncomeLocal) : [];

	return allIncome;
}
