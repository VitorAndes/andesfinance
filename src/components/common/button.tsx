"use client";
import { type Invoice, type ModalType, useModal } from "@/context/modalContext";
import type { ComponentProps } from "react";

const BUTTON_VARIANTS = {
	default: "bg-default text-secondary border border-secondary",
	ghost: "border border-secondary hover:text-secondary",
	danger: "bg-red-500 text-secondary",
};

type ButtonVariant = keyof typeof BUTTON_VARIANTS;

interface ButtonProps extends ComponentProps<"button"> {
	variant?: ButtonVariant;
	modalType?: ModalType;
	modalData?: Invoice;
}

export function Button({
	children,
	variant = "default",
	className,
	modalType,
	modalData,
	...props
}: ButtonProps) {
	const { openModal } = useModal();
	return (
		<button
			type="button"
			{...props}
			onClick={() => openModal(modalType ?? null, modalData)}
			className={`${BUTTON_VARIANTS[variant]} group relative flex w-52 flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-md py-3 transition-all ${className} `}
		>
			<span className="relative z-10 flex items-center gap-2 font-secondary font-semibold text-xs">
				{children}
			</span>
			<span className="absolute inset-0 overflow-hidden rounded-md">
				<span
					className={`${variant === "danger" ? "bg-red-600" : "bg-primary"} -translate-x-full group-hover:-translate-x-0 absolute left-0 aspect-square w-full origin-center rounded-full transition-all duration-500 group-hover:scale-150`}
				/>
			</span>
		</button>
	);
}
