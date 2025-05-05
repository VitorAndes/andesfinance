import type { PaymentType } from "./prisma";

export type TransactionBase = {
	id: string;
	name: string;
	amount: number;
	paymentDate: string;
	tag: string;
};

export type ExpenseTransaction = TransactionBase & {
	type: "expense";
	paymentMethod: PaymentType;
};

export type IncomeTransaction = TransactionBase & {
	type: "income";
};

export type Transaction = ExpenseTransaction | IncomeTransaction;
