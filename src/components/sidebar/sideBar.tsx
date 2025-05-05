import { useModal } from "@/context/modalContext";
import {
	Coffee,
	Github,
	LayoutDashboard,
	Linkedin,
	Settings,
	SidebarClose,
} from "lucide-react";

import { useState } from "react";
import { Button } from "../common/button";
import { SocialLink } from "../common/socialLink";
import { NavLink } from "./navLink";

export function SideBar() {
	const [isSideBarOpen, setIsSideBarOpen] = useState(false);
	const { openModal } = useModal();

	return (
		<div className="relative h-dvh">
			<aside
				className={`flex h-full flex-col gap-5 bg-default transition-all lg:h-screen ${
					isSideBarOpen
						? "=translate-x-0 pointer-events-auto h-full w-64 p-4 md:w-80"
						: "-translate-x-2/2 pointer-events-none w-0 overflow-hidden p-0"
				}`}
			>
				<h1 className="border-secondary/60 border-b pb-4 font-semibold font-title text-secondary md:text-3xl">
					AndesFinance
				</h1>

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
						className="group flex cursor-pointer items-center gap-2 text-secondary "
					>
						<Settings className=" transition-all duration-700 group-hover:rotate-180" />
						Configurações
					</button>
				</div>

				<Button className="w-full flex-none">
					Buy me a coffee <Coffee />
				</Button>
				<div className="flex flex-col gap-2">
					<button
						type="button"
						className="flex w-full items-center gap-2 truncate rounded-md bg-primary p-3"
					>
						<img
							src="https://avatars.githubusercontent.com/u/104475906?v=4"
							width={40}
							height={40}
							className="rounded-full"
							alt="Avatar"
						/>

						<div className="flex flex-col overflow-hidden text-start">
							<h1 className="truncate font-secondary font-semibold text-secondary text-sm">
								Vitor andes dos santos
							</h1>
							<p className="truncate font-secondary text-secondary/80 text-xs">
								vitor.andes.santos04@gmail.com
							</p>
						</div>
					</button>

					<div className="flex gap-2">
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
				</div>
			</aside>
			<button
				aria-label="close modal button"
				className=" -right-10 absolute bottom-2/12 z-20 mt-4 inline-flex size-10 items-center rounded-r-md bg-default p-2 text-secondary"
				type="button"
				onClick={() => setIsSideBarOpen((prev) => !prev)}
			>
				<SidebarClose />
			</button>
		</div>
	);
}
