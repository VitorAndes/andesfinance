export const STORAGE_KEYS = {
	INCOMES: "income",
	EXPENSES: "expense",
} as const;

export type PaymentType = "Débito" | "Crédito" | "Dinheiro";
export type InvoiceStatus = "pending" | "paid";

export interface User {
	id: string;
	username: string;
	email: string;
	password_hash: string;
	salt: string;
	created_at: Date;
	updated_at: Date;
	deleted_at: Date | null;
}

export interface Expense {
	expenseId: string;
	product: string;
	amount: number;
	transaction_date: string;
	payment_type: string;
	category: string;
}

export interface Invoice {
	expenseId: number;
	userId: string;
	categoryId: number;
	product: string;
	amount: number;
	transaction_date: string;
	payment_status: InvoiceStatus;
}

export interface Income {
	incomeId: string;
	description: string;
	amount: number;
	transaction_date: string;
}
