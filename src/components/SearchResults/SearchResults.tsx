import { useMemo, useState } from "react";
import { FaRegTimesCircle } from "react-icons/fa";

import { useGetRecipesQuery } from "services/ForkifyServices";

import { getRecipeId } from "store/recipe/recipeSlice";
import { searchTermSelector } from "store/search/searchSelector";

import { useAppSelector, useAppDispatch } from "hooks/typedHooks";
import { useViewport } from "hooks/useViewport";

import { PreviewRecipe } from "components/PreviewRecipe";
import { Pagination } from "components/SearchResults/Pagination";
import { Spinner } from "components/Spinner";
import { RenderMessage } from "components/RenderMessage";

import s from "./searchResults.module.scss";

const SearchResults = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [activeElement, setActiveElement] = useState<string | null>(null);

	const searchTerm = useAppSelector(searchTermSelector);
	const dispatch = useAppDispatch();

	const { width } = useViewport();

	const { data, isLoading, error } = useGetRecipesQuery(searchTerm, {
		skip: searchTerm.length === 0,
	});

	//setting pageSize for pagination
	let pageSize = width < 450 ? 6 : 10;

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * pageSize;
		const lastPageIndex = firstPageIndex + pageSize;
		return data?.slice(firstPageIndex, lastPageIndex);
	}, [currentPage, data, pageSize]);

	if (data && data.length === 0) {
		return (
			<RenderMessage
				messageText={`No results were found. Please, try another query!`}
				messageIcon={<FaRegTimesCircle />}
			/>
		);
	}
	if (isLoading) return <Spinner />;
	if (error) {
		let errMsg = "";

		if ("status" in error) {
			errMsg = "error" in error ? error.error : JSON.stringify(error.data);
		} else {
			if (error && typeof error.message === "string") {
				errMsg = error.message;
			}
		}

		return (
			<RenderMessage
				messageText={`Something goes wrong! ${errMsg}. Please, try again!`}
				messageIcon={<FaRegTimesCircle />}
			/>
		);
	}

	const updateActiveElement = (id: string) => {
		setActiveElement(id);
		dispatch(getRecipeId(id));
	};

	return (
		<div className={s.root}>
			{data && data.length > 0 && (
				<ul className={s.list}>
					{currentTableData?.map((meal) => {
						return (
							<PreviewRecipe
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
				totalCount={data?.length || 0}
				pageSize={pageSize}
				onPageChange={(page) => setCurrentPage(page)}
			/>
		</div>
	);
};

export { SearchResults };
