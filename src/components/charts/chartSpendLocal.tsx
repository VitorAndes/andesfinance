import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "../ui/chart";

const chartData = [
	{ name: "alimentação", cost: 333 },
	{ name: "transporte", cost: 200 },
	{ name: "passeio", cost: 250 },
	{ name: "lazer", cost: 133 },
	{ name: "acessorios", cost: 100 },
	{ name: "tecnologia", cost: 50 },
];

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig;

export function ChartSpendLocal() {
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
