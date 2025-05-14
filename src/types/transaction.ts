export type TransactionBase = {
	id: string;
	name: string;
	amount: string;
	paymentDate: string;
	tag?: string;
};

export type ExpenseTransaction = TransactionBase & {
	type: "compras";
	paymentMethod: string;
};

export type IncomeTransaction = TransactionBase & {
	type: "recebimentos";
};

export type Transaction = ExpenseTransaction | IncomeTransaction;
