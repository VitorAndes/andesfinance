import { Analytics } from "@vercel/analytics/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import { App } from "./App.tsx";
import { ModalProvider } from "./context/modalContext.tsx";
import { SidebarProvider } from "./context/sidebarContext.tsx";
import "./index.css";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<SidebarProvider>
			<ModalProvider>
				<Toaster
					richColors
					visibleToasts={3}
					toastOptions={{
						classNames: {
							title: "!font-title !font-semibold !text-lg",
						},
					}}
				/>

				<App />
				<Analytics />
			</ModalProvider>
		</SidebarProvider>
	</StrictMode>,
);
