import { useState } from "react";
import { Button } from "../common/button";
import { CategoryTab } from "./categoryTab";

enum Tab {
	Home = "home",
	Category = "category",
}

export function ModalSettings() {
	const [activeTab, setActiveTab] = useState<Tab>(Tab.Category);

	return (
		<>
			<div className="-top-10 absolute left-2/12 w-2/3 rounded-lg bg-default py-8 shadow shadow-default">
				<h1 className="text-center font-semibold font-title text-secondary lg:text-lg ">
					Settings
				</h1>
			</div>

			<nav className="mt-12 flex gap-2 border-b pb-2">
				<Button
					variant={activeTab === Tab.Category ? "default" : "ghost"}
					onClick={() => setActiveTab(Tab.Category)}
				>
					Category
				</Button>
			</nav>

			<div className="h-fit ">
				{activeTab === Tab.Home && "home"}
				{activeTab === Tab.Category && <CategoryTab />}
			</div>
		</>
	);
}
