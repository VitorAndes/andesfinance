import type { ComponentProps } from "react";

type TagOptionType = {
	id: number;
	name: string;
	value?: string;
};

interface InputSelectProps extends ComponentProps<"select"> {
	label: string;
	htmlFor: string;
	options: TagOptionType[];
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
				className="relative top-2 ml-2 w-fit rounded-sm bg-background font-semibold text-default"
			>
				{label}
			</label>
			<select
				{...props}
				className="h-12 w-full rounded-md border text-default/60 border-primary/50 px-2 text-xs focus:outline-none"
			>
				<option value="" disabled>
					Escolha uma opção
				</option>

				{options.map(({ name, id, value }) => {
					return (
						<option key={id} value={value ?? name}>
							{name}
						</option>
					);
				})}
			</select>
			{errors && <span className="text-red-600">{errors}</span>}
		</div>
	);
}
