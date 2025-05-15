import { createContext, useContext, useState } from "react";

interface SidebarContextType {
	isSidebarOpen: boolean;
	setIsSidebarOpen: (value: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({
	children,
}: { children: React.ReactNode }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
			{children}
		</SidebarContext.Provider>
	);
};

export const useSideBar = () => {
	const context = useContext(SidebarContext);
	if (!context)
		throw new Error("useSidebar deve ser usado dentro de SidebarProvider");
	return context;
};
