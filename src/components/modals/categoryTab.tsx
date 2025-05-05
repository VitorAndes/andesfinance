import { categoryData, type categoryDataType } from "@/data/categoryData";
import { PlusCircle } from "lucide-react";
import { type FormEvent, useRef, useState } from "react";
import { Input } from "../common/input";
import { Category } from "./category";

export function CategoryTab() {
	const [category, setCategory] = useState<categoryDataType[]>(categoryData);

	const inputCategory = useRef<HTMLInputElement>(null);

	function removeCategory(id: string) {
		setCategory((prev) => prev.filter((cat) => cat.id !== id));
	}

	function generateId() {
		const timestamp = Date.now().toString(36);
		const random = Math.random().toString(36).substring(2, 10);
		return `${timestamp}-${random}`;
	}

	function handleSubmmit(e: FormEvent) {
		e.preventDefault();
		const newCategory = inputCategory.current?.value;

		if (!newCategory) return;

		setCategory((prev) => [...prev, { name: newCategory, id: generateId() }]);
		if (inputCategory.current) inputCategory.current.value = "";
	}

	return (
		<>
			<form onSubmit={handleSubmmit} className="flex gap-2">
				<Input
					ref={inputCategory}
					htmlFor={"newCategory"}
					label={"Adicionar nova categoria"}
					icon={<PlusCircle />}
				/>
			</form>
			<div className="mt-5 flex max-h-96 flex-col-reverse gap-3 overflow-y-auto">
				{category?.map(({ id, name }) => {
					return (
						<Category
							key={id}
							name={name}
							removeCategory={() => removeCategory(id)}
						/>
					);
				})}
			</div>
		</>
	);
}
