"use client";
import { Label, Pie, PieChart } from "recharts";
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "../ui/chart";

const chartData = [
	{ name: "crédito", cost: 333, fill: "var(--color-default)" },
	{ name: "débito", cost: 200, fill: "var(--color-primary)" },
	{ name: "dinheiro", cost: 250, fill: "var(--color-secondary)" },
];

const chartConfig = {
	crédito: {
		label: "Crédito",
		color: "var(--color-default)",
	},
	débito: {
		label: "Débito",
		color: "var(--color-primary)",
	},
	dinheiro: {
		label: "Dinheiro",
		color: "var(--color-secondary)",
	},
} satisfies ChartConfig;

export function ChartPaymentMethod() {
	const totalSpend = chartData.reduce((acc, curr) => acc + curr.cost, 0);

	return (
		<div className="flex h-full flex-col items-center justify-center">
			<ChartContainer
				config={chartConfig}
				className="aspect-square min-h-[250px] w-full xl:min-h-[350px]"
			>
				<PieChart>
					<ChartTooltip
						cursor={false}
						content={<ChartTooltipContent hideLabel />}
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
						className="-translate-y-2 flex-wrap gap-2 font-secondary font-semibold lg:text-lg [&>*]:basis-1/4 [&>*]:justify-center"
					/>
				</PieChart>
			</ChartContainer>
		</div>
	);
}
