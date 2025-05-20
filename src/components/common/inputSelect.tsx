import type { ComponentProps } from "react";

export type TagOptionType = {
	name: string;
};

interface InputSelectProps extends ComponentProps<"select"> {
	label: string;
	htmlFor: string;
	options: TagOptionType[] | undefined;
	errors?: string | undefined; // mudar pra obrigatorio depois
}

export function InputSelect({
	htmlFor,
	label,
	options,
	errors,
	...props
}: InputSelectProps) {
	return (
		<div className="w-full">
			<label
				htmlFor={htmlFor}
				className="relative top-2 ml-2 w-fit rounded-sm bg-background font-semibold text-default font-secondary"
			>
				{label}
			</label>
			<select
				id={htmlFor}
				{...props}
				className="h-12 w-full rounded-md border border-primary/50 px-2 text-xs focus:outline-none font-secondary"
			>
				<option value="">Escolha uma opção</option>

				{options?.map((op) => {
					return (
						<option key={op.name} value={op.name}>
							{op.name}
						</option>
					);
				})}
			</select>
			{errors && <span className="text-red-600">{errors}</span>}
		</div>
	);
}
