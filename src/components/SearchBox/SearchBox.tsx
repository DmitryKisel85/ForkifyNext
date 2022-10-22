import { ChangeEvent } from "react";

import classNames from "classnames";

import { useAppDispatch, useAppSelector } from "../../hooks/typedHooks";

import { searchMeal } from "../../store/search/searchSlice";
import { searchTermSelector } from "../../store/search/searchSelector";

import { BiSearch } from "react-icons/bi";

import styles from "./searchBox.module.scss";

const SearchBox = () => {
    const searchTerm = useAppSelector(searchTermSelector);

    const dispatch = useAppDispatch();

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value.toLowerCase();
        dispatch(searchMeal(searchTerm));
    };

    return (
        <form className={styles.search}>
            <input
                type="text"
                className={styles.searchField}
                placeholder="Search over 1,000,000 recipes..."
                name="search"
                value={searchTerm}
                onChange={onChangeHandler}
            />
            <button type="submit" className={classNames(styles.btn, styles.searchBtn)}>
                <BiSearch />
                <span>Search</span>
            </button>
        </form>
    );
};

export default SearchBox;
