import { ChangeEvent, useRef } from "react";
import cx from "classnames";
import { BiSearch } from "react-icons/bi";

import { useAppDispatch } from "hooks/typedHooks";

import { searchMeal } from "store/search/searchSlice";

import s from "./searchBox.module.scss";

const SearchBox = () => {
	const dispatch = useAppDispatch();

	const inputRef = useRef<HTMLInputElement | null>(null);

	const onSubmitHandler = (event: ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!inputRef.current?.value) return;

		dispatch(searchMeal(inputRef.current.value.toLowerCase()));
		inputRef.current.value = "";
	};

	return (
		<form className={s.root} onSubmit={onSubmitHandler}>
			<input
				type='text'
				className={s.input}
				placeholder='Search over 1,000,000 recipes...'
				name='search'
				ref={inputRef}
			/>
			<button type='submit' className={cx(s.btn, s.searchBtn)}>
				<BiSearch />
				<span>Search</span>
			</button>
		</form>
	);
};

export { SearchBox };
