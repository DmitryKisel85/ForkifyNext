import Results from "../Results";
import Pagination from "../Pagination";

import { useGetMealsQuery } from "../../services/ForkifyServices";
import { useAppSelector, useAppDispatch } from "../../hooks/typedHooks";

import { getRecipeId } from "../../store/recipe/recipeSlice";

import { searchTermSelector } from "../../store/search/searchSelector";

import ResultsPreviewElement from "../ResultsPreviewElement";
import ErrorMessage from "../ErrorMessage";
import Spinner from "../Spinner";

import { useMemo, useState } from "react";

import styles from "./searchResults.module.scss";

let PageSize = 10;

const SearchResults = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [activeElement, setActiveElement] = useState<string | null>(null);
    const searchTerm = useAppSelector(searchTermSelector);

    const dispatch = useAppDispatch();

    const { data, isLoading, isError } = useGetMealsQuery(searchTerm);

    const result = data?.data.recipes;
    const lengthTotal = result?.length;
    // const lengthTotal = data && data?.data.recipes.length;

    const updateActiveElement = (id: string) => {
        setActiveElement(id);
        dispatch(getRecipeId(id));
    };

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return result?.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, result]);

    if (!searchTerm) return <div></div>;
    if (isLoading) return <Spinner />;
    if (isError) return <ErrorMessage message="Something wrong has happened! Please, refresh the page!" />;

    return (
        <div className={styles.searchResults}>
            {data && data.results > 0 ? (
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
            ) : (
                <ErrorMessage message="We could not find that recipe. Please try another one!" />
            )}

            <Pagination
                currentPage={currentPage}
                totalCount={lengthTotal || 0}
                pageSize={PageSize}
                onPageChange={(page) => setCurrentPage(page)}
            />

            <p className={styles.copyright}>&copy; Design by Jonas Schmedtmann.</p>
        </div>
    );
};

export default SearchResults;
