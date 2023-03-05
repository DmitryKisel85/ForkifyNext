import { useEffect, useState } from "react";
import cx from "classnames";
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

import { useGetSingleRecipeQuery } from "services/ForkifyServices";

import { useAppDispatch, useAppSelector } from "hooks/typedHooks";

import { Spinner } from "components/Spinner";
import { RenderMessage } from "components/RenderMessage";

import s from "./recipeElement.module.scss";

type RecipeElementProps = {
	id: string;
};

const RecipeElement = ({ id }: RecipeElementProps) => {
	const bookmarks = useAppSelector(bookmarksSelector);

	const { data, isLoading, error, isSuccess } = useGetSingleRecipeQuery(id);
	const dispatch = useAppDispatch();

	const [servingsNumber, setServingsNumber] = useState(0);
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
					<figure className={s.recipeFig}>
						<img src={image_url} alt={title} className={s.recipeImg} />
						<h1 className={s.recipeTitle}>
							<span>{title}</span>
						</h1>
					</figure>

					<div className={s.recipeDetails}>
						<div className={s.recipeInfo}>
							<FaClock />
							<span className={s.recipeInfoData}>{cooking_time}</span>
							<span className={s.recipeInfoText}>minutes</span>
						</div>
						<div className={s.recipeInfo}>
							<FaUserAlt />
							<span className={s.recipeInfoData}>{servingsNumber}</span>
							<span className={s.recipeInfoText}>servings</span>

							<div className={s.recipeInfoButtons}>
								<button className={s.btnTiny} onClick={handleDecreaseServings}>
									<FaRegMinusSquare />
								</button>
								<button className={s.btnTiny} onClick={handleIncreaseServings}>
									<FaRegPlusSquare />
								</button>
							</div>
						</div>

						<button className={cx(s.btnRound, s.btnBookmark)} onClick={handleBookmarks}>
							{isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
						</button>
					</div>

					<div className={s.recipeIngredients}>
						<h2 className={s.heading2}>Recipe ingredients</h2>
						<ul className={s.recipeIngredientList}>
							{ingredients.map((ingredient, index) => (
								<li key={index} className={s.recipeIngredient}>
									<FaCaretRight />
									<div className={s.recipeQuantity}>
										{ingredient.quantity
											? fracty((ingredient.quantity / servings) * servingsNumber).toString()
											: ""}
									</div>
									<div className={s.recipeDescription}>
										<span className={s.recipeUnit}>{ingredient.unit} </span>
										{ingredient.description}
									</div>
								</li>
							))}
						</ul>
					</div>

					<div className={s.recipeDirections}>
						<h2 className={s.heading2}>How to cook it</h2>
						<p className={s.recipeDirectionsText}>
							This recipe was carefully designed and tested by
							<span className={s.recipePublisher}> {publisher}</span>. Please check out directions at
							their website.
						</p>
						<a className={cx(s.btnSmall, s.recipeBtn)} href={source_url} target='_blank' rel='noreferrer'>
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
