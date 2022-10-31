import RecipeElement from "../RecipeElement";

import { FaRegSmileBeam } from "react-icons/fa";

import { recipeIdSelector } from "../../store/recipe/recipeSelector";
import { useAppSelector } from "../../hooks/typedHooks";

import styles from "./recipe.module.scss";
import RenderMessage from "../RenderMessage";

const Recipe = () => {
    const chosenRecipeId = useAppSelector(recipeIdSelector);

    return (
        <div className={styles.recipe}>
            {chosenRecipeId ? (
                <RecipeElement id={chosenRecipeId} />
            ) : (
                <RenderMessage
                    messageText="Start by searching for a recipe or an ingredient. Have fun!"
                    messageIcon={<FaRegSmileBeam />}
                />
            )}
        </div>
    );
};

export default Recipe;
