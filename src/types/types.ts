export const STORAGE_KEYS = {
	INCOMES: "income",
	EXPENSES: "expense",
	INVOICES: "invoice",
} as const;

export type PaymentType = "Débito" | "Crédito" | "Dinheiro";
export type InvoiceStatus = "pending" | "paid";

export interface Category {
	categoryId: string;
	name: string;
}

export interface Expense {
	expenseId: string;
	product: string;
	category: string;
	amount: number;
	transaction_date: string;
	payment_type: string;
}

export interface Invoice {
	invoiceId: string;
	product: string;
	category: string;
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
