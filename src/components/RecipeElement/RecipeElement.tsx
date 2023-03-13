import { useEffect, useState } from "react";
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

import { bookmarksSelector } from "store/bookmarks/bookmarksSelector";
import { pushBookmarkToStore, removeBookmarkFromStore } from "store/bookmarks/bookmarksSlice";

import { useGetSingleRecipeQuery } from "services/api";

import { useAppDispatch, useAppSelector } from "hooks/typedHooks";

import { Spinner } from "components/Spinner";
import { RenderMessage } from "components/RenderMessage";

import s from "./recipeElement.module.scss";

type RecipeElementProps = {
	id: string;
};

const RecipeElement = ({ id }: RecipeElementProps) => {
	const bookmarks = useAppSelector(bookmarksSelector);
	const dispatch = useAppDispatch();

	const { data, isLoading, isFetching, error } = useGetSingleRecipeQuery(id);

	const [servingsNumber, setServingsNumber] = useState(0);
	const [isBookmarked, setIsBookmarked] = useState(false);

	useEffect(() => {
		if (data) {
			setServingsNumber(data.servings);
		}
	}, [data, id]);

	useEffect(() => {
		if (bookmarks.some((bookmark) => bookmark.id === id)) {
			setIsBookmarked(true);
		} else {
			setIsBookmarked(false);
		}
	}, [id, bookmarks]);

	if (isLoading || isFetching) return <Spinner />;
	if (!data) return <RenderMessage text={`Something goes wrong! Please, try again!`} icon={<FaRegTimesCircle />} />;
	if (error) {
		let errMsg = "";

		if ("status" in error) {
			errMsg = "error" in error ? error.error : JSON.stringify(error.data);
		} else {
			if (error.message) {
				errMsg = error.message;
			}
		}
		return (
			<RenderMessage text={`Something goes wrong! ${errMsg}. Please, try again!`} icon={<FaRegTimesCircle />} />
		);
	}

	const { title, image_url, cooking_time, servings, ingredients, publisher, source_url } = data;

	const handleIncServings = () => {
		setServingsNumber((servingsNumber) => servingsNumber + 1);
	};

	const handleDecServings = () => {
		if (servingsNumber === 1) return;
		setServingsNumber((servingsNumber) => servingsNumber - 1);
	};

	const handleBookmarks = () => {
		if (bookmarks.some((bookmark) => bookmark.id === id)) {
			dispatch(removeBookmarkFromStore(id));
			setIsBookmarked(false);
		} else {
			dispatch(pushBookmarkToStore(data));
			setIsBookmarked(true);
		}
	};

	return (
		<>
			{data && (
				<>
					<figure className={s.header}>
						<img src={image_url} alt={title} className={s.img} />
						<h1 className={s.title}>
							<span>{title}</span>
						</h1>
					</figure>

					<div className={s.heroBox}>
						<div className={s.wrapper}>
							<FaClock />
							<span className={s.data}>{cooking_time}</span>
							<span>minutes</span>
						</div>
						<div className={s.wrapper}>
							<FaUserAlt />
							<span className={s.data}>{servingsNumber}</span>
							<span>servings</span>

							<div className={s.btns}>
								<button className={s.btnTiny} onClick={handleDecServings}>
									<FaRegMinusSquare />
								</button>
								<button className={s.btnTiny} onClick={handleIncServings}>
									<FaRegPlusSquare />
								</button>
							</div>
						</div>

						<button className={s.btnRound} onClick={handleBookmarks}>
							{isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
						</button>
					</div>

					<div className={s.ingredientsBox}>
						<h2 className={s.heading}>Recipe ingredients</h2>
						<ul className={s.list}>
							{ingredients.map(({ quantity, unit, description }, idx) => (
								<li key={idx} className={s.item}>
									<FaCaretRight />
									<div className={s.quantity}>
										{quantity ? fracty((quantity / servings) * servingsNumber).toString() : ""}
									</div>
									<div>
										<span>{unit} </span>
										{description}
									</div>
								</li>
							))}
						</ul>
					</div>

					<div className={s.directionsBox}>
						<h2 className={s.heading}>How to cook it</h2>
						<p className={s.directionsText}>
							This recipe was carefully designed and tested by
							<b> {publisher}</b>. Please check out directions at their website.
						</p>
						<a className={s.btnSmall} href={source_url} target='_blank' rel='noreferrer'>
							<span>Directions</span>
							<FaArrowRight />
						</a>
					</div>
				</>
			)}
		</>
	);
};

export { RecipeElement };
