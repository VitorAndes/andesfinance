import type { ReactNode } from "react";

interface NavLinkProps {
	navIcon: ReactNode;
	navTitle: string;
	navRoute: string;
}

export function NavLink({ navIcon, navTitle, navRoute }: NavLinkProps) {
	// const routePathName = usePathname();
	// const LinkActive =
	// 	routePathName === navRoute ? "bg-primary w-full" : "bg-default";
	return (
		<a
			className={
				" flex w-full bg-primary gap-2 rounded-md p-3 font-secondary text-secondary transition-all hover:bg-accent font-semibold"
			}
			href={navRoute}
		>
			{navIcon}
			{navTitle}
		</a>
	);
}
