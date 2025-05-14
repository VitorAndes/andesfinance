import type { Category, Expense, Income, Invoice } from "@/types/types";
import Dexie, { type EntityTable } from "dexie";

const db = new Dexie("FinanceDatabase") as Dexie & {
	incomes: EntityTable<Income, "incomeId">;
	expenses: EntityTable<Expense, "expenseId">;
	invoices: EntityTable<Invoice, "invoiceId">;
	categories: EntityTable<Category, "categoryId">;
};

db.version(1).stores({
	incomes: "incomeId, description, amount, transaction_date",
	expenses:
		"expenseId, product, amount, category, payment_type, transaction_date",
	invoices:
		"invoiceId, product, amount, category, payment_status, transaction_date",
	categories: "categoryId, name",
});

export { db };
