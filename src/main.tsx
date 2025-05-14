import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import { App } from "./App.tsx";
import { ModalProvider } from "./context/modalContext.tsx";
import "./index.css";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ModalProvider>
			<Toaster
				richColors
				visibleToasts={3}
				expand
				toastOptions={{
					className: "p-5 text-base",
				}}
			/>

			<App />
		</ModalProvider>
	</StrictMode>,
);
