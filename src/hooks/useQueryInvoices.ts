import { db } from "@/db/dexie";
import type { Invoice } from "@/types/types";
import { useLiveQuery } from "dexie-react-hooks";

function mapInvoice(invoice: Invoice): Invoice {
	return {
		invoiceId: invoice.invoiceId,
		product: invoice.product,
		category: invoice.category,

		amount: invoice.amount / 100,
		transaction_date: invoice.transaction_date,
		payment_status: invoice.payment_status,
	};
}

export function useQueryInvoices() {
	const allInvoices = useLiveQuery(() => db.invoices.toArray());

	const invoice = allInvoices?.map(mapInvoice) ?? [];

	return invoice;
}
