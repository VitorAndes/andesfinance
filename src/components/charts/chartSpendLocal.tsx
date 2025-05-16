import { db } from "@/db/dexie";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "../ui/chart";

type chartDataType = {
	name: string;
	cost: number;
};

const chartConfig = {
	desktop: {
		label: "é",
		color: "var(--color-primary)",
	},
} satisfies ChartConfig;

export function ChartSpendLocal() {
	const invoices = useLiveQuery(async () => await db.invoices.toArray());
	const expenses = useLiveQuery(async () => await db.expenses.toArray());

	const [chartData, setChartData] = useState<chartDataType[]>([]);

	useEffect(() => {
		if (!invoices || !expenses) return;

		const allExpenses = [
			...invoices.map((invoice) => ({
				amount: invoice.amount,
				category: invoice.category,
			})),
			...expenses.map((expense) => ({
				amount: expense.amount,
				category: expense.category,
			})),
		];

		const groupedByCategory = allExpenses.reduce<Record<string, number>>(
			(acc, item) => {
				const key = item.category;
				const value = item.amount / 100;

				if (!acc[key]) acc[key] = 0;
				acc[key] += value;
				return acc;
			},
			{},
		);

		const formattedChartData = Object.entries(groupedByCategory).map(
			([category, cost]) => ({
				name: category,
				cost,
			}),
		);

		setChartData(formattedChartData);
	}, [expenses, invoices]);

	return (
		<ChartContainer className="min-h-[250px]" config={chartConfig}>
			<BarChart
				accessibilityLayer
				data={chartData}
				margin={{
					top: 20,
				}}
				className="font-secondary"
			>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey="name"
					tickLine={false}
					tickMargin={10}
					axisLine={false}
					tickFormatter={(value) => value.slice(0, 4)}
				/>
				<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
				<Bar dataKey="cost" fill="var(--color-primary)" radius={8}>
					<LabelList
						position="top"
						offset={12}
						className="fill-default font-semibold"
						fontSize={12}
					/>
				</Bar>
			</BarChart>
		</ChartContainer>
	);
}
