import { useGetMealsQuery } from "../../services/ForkifyServices";
import { useAppSelector, useAppDispatch } from "../../hooks/typedHooks";

import { getRecipeId } from "../../store/recipe/recipeSlice";

import { searchTermSelector } from "../../store/search/searchSelector";

import ResultsPreviewElement from "../ResultsPreviewElement";
import ErrorMessage from "../ErrorMessage";

import styles from "./results.module.scss";
import { useState } from "react";

const Results = () => {
    const searchTerm = useAppSelector(searchTermSelector);

    const dispatch = useAppDispatch();

    const { data, isLoading } = useGetMealsQuery(searchTerm);

    const [activeElement, setActiveElement] = useState<string | null>(null);

    const result = data?.data?.recipes;

    const updateActiveElement = (id: string) => {
        setActiveElement(id);
        dispatch(getRecipeId(id));
    };

    if (isLoading) return <h1>Loading...</h1>;

    return (
        <>
            {data && data.results > 0 ? (
                <ul className={styles.results}>
                    {result?.map((meal) => {
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
        </>
    );
};

export default Results;
