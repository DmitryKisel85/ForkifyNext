import { useState } from "react";
import { FaRegEdit, FaBookmark } from "react-icons/fa";

import Bookmarks from "../Bookmarks";

import styles from "./headerNavigation.module.scss";

const HeaderNavigation = () => {
    const [isOverButton, setIsOverButton] = useState(false);
    const [isOverList, setIsOverList] = useState(false);

    const isOverListHandle = (boolean: boolean) => {
        setIsOverList(boolean);
    };

    return (
        <nav className={styles.nav}>
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <button className={styles.navBtn}>
                        <FaRegEdit />
                        <span>Add recipe</span>
                    </button>
                </li>
                <li className={styles.navItem}>
                    <button
                        className={styles.navBtn}
                        onMouseOver={() => setIsOverButton(true)}
                        onMouseOut={() => setIsOverButton(false)}
                        // onMouseLeave={() => setBookmarksStateOpen(false)}
                    >
                        <FaBookmark />
                        <span>Bookmarks</span>
                    </button>
                    {(isOverButton || isOverList) && (
                        <Bookmarks isOverListHandle={isOverListHandle} />
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default HeaderNavigation;
