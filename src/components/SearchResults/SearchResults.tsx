import { useMemo, useState } from "react";
import { FaRegTimesCircle } from "react-icons/fa";

import { useGetRecipesQuery } from "services/ForkifyServices";

import { getRecipeId } from "store/recipe/recipeSlice";
import { searchTermSelector } from "store/search/searchSelector";

import { useAppSelector, useAppDispatch } from "hooks/typedHooks";
import { useViewport } from "hooks/useViewport";

import { ResultsPreview } from "components/ResultsPreview";
import { Pagination } from "components/SearchResults/Pagination";
import { Spinner } from "components/Spinner";
import { RenderMessage } from "components/RenderMessage";

import s from "./searchResults.module.scss";

const SearchResults = () => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [activeElement, setActiveElement] = useState<string | null>(null);
	const searchTerm = useAppSelector(searchTermSelector);

	const { width } = useViewport();

	// setting pagesize for pagination
	let PageSize = width < 450 ? 6 : 10;

	const dispatch = useAppDispatch();

	const { data, isLoading, error } = useGetRecipesQuery(searchTerm);

	const result = data?.data.recipes;
	const lengthTotal = result?.length;

	const updateActiveElement = (id: string) => {
		setActiveElement(id);
		dispatch(getRecipeId(id));
	};

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		return result?.slice(firstPageIndex, lastPageIndex);
	}, [currentPage, result, PageSize]);

	if (data?.results === 0) {
		return (
			<RenderMessage
				messageText={`No results were found. Please, try another query!`}
				messageIcon={<FaRegTimesCircle />}
			/>
		);
	}
	if (!searchTerm) return <div></div>;
	if (isLoading) return <Spinner />;
	if (error) {
		if ("status" in error) {
			// you can access all properties of `FetchBaseQueryError` here
			const errMsg = "error" in error ? error.error : JSON.stringify(error.data);

			return (
				<RenderMessage
					messageText={`Something goes wrong! ${errMsg}. Please, try again!`}
					messageIcon={<FaRegTimesCircle />}
				/>
			);
		} else {
			// you can access all properties of `SerializedError` here
			return (
				<RenderMessage
					messageText={`Something goes wrong! ${error.message}. Please, try again!`}
					messageIcon={<FaRegTimesCircle />}
				/>
			);
		}
	}

	return (
		<div className={s.root}>
			{data && data.results > 0 && (
				<ul className={s.list}>
					{currentTableData?.map((meal) => {
						return (
							<ResultsPreview
								key={meal.id}
								meal={meal}
								onClick={() => updateActiveElement(meal.id)}
								activeElement={activeElement}
							/>
						);
					})}
				</ul>
			)}

			<Pagination
				currentPage={currentPage}
				totalCount={lengthTotal || 0}
				pageSize={PageSize}
				onPageChange={(page) => setCurrentPage(page)}
			/>
		</div>
	);
};

export { SearchResults };
