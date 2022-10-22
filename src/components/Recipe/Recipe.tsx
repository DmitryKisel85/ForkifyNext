import NoRecipeStartBlock from "../NoRecipeStartBlock";

import styles from "./recipe.module.scss";

const Recipe = () => {
    return (
        <div className={styles.recipe}>
            <NoRecipeStartBlock />
        </div>
    );
};

export default Recipe;
