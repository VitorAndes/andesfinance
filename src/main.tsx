import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import { App } from "./App.tsx";
import "./index.css";
import { ModalProviders } from "./providers/modalProvider.tsx";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ModalProviders>
			<Toaster
				richColors
				visibleToasts={3}
				expand
				toastOptions={{
					className: "p-5 text-base",
				}}
			/>
			<App />
		</ModalProviders>
	</StrictMode>,
);
