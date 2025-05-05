export type PaymentType = "credit" | "debit" | "cash";
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

export interface Category {
	id: number;
	name: string;
}

export interface Expense {
	expenseId: number;
	userId: string;
	categoryId: number;
	product: string;
	amount: number;
	transaction_date: Date;
	payment_type: PaymentType;
	created_at: Date;
	updated_at: Date;
	deleted_at: Date | null;
	category: Pick<Category, "name">;
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
	id: number;
	userId: string;
	category: string;
	description: string;
	amount: number;
	transaction_date: Date;
	created_at: Date;
	updated_at: Date;
	deleted_at: Date | null;
}
