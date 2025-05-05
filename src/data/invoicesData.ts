type invoicesDataType = {
	id: string;
	invoice: string;
	tag: string;
	dueDate: string;
	amount: number;
	status: "pending" | "paid";
};

export const invoicesData: invoicesDataType[] = [
	{
		id: "1",
		invoice: "Pagar a Crunch",
		dueDate: "01/02/2025",
		amount: 123,
		tag: "Assinatura",
		status: "pending",
	},
	{
		id: "2",
		invoice: "Pagar a Sarah",
		dueDate: "01/02/2025",
		amount: 333,
		tag: "serviço",
		status: "paid",
	},
	{
		id: "3",
		invoice: "Netflix",
		dueDate: "05/02/2025",
		amount: 39.9,
		tag: "Assinatura",
		status: "pending",
	},
	{
		id: "4",
		invoice: "Compra na Amazon",
		dueDate: "10/02/2025",
		amount: 259.9,
		tag: "Eletrônicos",
		status: "paid",
	},
	{
		id: "5",
		invoice: "Aluguel",
		dueDate: "01/02/2025",
		amount: 1200,
		tag: "Moradia",
		status: "pending",
	},
	{
		id: "6",
		invoice: "Spotify",
		dueDate: "01/02/2025",
		amount: 19.9,
		tag: "Assinatura",
		status: "paid",
	},
	{
		id: "7",
		invoice: "Conta de Luz",
		dueDate: "15/02/2025",
		amount: 187.65,
		tag: "Utilidade",
		status: "pending",
	},
	{
		id: "8",
		invoice: "Curso online",
		dueDate: "03/02/2025",
		amount: 499,
		tag: "Educação",
		status: "paid",
	},
	{
		id: "9",
		invoice: "Cinema com amigos",
		dueDate: "07/02/2025",
		amount: 72,
		tag: "Lazer",
		status: "paid",
	},
	{
		id: "10",
		invoice: "Plano de internet",
		dueDate: "02/02/2025",
		amount: 99.9,
		tag: "Utilidade",
		status: "pending",
	},
];
