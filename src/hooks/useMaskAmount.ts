import type React from "react";
import { useCallback, useMemo } from "react";

export function useMaskAmount(
	Amount: number,
	setValue: (value: number) => void,
) {
	const maskAmount = useMemo(() => {
		return (Amount / 100).toLocaleString("pt-BR", {
			style: "currency",
			currency: "BRL",
		});
	}, [Amount]);

	const handleChangeMaskAmount = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const raw = e.target.value.replace(/\D/g, "");
			setValue(Number(raw));
		},
		[setValue],
	);

	return {
		handleChangeMaskAmount,
		maskAmount,
	};
}
