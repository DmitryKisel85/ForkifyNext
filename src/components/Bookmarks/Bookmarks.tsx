import { useAppDispatch, useAppSelector } from "hooks/typedHooks";
import { bookmarksSelector } from "store/bookmarks/bookmarksSelector";
import { getRecipeId } from "store/recipe/recipeSlice";

import { PreviewRecipe } from "components/PreviewRecipe";

import s from "./bookmarks.module.scss";

type BookmarksProps = {
	isOverListHandle: (boolean: boolean) => void;
};

const Bookmarks = ({ isOverListHandle }: BookmarksProps) => {
	const bookmarks = useAppSelector(bookmarksSelector);

	const dispatch = useAppDispatch();

	return (
		<>
			{bookmarks && bookmarks.length > 0 ? (
				<div
					className={s.root}
					onMouseEnter={() => isOverListHandle(true)}
					onMouseLeave={() => isOverListHandle(false)}>
					<ul className={s.list}>
						{bookmarks.map((bookmark) => {
							return (
								<PreviewRecipe
									key={bookmark.id}
									recipe={bookmark}
									onClick={() => dispatch(getRecipeId(bookmark.id))}
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
