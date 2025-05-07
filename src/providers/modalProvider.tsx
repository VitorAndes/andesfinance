
import { ModalProvider } from "@/context/modalContext";

export function ModalProviders({ children }: { children: React.ReactNode }) {
	return <ModalProvider>{children}</ModalProvider>;
}
