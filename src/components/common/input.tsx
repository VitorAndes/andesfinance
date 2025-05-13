import type { ComponentProps, ReactNode } from "react";
interface InputProps extends ComponentProps<"input"> {
	htmlFor: string;
	label: string;
	icon?: ReactNode;
	errors?: string | undefined; // mudar pra obrigatorio depois
}

export function Input({ htmlFor, label, icon, errors, ...props }: InputProps) {
	return (
		<div className="w-full">
			<label
				htmlFor={htmlFor}
				className="relative top-2 ml-2 w-fit rounded-sm bg-background font-semibold text-default font-secondary"
			>
				{label}
			</label>
			<div className="flex items-center gap-2">
				<input
					{...props}
					className="h-12 w-full rounded-md border border-primary/50 px-2 focus:outline-none placeholder:font-medium text-default/60"
				/>
				{icon && (
					<button className="cursor-pointer" type="submit">
						{icon}
					</button>
				)}
			</div>
			{errors && <span className="text-red-600">{errors}</span>}
		</div>
	);
}
