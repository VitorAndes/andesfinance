"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
	{ income: "Entrada", value: 100, date: "12/04" },
	{ income: "Saída", value: 50, date: "16/04" },
	{ income: "Entrada", value: 90, date: "20/04" },
	{ income: "Entrada", value: 200, date: "22/04" },
	{ income: "Saída", value: 150, date: "25/04" },
	{ income: "Saída", value: 30, date: "01/05" },
	{ income: "Entrada", value: 100, date: "12/04" },
	{ income: "Saída", value: 50, date: "16/04" },
	{ income: "Entrada", value: 90, date: "20/04" },
	{ income: "Entrada", value: 200, date: "22/04" },
	{ income: "Saída", value: 150, date: "25/04" },
	{ income: "Saída", value: 30, date: "01/05" },
	{ income: "Entrada", value: 100, date: "12/04" },
	{ income: "Saída", value: 50, date: "16/04" },
	{ income: "Entrada", value: 90, date: "20/04" },
	{ income: "Entrada", value: 200, date: "22/04" },
	{ income: "Saída", value: 150, date: "25/04" },
	{ income: "Saída", value: 30, date: "01/05" },
];

const chartConfig = {
	income: {
		label: "income",
		color: "var(--color-primary	)",
	},
} satisfies ChartConfig;

export function ChartTransactions() {
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
				<XAxis
					dataKey="date"
					axisLine={false}
					tickMargin={8}
					tickFormatter={(value) => value.slice(0, 5)}
				/>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent indicator="dot" />}
				/>
				<Area
					dataKey="value"
					type="natural"
					fill="var(--color-primary)"
					fillOpacity={0.4}
					stroke="var(--color-default)"
					stackId="a"
				/>
			</AreaChart>
		</ChartContainer>
	);
}
