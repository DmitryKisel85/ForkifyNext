import { ChangeEvent, useRef } from "react";

import classNames from "classnames";

import { useAppDispatch } from "../../hooks/typedHooks";

import { searchMeal } from "../../store/search/searchSlice";

import { BiSearch } from "react-icons/bi";

import styles from "./searchBox.module.scss";

const SearchBox = () => {
    const dispatch = useAppDispatch();

    const inputRef = useRef<HTMLInputElement>(null);

    const onSubmitHandler = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (inputRef.current !== null) {
            dispatch(searchMeal(inputRef.current.value.toLowerCase()));
            inputRef.current.value = "";
        }
    };

    return (
        <form className={styles.search} onSubmit={onSubmitHandler}>
            <input
                type="text"
                className={styles.searchField}
                placeholder="Search over 1,000,000 recipes..."
                name="search"
                ref={inputRef}
            />
            <button type="submit" className={classNames(styles.btn, styles.searchBtn)}>
                <BiSearch />
                <span>Search</span>
            </button>
        </form>
    );
};

export default SearchBox;
