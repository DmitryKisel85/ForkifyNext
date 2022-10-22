import { FaRegEdit, FaBookmark } from "react-icons/fa";

import styles from "./headerNavigation.module.scss";

const HeaderNavigation = () => {
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
                    <button className={styles.navBtn}>
                        <FaBookmark />
                        <span>Bookmarks</span>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default HeaderNavigation;
