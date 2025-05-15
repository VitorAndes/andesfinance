import type { ComponentProps, ReactNode } from "react";
interface SocialLinkProps extends ComponentProps<"a"> {
	socialIcon?: ReactNode;
	socialTitle: string;
}

export function SocialLink({
	socialTitle,
	socialIcon,
	...props
}: SocialLinkProps) {
	return (
		<a
			{...props}
			className="group relative flex size-10 cursor-pointer select-none items-baseline justify-center overflow-hidden rounded-xl bg-default font-bold text-secondary transition-all duration-300 ease-in-out hover:w-36"
		>
			<span className="group-hover:-translate-x-12 absolute transition-transform duration-300 ease-in-out">
				{socialIcon}
			</span>
			<span className=" pl-10 text-lg uppercase opacity-0 transition-opacity ease-in group-hover:opacity-100 group-hover:duration-700">
				{socialTitle}
			</span>
		</a>
	);
}
