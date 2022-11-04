import { useMemo, useState } from "react";
import { FaRegTimesCircle } from "react-icons/fa";

import { useGetRecipesQuery } from "../../services/ForkifyServices";

import { useAppSelector, useAppDispatch } from "../../hooks/typedHooks";

import { getRecipeId } from "../../store/recipe/recipeSlice";
import { searchTermSelector } from "../../store/search/searchSelector";

import useViewport from "../../hooks/useViewport";

import ResultsPreviewElement from "../ResultsPreviewElement";
import Pagination from "../Pagination";
import Spinner from "../Spinner";
import RenderMessage from "../RenderMessage";

import styles from "./searchResults.module.scss";

const SearchResults = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [activeElement, setActiveElement] = useState<string | null>(null);
    const searchTerm = useAppSelector(searchTermSelector);

    const { width, height } = useViewport();
    console.log(width, height);

    // setting pagesize for pagination
    let PageSize = width < 450 ? 5 : 10;

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
        <div className={styles.searchResults}>
            {data && (
                <ul className={styles.results}>
                    {currentTableData?.map((meal) => {
                        return (
                            <ResultsPreviewElement
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

export default SearchResults;
