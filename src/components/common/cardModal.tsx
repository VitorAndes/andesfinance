import { useModal } from "@/context/modalContext";
import { X } from "lucide-react";
import { ModalIncome } from "../modals/modalBudget";
import { ModalInvoices } from "../modals/modalInvoices";
import { ModalSettings } from "../modals/modalSettings";
import { ModalSpend } from "../modals/modalSpend";

export function CardModal() {
	const { isOpen, modalType, closeModal, modalData } = useModal();

	return (
		<div
			className={`fixed top-0 left-0 z-20 flex h-full w-full items-center justify-center p-4 transition-all duration-300 ${
				isOpen
					? "pointer-events-auto bg-default/80 opacity-100"
					: "pointer-events-none opacity-0"
			}`}
		>
			<div
				className={`relative w-full space-y-4 rounded-lg bg-background p-4 shadow shadow-default transition-all duration-500 md:w-lg ${
					isOpen
						? " scale-105 opacity-100 ease-in-out"
						: " scale-95 opacity-0 duration-1000"
				}`}
			>
				{modalType === "settings" ? (
					<ModalSettings />
				) : modalType === "expense" ? (
					<ModalSpend />
				) : modalType === "income" ? (
					<ModalIncome />
				) : modalType === "invoice" && modalData ? (
					<ModalInvoices invoice={modalData} />
				) : null}

				<button
					type="button"
					className="absolute top-2 right-2 cursor-pointer"
					onClick={closeModal}
				>
					<X />
				</button>
			</div>
		</div>
	);
}
