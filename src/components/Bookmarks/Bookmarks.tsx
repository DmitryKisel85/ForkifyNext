import { useAppDispatch, useAppSelector } from "hooks/typedHooks";
import { bookmarksSelector } from "store/bookmarks/bookmarksSelector";
import { getRecipeId } from "store/recipe/recipeSlice";

import { PreviewRecipe } from "components/PreviewRecipe";

import s from "./bookmarks.module.scss";
import { useCallback } from "react";

type BookmarksProps = {
	isOverListHandle: (boolean: boolean) => void;
};

const Bookmarks = ({ isOverListHandle }: BookmarksProps) => {
	const bookmarks = useAppSelector(bookmarksSelector);

	const dispatch = useAppDispatch();

	const handlePreviewRecipe = useCallback(
		(id: string) => {
			dispatch(getRecipeId(id));
		},
		[dispatch]
	);

	return (
		<>
			{bookmarks && bookmarks.length > 0 ? (
				<div
					className={s.root}
					onMouseEnter={() => isOverListHandle(true)}
					onMouseLeave={() => isOverListHandle(false)}>
					<ul className={s.list}>
						{bookmarks.map((recipe) => {
							return (
								<PreviewRecipe
									key={recipe.id}
									recipe={recipe}
									onClick={() => handlePreviewRecipe(recipe.id)}
								/>
							);
						})}
					</ul>
				</div>
			) : null}
		</>
	);
};

export { Bookmarks };
