import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { db } from "@/db/dexie";
import { useNormalizeDate } from "@/hooks/useNormalizedDate";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useState } from "react";

type chartDataType = {
	saldo: number;
	date: string;
};

const chartConfig = {
	income: {
		label: "saldo",
		color: "var(--color-primary)",
	},
} satisfies ChartConfig;

export function ChartTransactions() {
	const incomes = useLiveQuery(async () => {
		const incomesTransaction = await db.incomes.toArray();
		return incomesTransaction.map(({ amount, transaction_date }) => ({
			amount,
			transaction_date: transaction_date,
		}));
	});

	const expenses = useLiveQuery(async () => {
		const expensesTransactions = await db.expenses.toArray();
		return expensesTransactions.map(({ amount, transaction_date }) => ({
			amount,
			transaction_date: transaction_date,
		}));
	});

	const [chartData, setChartData] = useState<chartDataType[]>([]);

	useEffect(() => {
		if (!incomes || !expenses) return;

		const groupedIncomes = incomes.reduce<Record<string, number>>(
			(acc, income) => {
				if (!acc[income.transaction_date]) acc[income.transaction_date] = 0;
				acc[income.transaction_date] += income.amount;
				return acc;
			},
			{},
		);

		const groupedExpenses = expenses.reduce<Record<string, number>>(
			(acc, expense) => {
				if (!acc[expense.transaction_date]) acc[expense.transaction_date] = 0;
				acc[expense.transaction_date] += expense.amount;
				return acc;
			},
			{},
		);

		const allDates = Array.from(
			new Set([
				...Object.keys(groupedIncomes),
				...Object.keys(groupedExpenses),
			]),
		).sort();

		let runningTotal = 0;
		const formattedChartData = allDates.map((date) => {
			const income = groupedIncomes[date] || 0;
			const expense = groupedExpenses[date] || 0;

			runningTotal += income - expense;

			return {
				date: useNormalizeDate(date),
				saldo: runningTotal / 100,
			};
		});

		setChartData(formattedChartData);
	}, [incomes, expenses]);

	return (
		<ChartContainer config={chartConfig} className="min-h-[250px]">
			<AreaChart
				accessibilityLayer
				data={chartData}
				margin={{
					top: 20,
					left: 20,
					right: 20,
				}}
			>
				<CartesianGrid vertical={false} />
				<XAxis dataKey="date" axisLine={false} tickMargin={8} />
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent indicator="dashed" />}
				/>
				<Area
					dataKey="saldo"
					type="natural"
					fill="var(--color-primary)"
					fillOpacity={0.4}
					stroke="var(--color-default)"
					stackId={1}
				/>
			</AreaChart>
		</ChartContainer>
	);
}
