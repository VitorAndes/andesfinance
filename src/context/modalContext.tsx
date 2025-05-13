import type { Invoice } from "@/types/types";
import { type ReactNode, createContext, useContext, useState } from "react";

export type ModalType = "settings" | "income" | "expense" | "invoice" | null;

type ModalContextType = {
	isOpen: boolean;
	modalType: ModalType;
	modalData?: Invoice | null;
	openModal: (type: ModalContextType["modalType"], data?: Invoice) => void;
	closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [modalType, setModalType] = useState<ModalType>(null);
	const [modalData, setModalData] = useState<Invoice | null>(null);

	function openModal(type: ModalType, data?: Invoice) {
		setModalType(type);
		setModalData(data ?? null);
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
		setModalData(null);
	}

	return (
		<ModalContext.Provider
			value={{ isOpen, modalType, openModal, closeModal, modalData }}
		>
			{children}
		</ModalContext.Provider>
	);
};

export const useModal = () => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error("useModal deve ser usado dentro de ModalProvider");
	}
	return context;
};
