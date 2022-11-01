import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FaRegEdit, FaRegBookmark } from "react-icons/fa";

import { toggleScrollLock } from "../../services/toggleScrollLock";

import AddRecipeModal from "../AddRecipeModal";
import Bookmarks from "../Bookmarks";

import styles from "./headerNavigation.module.scss";

const HeaderNavigation = () => {
    const [isOverButton, setIsOverButton] = useState(false);
    const [isOverList, setIsOverList] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    const isOverListHandle = (boolean: boolean) => {
        setIsOverList(boolean);
    };

    const handleShowModal = () => {
        setModalShow(true);
        toggleScrollLock();
    };

    return (
        <>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <button className={styles.navBtn} onClick={handleShowModal}>
                            <FaRegEdit />
                            <span>Add recipe</span>
                        </button>
                    </li>
                    <li className={styles.navItem}>
                        <button
                            className={styles.navBtn}
                            onMouseOver={() => setIsOverButton(true)}
                            onMouseOut={() => setIsOverButton(false)}
                        >
                            <FaRegBookmark />
                            <span>Bookmarks</span>
                        </button>
                        {(isOverButton || isOverList) && <Bookmarks isOverListHandle={isOverListHandle} />}
                    </li>
                </ul>
            </nav>
            <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
                {modalShow && <AddRecipeModal modalShow={modalShow} setModalShow={setModalShow} />}
            </AnimatePresence>
        </>
    );
};

export default HeaderNavigation;
