import type { TagOptionType } from "@/components/common/inputSelect";
import { db } from "@/db/dexie";
import { useLiveQuery } from "dexie-react-hooks";

export function useQueryCategory() {
	const category = useLiveQuery<TagOptionType[]>(() =>
		db.categories.toArray().then((arr) =>
			arr
				.map((cat) => ({
					name: cat.name.trim(),
				}))
				.filter((item) => item.name.length > 0),
		),
	);

	return { category };
}
