import { useAppSelector } from "../../hooks/typedHooks";
import { bookmarksSelector } from "../../store/bookmarks/bookmarksSelector";

import ResultsPreviewElement from "../ResultsPreviewElement";

import styles from "./bookmarks.module.scss";

type BookmarksProps = {
    isOverListHandle: (boolean: boolean) => void;
};

const Bookmarks = ({ isOverListHandle }: BookmarksProps) => {
    const bookmarks = useAppSelector(bookmarksSelector);

    return (
        <div
            className={styles.bookmarks}
            onMouseEnter={() => isOverListHandle(true)}
            onMouseLeave={() => isOverListHandle(false)}
        >
            <ul className={styles.bookmarksList}>
                {bookmarks &&
                    bookmarks.length > 0 &&
                    bookmarks.map((bookmark) => {
                        return (
                            <ResultsPreviewElement
                                key={bookmark.id}
                                meal={bookmark}
                            />
                        );
                    })}
            </ul>
        </div>
    );
};

export default Bookmarks;
