import NoRecipeStartBlock from "../NoRecipeStartBlock";
import RecipeElement from "../RecipeElement";

import styles from "./recipe.module.scss";

const Recipe = () => {
    return (
        <div className={styles.recipe}>
            <NoRecipeStartBlock />
            <RecipeElement />
        </div>
    );
};

export default Recipe;
