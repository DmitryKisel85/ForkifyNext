import NoRecipeStartBlock from "../NoRecipeStartBlock";
import RecipeElement from "../RecipeElement";

import { recipeIdSelector } from "../../store/recipe/recipeSelector";
import { useAppSelector } from "../../hooks/typedHooks";

import styles from "./recipe.module.scss";

const Recipe = () => {
    const chosenRecipeId = useAppSelector(recipeIdSelector);

    return (
        <div className={styles.recipe}>
            {chosenRecipeId ? (
                <RecipeElement id={chosenRecipeId} />
            ) : (
                <NoRecipeStartBlock />
            )}
        </div>
    );
};

export default Recipe;
