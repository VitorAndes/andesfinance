import type { ComponentProps } from "react";

interface CardChartProps extends ComponentProps<"div"> {
	title: string;
}

export function CardSection({
	title,
	children,
	className,
	...props
}: CardChartProps) {
	return (
		<div
			{...props}
			className={`flex h-full w-full flex-col gap-4 rounded-md p-4 shadow-section ${className}`}
		>
			<h1 className="font-semibold font-title text-default lg:text-3xl">
				{title}
			</h1>
			{children}
		</div>
	);
}
