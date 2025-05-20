import { db } from "@/db/dexie";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLiveQuery } from "dexie-react-hooks";
import { PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Input } from "../common/input";
import { Category } from "./category";

const schemaCategoryForm = z.object({
	categoryName: z
		.string()
		.toLowerCase()
		.nonempty({ message: "Adicione o nome da categoria" })
		.trim()
		.max(25)
		.min(1, { message: "Digite ao menos um caractere na categoria." }),
});

type createCategoryForm = z.infer<typeof schemaCategoryForm>;

export function CategoryTab() {
	const categorys = useLiveQuery(() => db.categories.toArray());

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<createCategoryForm>({
		resolver: zodResolver(schemaCategoryForm),
	});

	async function removeCategory(id: string) {
		try {
			await db.categories.where("categoryId").equals(id).delete();
			toast.dismiss("Categoria removida");
		} catch (error) {
			console.error(`falha ao remover categoria: ${error}`);
		}
	}

	function createId() {
		return Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
	}

	async function onSubmitCategoryForm({ categoryName }: createCategoryForm) {
		try {
			await db.categories.add({
				name: categoryName,
				categoryId: createId(),
			});

			toast.success(`Nova categoria criada: ${categoryName}`);

			reset();
		} catch (error) {
			console.error(`falha ao adicionar nova categoria: ${error}`);
		}
	}

	return (
		<>
			<p className="font-title font-semibold">
				Adicione categorias para as despesas.
			</p>

			<form
				onSubmit={handleSubmit(onSubmitCategoryForm)}
				className="flex gap-2"
			>
				<Input
					{...register("categoryName")}
					htmlFor={"newCategory"}
					label={"Nome da categoria"}
					icon={<PlusCircle />}
					errors={errors.categoryName?.message}
				/>
			</form>
			<div className="mt-5 flex  max-h-52 md:max-h-96 flex-col gap-3 overflow-y-auto">
				{categorys?.map(({ categoryId, name }) => {
					return (
						<Category
							key={categoryId}
							name={name}
							removeCategory={() => removeCategory(categoryId)}
						/>
					);
				})}
			</div>
		</>
	);
}
