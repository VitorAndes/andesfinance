import { useModal } from "@/context/modalContext";
import {
	Github,
	LayoutDashboard,
	Linkedin,
	Settings,
	SidebarClose
} from "lucide-react";

import { useSideBar } from "@/context/sidebarContext";
import { SocialLink } from "../common/socialLink";
import { NavLink } from "./navLink";

export function SideBar() {
	const { openModal } = useModal();
	const { isSidebarOpen, setIsSidebarOpen } = useSideBar();

	return (
		<div className="relative h-dvh">
			<aside
				className={`flex h-full flex-col gap-5 bg-default  transition-all lg:h-screen ${
					isSidebarOpen
						? "=translate-x-0 pointer-events-auto h-full w-64 p-4 md:w-80"
						: "-translate-x-2/2 pointer-events-none w-0 overflow-hidden p-0"
				}`}
			>
				<div className="flex items-center justify-between border-secondary/60 border-b pb-4">
					<h1 className=" font-primary text-center text-secondary text-xl md:text-3xl">
						AndesFinance
					</h1>
					<button
						aria-label="toggle modal button"
						className="flex size-11 items-center justify-center p-1 text-secondary md:hidden"
						type="button"
						onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					>
						<SidebarClose className="size-12" />
					</button>
				</div>

				<div className="flex h-full flex-col justify-between gap-4">
					<nav className="flex flex-col gap-2">
						<NavLink
							navIcon={<LayoutDashboard />}
							navTitle={"Dashboard"}
							navRoute={"/"}
						/>
					</nav>

					<button
						type="button"
						onClick={() => openModal("settings")}
						className="group flex cursor-pointer items-center gap-2 text-secondary font-title font-semibold text-sm transition-all "
					>
						<Settings className=" transition-all duration-700 group-hover:rotate-180" />
						Configurações
					</button>
				</div>
				<div className="flex gap-4">
					<SocialLink
						target="_blank"
						href="https://github.com/VitorAndes"
						aria-label="github social media"
						socialTitle={"Seguir"}
						socialIcon={<Github />}
					/>
					<SocialLink
						target="_blank"
						href="https://www.linkedin.com/in/vitor-andes-dos-santos-3265ba243/"
						aria-label="linkedin social media"
						socialTitle={"Conectar"}
						socialIcon={<Linkedin />}
					/>
				</div>
			</aside>
		</div>
	);
}
