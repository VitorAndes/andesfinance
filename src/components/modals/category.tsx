import { Trash2 } from "lucide-react";

interface CategoryProps {
	name: string;
	removeCategory: () => void;
}

export function Category({ name, removeCategory }: CategoryProps) {
	return (
		<div className="starting:-translate-y-10 flex translate-y-0 items-center justify-between rounded-md border border-secondary/80 p-4 transition-all duration-500">
			<p className="font-secondary">{name}</p>
			<button type="button" className="cursor-pointer" onClick={removeCategory}>
				<Trash2 />
			</button>
		</div>
	);
}
