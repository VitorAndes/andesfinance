export function useNormalizeDate(date: string | Date) {
	const parsedDate =
		typeof date === "string" && /^\d+$/.test(date)
			? new Date(Number(date))
			: new Date(date);

	return new Intl.DateTimeFormat("pt-BR", {
		month: "long",
		day: "2-digit",
	}).format(parsedDate);
}
