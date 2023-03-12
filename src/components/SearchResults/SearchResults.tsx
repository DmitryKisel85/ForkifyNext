import { useMemo, useState } from "react";
import { FaRegTimesCircle } from "react-icons/fa";

import { useGetRecipesQuery } from "services/api";

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
	const [activeRecipe, setActiveRecipe] = useState<string | null>(null);

	const searchTerm = useAppSelector(searchTermSelector);
	const dispatch = useAppDispatch();

	const { width } = useViewport();

	const { data, isLoading, isFetching, error } = useGetRecipesQuery(searchTerm, {
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
	if (isLoading || isFetching) return <Spinner />;
	if (error) {
		let errMsg = "";

		if ("status" in error) {
			errMsg = "error" in error ? error.error : JSON.stringify(error.data);
		} else {
			if (error.message) {
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

	const handleUpdateActiveRecipe = (id: string) => {
		setActiveRecipe(id);
		dispatch(getRecipeId(id));
	};

	return (
		<div className={s.root}>
			{data && data.length > 0 && (
				<ul className={s.list}>
					{currentTableData?.map((recipe) => {
						return (
							<PreviewRecipe
								key={recipe.id}
								recipe={recipe}
								onClick={() => handleUpdateActiveRecipe(recipe.id)}
								isActive={recipe.id === activeRecipe}
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
