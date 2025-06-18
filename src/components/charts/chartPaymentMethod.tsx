import { db } from "@/db/dexie";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useState } from "react";
import { Label, Pie, PieChart } from "recharts";
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "../ui/chart";

type ChartDataType = {
	name: string;
	cost: number;
	fill: string;
};

const chartConfig = {
	crédito: {
		label: "crédito",
		color: "var(--color-default)",
	},
	débito: {
		label: "débito",
		color: "var(--color-primary)",
	},
	dinheiro: {
		label: "dinheiro",
		color: "var(--color-secondary)",
	},
} satisfies ChartConfig;

export default function ChartPaymentMethod() {
	const invoices = useLiveQuery(async () => await db.invoices.toArray());
	const expenses = useLiveQuery(async () => await db.expenses.toArray());

	const [chartData, setChartData] = useState<ChartDataType[]>([]);

	useEffect(() => {
		if (!invoices || !expenses) return;

		const allExpenses = [
			...invoices.map((invoice) => ({
				amount: invoice.amount,
				payment_type: "crédito",
			})),
			...expenses.map((expense) => ({
				amount: expense.amount,
				payment_type: expense.payment_type,
			})),
		];

		const groupedByPaymentMethod = allExpenses.reduce<Record<string, number>>(
			(acc, item) => {
				const key = item.payment_type;
				const value = item.amount / 100;

				if (!acc[key]) acc[key] = 0;
				acc[key] += value;

				return acc;
			},
			{},
		);

		const formattedChartData = Object.entries(chartConfig).map(
			([key, config]) => ({
				name: config.label,
				cost: groupedByPaymentMethod[key] ?? 0,
				fill: config.color,
			}),
		);

		setChartData(formattedChartData);
	}, [invoices, expenses]);

	const totalSpend = chartData.reduce((acc, curr) => acc + curr.cost, 0);

	return (
		<>
		{!invoices?.length && !expenses?.length ? <picture className="flex flex-col items-center m-auto"><img src="/credit-card.svg" alt="imagem de cartões de pagamento" loading="lazy" height={100} width={300}/><p className="font-secondary">Insira despesas para visualizar seus dados.</p> </picture> : <div className="flex h-full flex-col items-center justify-center">
			<ChartContainer
				config={chartConfig}
				className="aspect-square min-h-[250px] w-full xl:min-h-[350px]"
			>
				<PieChart>
					<ChartTooltip
						cursor={false}
						content={<ChartTooltipContent hideLabel indicator="dot" />}
					/>
					<Pie
						data={chartData}
						dataKey="cost"
						nameKey="name"
						paddingAngle={5}
						innerRadius={60}
						outerRadius={100}
					>
						<Label
							content={({ viewBox }) => {
								if (viewBox && "cx" in viewBox && "cy" in viewBox) {
									return (
										<text
											x={viewBox.cx}
											y={viewBox.cy}
											textAnchor="middle"
											dominantBaseline="middle"
										>
											<tspan
												x={viewBox.cx}
												y={viewBox.cy}
												className="fill-foreground font-bold text-3xl"
											>
												{totalSpend.toLocaleString()}
											</tspan>
											<tspan
												x={viewBox.cx}
												y={(viewBox.cy || 0) + 24}
												className="fill-muted-foreground"
											>
												Total gasto
											</tspan>
										</text>
									);
								}
							}}
						/>
					</Pie>
					<ChartLegend
						content={<ChartLegendContent nameKey="name" />}
						className="-translate-y-2 flex-wrap gap-2 font-secondary font-semibold  lg:text-lg [&>*]:basis-1/4 [&>*]:justify-center"
					/>
				</PieChart>
			</ChartContainer>
		</div>}
		</>
	);
}
