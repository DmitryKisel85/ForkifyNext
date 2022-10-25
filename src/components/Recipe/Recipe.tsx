import NoRecipeStartBlock from "../NoRecipeStartBlock";
import RecipeElement from "../RecipeElement";

import { recipeIdSelector } from "../../store/recipe/recipeSelector";
import { useAppSelector } from "../../hooks/typedHooks";

import styles from "./recipe.module.scss";

const Recipe = () => {
    const chosenRecipe = useAppSelector(recipeIdSelector);

    return <div className={styles.recipe}>{chosenRecipe ? <RecipeElement /> : <NoRecipeStartBlock />}</div>;
};

export default Recipe;
