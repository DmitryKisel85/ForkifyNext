import classNames from "classnames";

import fracty from "fracty";

import {
    FaClock,
    FaUserAlt,
    FaRegPlusSquare,
    FaRegMinusSquare,
    FaBookmark,
    FaCaretRight,
    FaArrowRight,
} from "react-icons/fa";

import { useAppSelector } from "../../hooks/typedHooks";
import { recipeIdSelector } from "../../store/recipe/recipeSelector";

import { useGetSingleRecipeQuery } from "../../services/ForkifyServices";

import styles from "./recipeElement.module.scss";

const RecipeElement = () => {
    const recipeId = useAppSelector(recipeIdSelector);

    const { data, isLoading } = useGetSingleRecipeQuery(recipeId);

    if (isLoading) return <h1>Loading...</h1>;

    if (!data) return <h1>Error</h1>;

    const { title, image_url, cooking_time, servings, ingredients, publisher, source_url } = data.data.recipe;

    return (
        <>
            <figure className={styles.recipeFig}>
                <img src={image_url} alt={title} className={styles.recipeImg} />
                <h1 className={styles.recipeTitle}>
                    <span>{title}</span>
                </h1>
            </figure>

            <div className={styles.recipeDetails}>
                <div className={styles.recipeInfo}>
                    <FaClock />
                    <span className={styles.recipeInfoData}>{cooking_time}</span>
                    <span className={styles.recipeInfoText}>minutes</span>
                </div>
                <div className={styles.recipeInfo}>
                    <FaUserAlt />
                    <span className={styles.recipeInfoData}>{servings}</span>
                    <span className={styles.recipeInfoText}>servings</span>

                    <div className={styles.recipeInfoButtons}>
                        <button className={styles.btnTiny}>
                            <FaRegMinusSquare />
                        </button>
                        <button className={styles.btnTiny}>
                            <FaRegPlusSquare />
                        </button>
                    </div>
                </div>

                {/* <div className="recipe__user-generated ${
             this._data.key ? '' : 'hidden'
           }">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div> */}
                <button className={classNames(styles.btnRound, styles.btnBookmark)}>
                    <FaBookmark />
                </button>
            </div>

            <div className={styles.recipeIngredients}>
                <h2 className={styles.heading2}>Recipe ingredients</h2>
                <ul className={styles.recipeIngredientList}>
                    {ingredients.map((ingredient) => (
                        <li className={styles.recipeIngredient}>
                            <FaCaretRight />
                            <div className={styles.recipeQuantity}>
                                {ingredient.quantity ? fracty(ingredient.quantity).toString() : ""}
                            </div>
                            <div className={styles.recipeDescription}>
                                <span className={styles.recipeUnit}>{ingredient.unit} </span>
                                {ingredient.description}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={styles.recipeDirections}>
                <h2 className={styles.heading2}>How to cook it</h2>
                <p className={styles.recipeDirectionsText}>
                    This recipe was carefully designed and tested by
                    <span className={styles.recipePublisher}> {publisher}</span>. Please check out directions at their
                    website.
                </p>
                <a
                    className={classNames(styles.btnSmall, styles.recipeBtn)}
                    href={source_url}
                    target="_blank"
                    rel="noreferrer"
                >
                    <span>Directions</span>
                    <FaArrowRight />
                </a>
            </div>
        </>
    );
};

export default RecipeElement;
