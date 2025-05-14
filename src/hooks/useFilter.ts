import type { Transaction } from "@/types/transaction";
import { useMemo, useState } from "react";

export function useFilter(transactionsData: Transaction[]) {
	const [searchName, setSearchName] = useState("");
	const [searchTag, setSearchTag] = useState("");
	const [searchMethod, setSearchMethod] = useState("");
	const [searchType, setSearchType] = useState("");
	const [searchDate, setSearchDate] = useState("");

	const filteredData = useMemo(() => {
		if (!transactionsData) return [];

		return transactionsData.filter((transaction: Transaction) => {
			const matchesName =
				searchName.trim() === "" ||
				(transaction.type === "compras" &&
					transaction.name.toLowerCase().includes(searchName.toLowerCase())) ||
				(transaction.type === "recebimentos" &&
					transaction.name.toLowerCase().includes(searchName.toLowerCase()));

			const matchesTag =
				searchTag.trim() === "" ||
				(transaction.type === "compras" &&
					transaction.tag?.toLowerCase().includes(searchTag.toLowerCase()));

			const matchesMethod =
				searchMethod.trim() === "" ||
				(transaction.type === "compras" &&
					transaction.paymentMethod
						.toLowerCase()
						.includes(searchMethod.toLowerCase()));

			const matchesType =
				searchType.trim() === "" ||
				(transaction.type === "compras" &&
					transaction.type.toLowerCase().includes(searchType.toLowerCase())) ||
				(transaction.type === "recebimentos" &&
					transaction.type.toLowerCase().includes(searchType.toLowerCase()));

			const matchesDate =
				searchDate.trim() === "" ||
				transaction.paymentDate.includes(searchDate);

			return (
				matchesName && matchesTag && matchesMethod && matchesType && matchesDate
			);
		});
	}, [
		transactionsData,
		searchName,
		searchTag,
		searchMethod,
		searchType,
		searchDate,
	]);

	return {
		filteredData,
		searchName,
		setSearchName,
		searchTag,
		setSearchTag,
		searchMethod,
		setSearchMethod,
		searchType,
		setSearchType,
		searchDate,
		setSearchDate,
	};
}
