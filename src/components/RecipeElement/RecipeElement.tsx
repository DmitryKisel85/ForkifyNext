import { useEffect, useState } from "react";
import classNames from "classnames";
import fracty from "fracty";
import {
    FaClock,
    FaUserAlt,
    FaRegPlusSquare,
    FaRegMinusSquare,
    FaRegBookmark,
    FaBookmark,
    FaCaretRight,
    FaArrowRight,
    FaRegTimesCircle,
} from "react-icons/fa";

import { useAppDispatch, useAppSelector } from "../../hooks/typedHooks";
import { bookmarksSelector } from "../../store/bookmarks/bookmarksSelector";

import { useGetSingleRecipeQuery } from "../../services/ForkifyServices";

import { pushBookmarkToStore, removeBookmarkFromStore } from "../../store/bookmarks/bookmarksSlice";

import Spinner from "../Spinner";

import styles from "./recipeElement.module.scss";
import RenderMessage from "../RenderMessage";

type RecipeElementProps = {
    id: string;
};

const RecipeElement = ({ id }: RecipeElementProps) => {
    const bookmarks = useAppSelector(bookmarksSelector);

    const { data, isLoading, error, isSuccess } = useGetSingleRecipeQuery(id);
    const dispatch = useAppDispatch();

    const [servingsNumber, setServingsNumber] = useState<number>(0);
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        if (data) {
            setServingsNumber(data.data.recipe.servings);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data?.data.recipe.servings, id]);

    useEffect(() => {
        if (bookmarks.some((bookmark) => bookmark.id === id)) {
            setIsBookmarked(true);
        } else {
            setIsBookmarked(false);
        }
    }, [id, bookmarks]);

    if (isLoading) return <Spinner />;
    if (!data)
        return (
            <RenderMessage
                messageText={`Something goes wrong! Please, try again!`}
                messageIcon={<FaRegTimesCircle />}
            />
        );
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

    const { title, image_url, cooking_time, servings, ingredients, publisher, source_url } = data.data.recipe;

    const handleIncreaseServings = () => {
        setServingsNumber((servingsNumber) => servingsNumber + 1);
    };

    const handleDecreaseServings = () => {
        if (servingsNumber === 1) return;
        setServingsNumber((servingsNumber) => servingsNumber - 1);
    };

    const handleBookmarks = () => {
        if (bookmarks.some((bookmark) => bookmark.id === id)) {
            dispatch(removeBookmarkFromStore(id));
            setIsBookmarked(false);
        } else {
            dispatch(pushBookmarkToStore(data.data.recipe));
            setIsBookmarked(true);
        }
    };

    return (
        <>
            {isSuccess && (
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
                            <span className={styles.recipeInfoData}>{servingsNumber}</span>
                            <span className={styles.recipeInfoText}>servings</span>

                            <div className={styles.recipeInfoButtons}>
                                <button className={styles.btnTiny} onClick={handleDecreaseServings}>
                                    <FaRegMinusSquare />
                                </button>
                                <button className={styles.btnTiny} onClick={handleIncreaseServings}>
                                    <FaRegPlusSquare />
                                </button>
                            </div>
                        </div>

                        <button className={classNames(styles.btnRound, styles.btnBookmark)} onClick={handleBookmarks}>
                            {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                        </button>
                    </div>

                    <div className={styles.recipeIngredients}>
                        <h2 className={styles.heading2}>Recipe ingredients</h2>
                        <ul className={styles.recipeIngredientList}>
                            {ingredients.map((ingredient, index) => (
                                <li key={index} className={styles.recipeIngredient}>
                                    <FaCaretRight />
                                    <div className={styles.recipeQuantity}>
                                        {ingredient.quantity
                                            ? fracty((ingredient.quantity / servings) * servingsNumber).toString()
                                            : ""}
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
                            <span className={styles.recipePublisher}> {publisher}</span>. Please check out directions at
                            their website.
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
            )}
        </>
    );
};

export default RecipeElement;
