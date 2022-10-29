import { useAppDispatch, useAppSelector } from "../../hooks/typedHooks";
import { bookmarksSelector } from "../../store/bookmarks/bookmarksSelector";
import { getRecipeId } from "../../store/recipe/recipeSlice";

import ResultsPreviewElement from "../ResultsPreviewElement";

import styles from "./bookmarks.module.scss";

type BookmarksProps = {
    isOverListHandle: (boolean: boolean) => void;
};

const Bookmarks = ({ isOverListHandle }: BookmarksProps) => {
    const bookmarks = useAppSelector(bookmarksSelector);

    const dispatch = useAppDispatch();

    return (
        <>
            {bookmarks && bookmarks.length > 0 ? (
                <div
                    className={styles.bookmarks}
                    onMouseEnter={() => isOverListHandle(true)}
                    onMouseLeave={() => isOverListHandle(false)}
                >
                    <ul className={styles.bookmarksList}>
                        {bookmarks.map((bookmark) => {
                            return (
                                <ResultsPreviewElement
                                    key={bookmark.id}
                                    meal={bookmark}
                                    onClick={() =>
                                        dispatch(getRecipeId(bookmark.id))
                                    }
                                />
                            );
                        })}
                    </ul>
                </div>
            ) : (
                ""
            )}
        </>
    );
};

export default Bookmarks;
