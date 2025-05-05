import { ChevronsLeft, ChevronsRight } from "lucide-react";

export const PAGINATION_CONFIG = {
	pageSize: 10,
};

interface TablePaginationProps {
	pageNumber: number;
	totalPages: number;
	totalRows: number;
	goToPage: (page: number) => void;
}

export function TablePagination({
	goToPage,
	pageNumber,
	totalPages,
	totalRows,
}: TablePaginationProps) {
	function getRowRange() {
		const firstRow =
			pageNumber === 1 ? 1 : (pageNumber - 1) * PAGINATION_CONFIG.pageSize + 1;
		const lastRow = Math.min(
			pageNumber * PAGINATION_CONFIG.pageSize,
			totalRows,
		);
		return { firstRow, lastRow };
	}

	const { firstRow, lastRow } = getRowRange();
	const pageButtons = Array.from({ length: totalPages }, (_, i) => i + 1);

	// Button styles
	const baseButtonStyle =
		"p-1 px-3 rounded-md transition-all font-secondary font-semibold cursor-pointer";
	const activeButtonStyle = `${baseButtonStyle} bg-primary shadow-inner text-secondary shadow-default/20`;
	const inactiveButtonStyle = `${baseButtonStyle} bg-secondary hover:bg-primary/85`;
	const prevNextButtonStyle =
		"cursor-pointer hover:bg-primary hover:text-secondary rounded-md transition-all p-1 ";

	return (
		<footer className="flex w-full flex-wrap justify-center gap-4 md:items-center md:justify-between ">
			<div className="flex items-center gap-2">
				<button
					type="button"
					onClick={() => goToPage(Math.max(1, pageNumber - 1))}
					disabled={pageNumber === 1}
					className={`${pageNumber === 1 ? "cursor-not-allowed p-1 opacity-50" : `${prevNextButtonStyle}`}`}
					aria-label="Previous page"
				>
					<ChevronsLeft />
				</button>

				{pageButtons.map((page) => (
					<button
						key={`page-${page}`}
						type="button"
						onClick={() => goToPage(page)}
						disabled={pageNumber === page}
						className={
							pageNumber === page ? activeButtonStyle : inactiveButtonStyle
						}
					>
						{page}
					</button>
				))}

				<button
					type="button"
					onClick={() => goToPage(Math.min(totalPages, pageNumber + 1))}
					disabled={pageNumber === totalPages}
					className={`${pageNumber === totalPages ? "cursor-not-allowed p-1 opacity-50" : `${prevNextButtonStyle}`}`}
					aria-label="Next page"
				>
					<ChevronsRight />
				</button>
			</div>

			<p className="font-secondary text-default/50">
				Vizualizando{" "}
				<span className="font-semibold text-primary">
					{firstRow} - {lastRow}
				</span>{" "}
				de <span className="font-semibold text-primary">{totalRows}</span> items
			</p>
		</footer>
	);
}
